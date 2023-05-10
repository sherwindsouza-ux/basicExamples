const { execSync, exec } = require('child_process');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function makePromise(data) {
    console.log(Date.now());
    var result = await new Promise(resolve => sleep(5000).then(res => resolve(data + Math.random())));    
    console.log("After: " + Date.now());
    return result;
}

function simplePromise(delay) {
    return new Promise((resolve, reject) => {
      sleep(delay).then(function(result) {
        console.log("------------ENTERED--------");
        const randomNumber = Math.random();
        if (randomNumber > 0.5) {
            resolve(`Success! The random number is ${randomNumber}`);
        } else {
            reject(new Error(`Oops! The random number is ${randomNumber}`));
        }
    });
  });
}

  
function multiplePromises() {  
  var delays = [1000, 2000, 3000];
  var promises = delays.map(makePromise);
  console.log("PROMISES: " + promises);
  return Promise.all(promises);
}    
  

function runCommand(message) {
  const ref = message;  
  const dir = "C:\\Users\\SD1988\\Projects\\frontend";  
  const command = `git log ${ref} --max-count=1 --oneline --format="%h|%s|%an|%ad"`;
  return new Promise((resolve, reject) => {
    console.log(command);    
    exec(command, { cwd: dir }, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

function multipleExecutePromises() {
   const delays = ["monkey", "95afb64e9b3bd98447f5c99fcf"];
   const promises = delays.map(runCommand);
   return Promise.all(promises);
}

console.log("START");  
/*
simplePromise(2000)  
    .then(result => {
      console.log(result); // Output: "Success! The random number is <number>"
    })
    .catch(error => {
      console.error(error); // Output: "Oops! The random number is <number>"
    });
multiplePromises()    
  .then(result => {
    console.log(result); // Output: "Success! The random number is <number>"
  })
  .catch(error => {
    console.error(error); // Output: "Oops! The random number is <number>"
  });
*/
multipleExecutePromises().then(result => {
    console.log(result.length);
    console.log("SUCCESS"+ result); // Output: "Success! The random number is <number>"
  })
  .catch(error => {
    console.error(error); // Output: "Oops! The random number is <number>"
  });
  
console.log("BYE");