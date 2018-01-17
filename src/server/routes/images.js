function getLocalImages() {
  console.log('getLocalImages');
}

function getCovers() {
  console.log('getCovers');
}

function listen(ipcMain) {
  getLocalImages();
  getCovers();
  ipcMain.on('covers', (event, start, end) => {
    console.log('covers', start, end);
    const items = [];
    for (let i = start; i <= end; i += 1) {
      if (process.env.NODE_ENV === 'development') {
        items.push('../../static/290580.jpg');
      } else {
        items.push('/home/yangming/图片/290580.jpg');
      }
    }
    event.sender.send('replayCovers', items);
  });
}

module.exports = {
  listen,
};
