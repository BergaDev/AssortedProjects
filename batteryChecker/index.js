const express = require('express');
const app = express();
const PORT = 3000;
const { pingRock } = require('./checking');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let status = true;
let iteration = 0;

function saveTimes(message) {
  fs.writeFileSync('status.txt', message + '\n', { flag: 'a' });
}


rl.question('Start checking (y/n): ', (answer) => {
  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      saveTimes("Time check started: " + new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' }));

      setInterval(async () => {
        const result = await pingRock('192.168.0.19');
        console.log("Is alive: " + result.alive);
        iteration++;

        if (result.alive == false) {
          status = false;
          saveTimes("Minutes run before loss: " + iteration + "Time Up: " + new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' }));
        }
      }, 60000);
    });
  } else {
    console.log('Server not started.');
  }
  rl.close();
}); 