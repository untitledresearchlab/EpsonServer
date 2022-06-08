var udp = require('dgram');
const express = require('express')
const app = express()
const port = 9000
var cors = require('cors')
var cron = require("node-cron");
//var wintools = require('wintools');
const axios = require('axios');
var pjlink = require('pjlink');
var path = require('path');

// creating a client socket
var client = udp.createSocket('udp4');

//app.get('/',function (req, res) => res.send('var/myapp/text/index.html'))
//app.get('/', function(req, res) {
//    res.sendFile(path.join(__dirname + '/index.html'));
//});


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

////////////////////////////////////////////////////////////////////////////////


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

////////Turn On Interactive Server//////////

app.get('/wakeint', wakeint);

function wakeint(){
	var wol2 = require('wake_on_lan');
	wol2.wake('D45DDF1E09B7');

	wol2.wake('D45DDF1E09B7', function(error) {
	if (error) {
	} else {
	}
	});

	var magic_packet = wol2.createMagicPacket('D4:5D:DF:1E:09:B7');

	console.log("Interactive System Turned On");


}



//////////////////////////////////////////////////////////////////////////////

/////////////ShutSystemDown///////////////////
app.get('/shutsys', shutdSystem);

function shutdSystem(){

//reception
  axios.get('http://192.168.1.25:3000/shutsys')
    .then(response => {
      console.log(response.data.url);
      console.log(response.data.explanation);
    })
    .catch(error => {
      console.log(error);
    });
pjLinkOff();
}

/////////////////////////////////////////////////////////////////////////////////

app.get('/shutint', shutint);

function shutint(){

//interactive corridor installation 
	axios.get ('http://192.168.1.242:3000/shutsys')
	 .then(response => {
	  console.log(response.data.url);
	  console.log(reponse.data.explanation);
	})
	.catch(error => {
	 console.log(error);
	});
}


///////////////////////////////////timeline 1/////////////////////////////////////
app.get("/timeline1", timeline1);
// For most Ports, send() should only be called after the "ready" event fires.

function timeline1(){

  oscPort.send( { timeTag: osc.timeTag(0),
    packets: [ { address: '/surfaces/Display/select' }, { address: '/medias/videoA.mov/assign' },
      ], }, '192.168.1.25', 8000 );
client.break();
}

///////////////////////////////////timeline 2/////////////////////////////////////
app.get("/timeline2", timeline2);
// For most Ports, send() should only be called after the "ready" event fires.

function timeline2(){
   oscPort.send( { timeTag: osc.timeTag(0),
    packets: [ { address: '/surfaces/Display/select' }, { address: '/medias/videoB.mov/assign' },
      ], }, '192.168.1.25', 8000 );
client.break();

}

///////////////////////////////////timeline 3/////////////////////////////////////
app.get("/timeline3", timeline3);
// For most Ports, send() should only be called after the "ready" event fires.

function timeline3(){
	oscPort.send( { timeTag: osc.timeTag(0),
	packets: [ { address: '/surfaces/Display/select' }, { address: '/medias/Blank.mp4/assign' },
	], }, '192.168.1.25', 8000 );
client.break();

}
/////////////////////////////////timeline 4///////////////////////////////////////
app.get("/timeline4", timeline4);
// For most Ports, send() should only be called after "ready" event fires.

function timeline4(){
	oscPort.send( { timeTag: osc.timeTag(0),
	packets: [ { address: '/surfaces/Display/select' }, { address: '/medias/videoC.mp4/assign' },
	], }, '192.168.1.25', 8000 );
client.break();

}

////////////////////////////////timeline 5/////////////////////////////////////////


app.get("/timeline5", timeline5);
// For most Ports, send() should only be called after "ready" event fires.

function timeline5(){
        oscPort.send( { timeTag: osc.timeTag(0),
        packets: [ { address: '/surfaces/Display/select' }, { address: '/medias/videoD.mov/assign' },
        ], }, '192.168.1.25', 8000 );
client.break();

}


////////////////////////////////timeline 9/////////////////////////////////////////


app.get("/timeline9", timeline9);
// For most Ports, send() should only be called after "ready" event fires.

function timeline9(){
        oscPort.send( { timeTag: osc.timeTag(0),
        packets: [ { address: '/surfaces/Display/select' }, { address: '/medias/videoB2.mov/assign' },
        ], }, '192.168.1.25', 8000 );
client.break();

}




/////////////////Interactive install/////////////////////


////////////////////////////////timeline 6 aka highlight/////////////////////////////////////////


app.get("/timeline6", timeline6);
// For most Ports, send() should only be called after "ready" event fires.

function timeline6(){
        oscPort.send( { timeTag: osc.timeTag(0),
        packets: [ { address: '/surfaces/Group-4/select' }, { address: '/medias/videoA2.mov/assign' },
        ], }, '192.168.1.242', 8000 );
client.break();

}



////////////////////////////////timeline 11 aka highlight/////////////////////////////////////////


app.get("/timeline11", timeline11);
// For most Ports, send() should only be called after "ready" event fires.

function timeline11(){
        oscPort.send( { timeTag: osc.timeTag(0),
        packets: [ { address: '/surfaces/Group-4/select' }, { address: '/medias/videoC2.mov/assign' },
        ], }, '192.168.1.242', 8000 );
client.break();

}






