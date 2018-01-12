const ipcMain = require('electron').ipcMain; // eslint-disable-line
// 不能混合使用import 和module.exports

const Service = {
  start: () => {
    ipcMain.on('somemsg', (event, data) => {
      console.log(data);
      event.sender.send('replaymsg', 'pong');
    });
  },
};

module.exports = Service;
