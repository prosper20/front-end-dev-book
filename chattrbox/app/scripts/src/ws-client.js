let socket;

function init(url) {
  socket = new WebSocket(url);
  console.log('connecting...');
}

function registerOpenHandler(handlerFunction) {
  socket.onopen = () => {
    console.log('open');
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) {
  socket.onmessage = (e) => {
    e.data.text().then((txt) => console.log('message', txt));

    e.data.arrayBuffer().then((aBuff) => { //arrayBuffer returns a promise that resoles
      //with the contents as an arrayBuffer data
      const UTF8 = new TextDecoder('utf-8');
      let data = JSON.parse(UTF8.decode(aBuff));
      handlerFunction(data);
    });
  };
}

function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

export default {
  init,
  registerOpenHandler,
  registerMessageHandler,
  sendMessage
}
