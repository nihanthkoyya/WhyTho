const https = require('https');

https.get('https://drive.google.com/drive/folders/1aPEC8VXQ0XFSnTT28lpADPvyFvifsd4P?usp=sharing', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    // extract IDs
    const regex = /\["([a-zA-Z0-9_-]{28,35})","([^"]+\.mp4)"/g;
    let match;
    let found = false;
    while ((match = regex.exec(data)) !== null) {
      console.log(`Match: ${match[1]} -> ${match[2]}`);
      found = true;
    }
    if (!found) {
        const regex2 = /"([^"]+\.mp4)"/g;
        while ((match = regex2.exec(data)) !== null) {
          console.log(`Name: ${match[1]}`);
        }
    }
  });
}).on('error', (e) => {
  console.error(e);
});
