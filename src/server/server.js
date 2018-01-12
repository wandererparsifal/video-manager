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
      const images = [];
      if (process.env.NODE_ENV === 'development') {
        images.push('../../static/290580.jpg');
        images.push('../../static/556062.jpg');
        images.push('../../static/forest-3840x2400-sunset-fox-4k-15517.jpg');
      } else {
        images.push('/home/yangming/图片/290580.jpg');
        images.push('/home/yangming/图片/556062.jpg');
        images.push('/home/yangming/图片/forest-3840x2400-sunset-fox-4k-15517.jpg');
      }
      event.sender.send('replay_carousel', images);
    });
  },
};

module.exports = Service;
