const core = require('@actions/core');
const keccak256 = require('keccak256');
const fs = require('fs');

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
  console.log("cwd:" + process.cwd())
  fs.writeFileSync('/github/workflow/client/sharekey.js', `var sharekey="${sharekey}";`);
  const directory = hashme(password+sharekey)
  console.log(`The directory is: ${directory}`)
  core.setOutput('directory', directory)
} catch (error) {
  core.setFailed(error.message);
}