////////////////////////////////timeline 7/////////////////////////////////////////


app.get("/timeline7", timeline7);
// For most Ports, send() should only be called after "ready" event fires.

function timeline7(){
        oscPort.send( { timeTag: osc.timeTag(0),
        packets: [ { address: '/surfaces/Group-4/select' }, { address: '/medias/Solid_Color/assign' },
        ], }, '192.168.1.242', 8000 );
client.break();

}




////////////////////////////////timeline 7/////////////////////////////////////////


app.get("/timeline8", timeline8);
// For most Ports, send() should only be called after "ready" event fires.

function timeline8(){
        oscPort.send( { timeTag: osc.timeTag(0),
        packets: [ { address: '/surfaces/Group-4/select' }, { address: '/medias/videoB2.mov/assign' },
        ], }, '192.168.1.242', 8000 );
client.break();

}


///////////////////////////////////interactive play/////////////////////////////////////
app.get("/serverStart", serverStart);
// For most Ports, send() should only be called after the "ready" event fires.

function serverStart(){

  oscPort.send( { timeTag: osc.timeTag(0),
    packets: [ { address: '/surfaces/Group-3/select' }, { address: '/medias/videoA.mov/assign' },
      //packets: [ { address: '/cues/Bank-1/auto_play' },
  ], }, '192.168.1.242', 8000 );

timeline6();

client.break();
}

///////////////////////////////////interactive stop/////////////////////////////////////
 app.get("/serverStop", serverStop);
// For most Ports, send() should only be called after the "ready" event fires.

function serverStop(){
   oscPort.send( { timeTag: osc.timeTag(0),
    packets: [ { address: '/surfaces/Group-3/select' }, { address: '/medias/Solid_Color/assign' },
  ], }, '192.168.1.242', 8000 );

timeline7();

client.break();

}

/////////////////////////////////interactive loop///////////////////////////////////

app.get("/serverLoop", serverLoop);
// For most Ports, send() should only be called after the "ready" event fires.

function serverLoop(){
   oscPort.send( { timeTag: osc.timeTag(0),
    packets: [ { address: '/surfaces/Group-3/select' }, { address: '/medias/videoB.mov/assign' },
  ], }, '192.168.1.242', 8000 );

timeline8();

client.break();

}

////////////////////////////////interactive pause////////////////////////////////////

app.get("/serverPause", serverPause);
// For most Ports, send() should only be called after the "ready" event fires.

function serverPause(){
   oscPort.send( { timeTag: osc.timeTag(0),
    packets: [ { address: '/surfaces/Group-3/select' }, { address: '/medias/videoC.mov/assign' },
  ], }, '192.168.1.242', 8000 );

timeline11();

client.break();

}



/////////////////////////////////// OnOff Projector  //////////////////////////////////////


app.get('/pjLinkOn', pjLinkOn);

function pjLinkOn(){
var beamer = new pjlink("192.168.1.219", 4352, "123");

beamer.powerOn(function(err){
	if(err){
		console.log('error turning on', err);
		return;
	}

});


}



app.get('/pjlinkcanyonon', pjlinkoncanyonon);

function pjlinkoncanyonon(){

	var beamer2 = new pjlink("192.168.1.199", 4352, "123");
	var beamer3 = new pjlink("192.168.1.231", 4352, "123");

beamer2.powerOn(function(err){
	if(err){
		console.log('error turning on', err);
		return;
	}
});

beamer3.powerOn(function(err){
	if(err){
		console.log('error turnin on', err);
		return;
	}
});

}
////////////////////////////// Off reception /////////////////////

app.get('/pjLinkOff', pjLinkOff);

function pjLinkOff(){
var beamer = new pjlink("192.168.1.219", 4352, "123");

beamer.powerOff(function(err){
	if(err){
		console.log('error turning on', err);
		return;
	}

});
}



////////////////Turn Off Interactive///////////
app.get('/pjlinkcanyonoff', pjlinkcanyonoff);

function pjlinkcanyonoff(){
var beamer2 = new pjlink("192.168.1.199", 4352, "123");
var beamer3 = new pjlink("192.168.1.231", 4352, "123");

beamer2.powerOff(function(err) {
	if(err){
		console.log('error turning on', err);
		return;
	}
});

beamer3.powerOff(function(err) {
	if(err){
		console.log('error turning on', err);
		return;
	}
});
}	






/////////////////////////////Schedule/////////////////////////////////////////


///Turn On///
cron.schedule('30 8  * * 1-5', function() {


var wol = require('wake_on_lan');
wol.wake('1C697A0FDED4');

wol.wake('1C697A0FDED4', function(error) {
	if(error) {
	//handle error
	} else {
	// done sending packets
	}
	});
var magic_packet = wol.createMagicPacket('1C:69:7A:0f:DE:D4');

console.log("System Turned On");

pjLinkOn();
pjlinkcanyonon();
});
///Turn Off///

cron.schedule('00 18  * * 1-5', function(){

axios.get('http://192.168.1.25:3000/shutsys')
	.then(response => {
		console.log(response.data.url);
		console.log(response.data.explanation);
		})
		.catch(error => {
		console.log(error);
		});
pjLinkOff();
pjlinkcanyonoff();
});

