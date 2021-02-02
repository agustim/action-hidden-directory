const core = require('@actions/core');
const github = require('@actions/github');
const keccak256 = require('keccak256')

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
  console.log(`Password is ${nameToGreet}!`)
  const sharekey = makeid(10)
  core.setOutput('sharekey', sharekey)
  const directory = hashme(password+sharekey)
  console.log(`The directory is: ${directory}`)
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)
} catch (error) {
  core.setFailed(error.message);
}