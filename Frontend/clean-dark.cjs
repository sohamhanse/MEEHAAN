const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    let filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
      results.push(filePath);
    }
  });
  return results;
}

const targetDir = path.join(__dirname, 'src');
const files = walkDir(targetDir);
let count = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  
  // match " dark:some-class:hover" etc. 
  content = content.replace(/\s*dark:[a-zA-Z0-9\-\/\[\]:]+/g, '');
  
  // cleanup any accidental 'className=" "'
  content = content.replace(/className="\s+"/g, 'className=""');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    count++;
    console.log('Cleaned:', file);
  }
});
console.log(`Finished. Cleaned ${count} files.`);
