// Generate fs.json with all files in ./client_template
const vol = require('memfs').vol;
const memfs = require('memfs').fs;
const fs = require('fs');
const path = require('path');

// https://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object

/**
 * Promise all
 * @author Loreto Parisi (loretoparisi at gmail dot com)
 */
function promiseAllP(items, block) {
    var promises = [];
    items.forEach(function(item,index) {
        promises.push( function(item,i) {
            return new Promise(function(resolve, reject) {
                return block.apply(this,[item,index,resolve,reject]);
            });
        }(item,index))
    });
    return Promise.all(promises);
} //promiseAll

/**
 * read files
 * @param dirname string
 * @return Promise
 * @author Loreto Parisi (loretoparisi at gmail dot com)
 * @see http://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object
 */
function readFiles(dirname) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, function(err, filenames) {
            if (err) return reject(err);
            promiseAllP(filenames,
            (filename,index,resolve,reject) =>  {
                fs.readFile(path.resolve(dirname, filename), 'utf-8', function(err, content) {
                    if (err) return reject(err);
                    return resolve({filename: filename, contents: content});
                });
            })
            .then(results => {
                return resolve(results);
            })
            .catch(error => {
                return reject(error);
            });
        });
  });
}

readFiles( './client_template')
.then(files => {
    console.log( "loaded ", files.length );
    files.forEach( (item, index) => {
        console.log( "item",item.filename, "size ", item.contents.length);
        vol.writeFileSync("/"+item.filename, item.contents)
    });
    var filesystem = vol.toJSON()
    fs.writeFileSync('./client/fs.json', JSON.stringify(filesystem))
})
.catch( error => {
    console.log( error );
})


