const fs = require('fs');
const http = require('http');

const foo = http.request('http://127.0.0.1:80');
foo.socket.addListener('close');

fs.readFile('./debounce.html', () => {
  console.log('in poll phase');
  setTimeout(() => {
    console.log('in timers phase');
    console.log('call timeout');
  }, 0);

  fs.readFile('./throttle.html', () => {
    const startCallback = Date.now();

    // do something that will take 10ms...
    while (Date.now() - startCallback < 10) {
      // do nothing
    }

    setImmediate(() => {
      console.log('in check phase');
      console.log('call immediate');
    });
  });
});
