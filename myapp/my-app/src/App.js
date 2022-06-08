
import React from 'react';
//import React, {Component} from 'react';

import './App.css';
 import ButtonGroup from '@material-ui/core/ButtonGroup';
 import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  root: { background: 'linear-gradient(45deg, #6FD0D6 30%, #D6E5CB 90%)', height:1100, display: 'flex', flexDirection: 'column', 
    flexWrap: "wrap", border: 0,
   borderRadius: 3,
 boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
 padding: '0 30px',

  alignItems: 'center', '& > *': { margin: theme.spacing(1),
    },
  },
}));


function wakewo() { fetch('http://192.168.1.218:9000/wakewo') .then((response) => { return response.text();
  })
  .then((myJson) => { console.log(myJson);
  });
}


function shutdownSys() { fetch('http://192.168.1.218:9000/shutsys') .then((response) => { return response.text();
        })
        .then((myJson) => { console.log(myJson);
        });
}

function wakeCanyon() { fetch('http://192.168.1.218:9000/pjlinkcanyonon') .then((response) => {return response.text ();
	})
	.then((myJson) => { console.log(myJson);
	});
}

function shutint() { fetch('http://192.168.1.218:9000/pjlinkcanyonoff') .then((response) => {return response.text ();
	})
	.then((myJson) => { console.log(myJson);
	});
}

function timeline1() { fetch('http://192.168.1.218:9000/timeline1') .then((response) => { return response.text();
        })
        .then((myJson) => { console.log(myJson);
        });
}

function timeline2() { fetch('http://192.168.1.218:9000/timeline2') .then((response) => { return response.text();
        })
        .then((myJson) => { console.log(myJson);
        });
}

function timeline3() { fetch('http://192.168.1.218:9000/timeline3') .then((response) => { return response.text();
	})
	.then((myJson) => { console.log(myJson);
	});
}

function timeline4(){ fetch('http://192.168.1.218:9000/timeline4') .then((response) => { return response.text();
	})
	.then((myJson) => { console.log(myJson);
	});


}


function timeline5(){ fetch('http://192.168.1.218:9000/timeline5') .then((response) => { return response.text();
        })
        .then((myJson) => { console.log(myJson);
        });


}



function timeline9(){ fetch('http://192.168.1.218:9000/timeline9') .then((response) => { return response.text();
        })
        .then((myJson) => { console.log(myJson);
        });


}



function serverLoop(){ fetch('http://192.168.1.218:9000/serverLoop') .then((response) => { return response.text();
        })
        .then((myJson) => { console.log(myJson);
        });


}

function serverPause(){ fetch('http://192.168.1.218:9000/serverPause') .then((response) => { return response.text();
        })
        .then((myJson) => { console.log(myJson);
        });


}

function serverStop(){ fetch('http://192.168.1.218:9000/serverStop') .then((response) => { return response.text();
        })
        .then((myJson) => { console.log(myJson);
        });


}

function serverStart(){ fetch('http://192.168.1.218:9000/serverStart') .then((response) => { return response.text();
        })
        .then((myJson) => { console.log(myJson);
        });


}





function App() {
  const classes = useStyles();


  return ( <div className={classes.root}> <h1>Epson System Control</h1>
    <h3>System Control</h3>

  <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">

<Button onClick={wakewo}>Turn On Main Display </Button>
<Button onClick={shutdownSys}>Turn Off Main Display</Button>
<Button onClick={wakeCanyon}>Turn On Interactive Display</Button>
<Button onClick={shutint}>Turn Off Interactive Display</Button>
  </ButtonGroup>

  <h3>Reception Timeline Control</h3>

<ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
  <Button onClick={timeline1}>Be Cool</Button>
  <Button onClick={timeline2}>Sustainability</Button>
  <Button onClick={timeline4}>Video 3</Button>
  <Button onClick={timeline5}>Loop Video </Button>
  <Button onClick={timeline3}>Blank</Button>
  
<Button onClick={timeline9}>Sustainability No Audio</Button>



</ButtonGroup>


	<h3>Interactive Timeline  Control</h3>



<ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">

 <Button onClick={serverStart}>Play Once</Button> 
 <Button onClick={serverLoop}>Loop</Button>
  <Button onClick={serverPause}>Pause</Button>
  <Button onClick={serverStop}>Blank</Button>
 




</ButtonGroup>


</div>
);

}

export default App;
