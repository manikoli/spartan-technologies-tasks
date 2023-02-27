const https = require('https');

const url = 'https://reqres.in/api/users?page=2';

https.get(url, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    let response = JSON.parse(data);
    console.log(response.data.map(e => e.first_name).join(", "))
  });

}).on('error', (err) => {
  console.log('Error: ' + err.message);
});