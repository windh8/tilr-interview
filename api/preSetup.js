const fs = require('fs');

if(!fs.existsSync('./.env')) {
  console.log('.env file does not exist! Creating now!\nSecret Key being placed inside!');
  const secret = 'SECRET_KEY=ARTICPHEONIX9';
  fs.writeFile('./.env', secret, (err) => {
    if(err) {
      console.log(`Error Occured in preSetup.js: ${err}`);
    }
  })

}
