const fs = require('fs');
const { exec } = require('child_process');

fs.writeFile('test.txt', 'Hello, world!', (err) => {
  if (err) throw err;
  console.log('File is created.');

  exec('ls', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }

    const files = stdout.trim().split('\n');
    const fileList = files.join(', ');

    console.log(fileList);
  });
});