var udp = require('dgram');
const express = require('express')
const app = express()
const port = 9000
var cors = require('cors')
//var wintools = require('wintools');
const axios = require('axios');
var pjlink = require('pjlink');

// creating a client socket
var client = udp.createSocket('udp4');


app.get('/', (req, res) => res.send('C:/Users/Certis/Documents/Projects/Tengah/UDP_SETUP/20072020/UDP/my-app/public/index.html'))

var whitelist = ['http://localhost']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors())
app.options(corsOptions, cors());
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
////////////////////////////OSC ADDRESS ////////////////////////////////////////
const osc = require('osc');
const oscPort = new osc.UDPPort({ localAddress: '0.0.0.0' });
 oscPort.open({port : 8000});

///////////////////////////////////////////////////////////////////////////////


app.get('/wakewo', wakeWatchout);

function wakeWatchout(){
  // wake on lan
  var wol = require('wake_on_lan');
  wol.wake('1C697A0FDED4');

  wol.wake('1C697A0FDED4', function(error) {
    if (error) {
      // handle error
    } else {
      // done sending packets
    }
  });

  var magic_packet = wol.createMagicPacket('1C:69:7A:0F:DE:D4');
  console.log("System Turned On");

pjLinkOn();

}

///////////////////////////////////////////////////////////////////////////////

app.get('/shutsys', shutdSystem);

function shutdSystem(){

//sp01
  axios.get('http://192.168.1.26:3000/shutsys')
    .then(response => {
      console.log(response.data.url);
      console.log(response.data.explanation);
    })
    .catch(error => {
      console.log(error);
    });
pjLinkOff();
}


///////////////////////////////////timeline 1/////////////////////////////////////
app.get("/timeline1", timeline1);
// For most Ports, send() should only be called after the "ready" event fires.

function timeline1(){

  oscPort.send( { timeTag: osc.timeTag(0),
    packets: [ { address: '/surfaces/Display/select' }, { address: '/medias/videoA.mov/assign' },
      ], }, '192.168.1.26', 8000 );
client.break();
}


///////////////////////////////////timeline 2/////////////////////////////////////
app.get("/timeline2", timeline2);
// For most Ports, send() should only be called after the "ready" event fires.

function timeline2(){
   oscPort.send( { timeTag: osc.timeTag(0),
    packets: [ { address: '/surfaces/Display/select' }, { address: '/medias/videoB.mov/assign' },
      ], }, '192.168.1.26', 8000 );
client.break();

}

/////////////////////////////////// OnOff //////////////////////////////////////


app.get('/pjLinkOn', pjLinkOn);

function pjLinkOn(){
var beamer = new pjlink("192.168.1.65", 4352, "123");

beamer.powerOn(function(err){
	if(err){
		console.log('error turning on', err);
		return;
	}

});


}


app.get('/pjLinkOff', pjLinkOff);

function pjLinkOff(){
var beamer = new pjlink("192.168.1.65", 4352, "123");

beamer.powerOff(function(err){
	if(err){
		console.log('error turning on', err);
		return;
	}

});
}
