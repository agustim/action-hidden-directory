const core = require('@actions/core');
const keccak256 = require('keccak256');
const fs = require('fs');
const github = require('@actions/github');
const fsjson = require('./client/fs.json');
const vol = require('memfs').vol;
const dir = "./client"

const makeid = function(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const hashme = (str) => {
    return keccak256(str).toString('hex')
}

try {
  const password = core.getInput('password')
  console.log(`Password is ${password}!`)
  const sharekey = makeid(10)
  core.setOutput('sharekey', sharekey)
  console.log(github.workspace);
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  vol.fromJSON(fsjson, '/');
  for (file in fsjson) {
      fs.writeFileSync(dir + file,vol.readFileSync(file));
  }
  fs.writeFileSync(dir + '/sharekey.js', `var sharekey="${sharekey}";`);
  const directory = hashme(password+sharekey)
  console.log(`The directory is: ${directory}`)
  core.setOutput('directory', directory)
} catch (error) {
  core.setFailed(error.message);
}