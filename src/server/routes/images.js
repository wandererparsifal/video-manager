const fs = require('fs'); // eslint-disable-line
const path = require('path'); // eslint-disable-line
// glob
const PATH = '/home/yangming/图片';
const imageMap = [];

const images = {
  getLocalImages(filePath) {
    fs.readdir(filePath, (err, files) => {
      files.forEach((fileName) => {
        const p = path.join(filePath, fileName);
        fs.stat(p, (err, stats) => {
          if (err) throw err;
          if (stats.isFile()) {
            console.log(path.extname(p));
            if (path.extname(p) === '.jpg') {
              imageMap.push(p);
              console.log(p);
            }
          } else if (stats.isDirectory()) {
            this.getLocalImages(p);
          }
        });
      });
    });
  },
  getCovers() {
    console.log('getCovers');
  },
  listen(ipcMain) {
    this.getLocalImages(PATH);
    this.getCovers();
    ipcMain.on('covers', (event, start, end) => {
      console.log('covers', start, end);
      const items = [];
      const imageCount = imageMap.length;
      for (let i = start; i <= end; i += 1) {
        if (process.env.NODE_ENV === 'development') {
          items.push('../../static/290580.jpg');
        } else {
          const img = imageMap[parseInt(Math.random() * imageCount, 10)];
          items.push(img);
        }
      }
      event.sender.send('replayCovers', items);
    });
  },
};

module.exports = images;
