const ipcMain = require('electron').ipcMain; // eslint-disable-line
// 不能混合使用import 和module.exports

const Service = {
  start: () => {
    ipcMain.on('somemsg', (event, data) => {
      console.log(data);
      event.sender.send('replaymsg', 'pong');
    });
    ipcMain.on('carousel', (event, data) => {
      console.log(data);
      if (process.env.NODE_ENV === 'development') {
        event.sender.send('replay_carousel', '../../static/290580.jpg');
      } else {
        event.sender.send('replay_carousel', '/home/yangming/图片/290580.jpg');
      }
    });
  },
};

module.exports = Service;
