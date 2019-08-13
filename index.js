/**
 * Renquan Wang
 * 2019-08-13
 */
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const {spawn} = require('child_process');
const readline = require('readline');

// Print current working directory
let cwd = process.cwd();
console.log(chalk.bold.bgBlue('\nFolder: ' + cwd));

// Get all the git repos
let childrenAll = fs.readdirSync(cwd);
let maxFilenameLength = 0;
let children = childrenAll.filter((file) => {
  if (fs.statSync(file).isDirectory() === false) {
    return false;
  }
  let subDirs = fs.readdirSync(file);
  return subDirs.indexOf('.git') >= 0;
});

let length = children.length;
let counter = 0;

if (length === 0) {
  console.log("The above folder doesn't contain any git repo");
  return;
}
console.log(`The above folder contains ${length} git repos\n`);

// Format constants
let padCount = 1;
let padCountEnd = 1;
let lengthDigitCount = length / 10;
while (lengthDigitCount >= 1 ) {
  lengthDigitCount /= 10;
  padCount++;
}

// Print all the children
children.forEach((file, index) => {
  maxFilenameLength = Math.max(file.length, maxFilenameLength);
  process.stdout.write(`${String(index + 1).padStart(padCount, '0')}: ${file}\n`);
});

padCountEnd = Math.min(40, maxFilenameLength);
readline.moveCursor(process.stdout, -1000, -length - 1);

runCommand();

function runCommand() {
  if (children.length <= 0) {
    console.log(chalk.bold.bgBlue('\n\nALL DONE'));
    return;
  }
  counter++;
  let file = children.shift();
  let filepath = path.join(cwd, file);
  readline.moveCursor(process.stdout, -1000, 1); // Move cursor to the first character of the next line
  readline.clearLine(process.stdout, 0);
  process.stdout.write(`${String(counter).padStart(padCount, '0')}: ${chalk.bold(file.padEnd(padCountEnd))} -> `);
  process.stdout.write('working');
  const child = spawn('git', ['pull', 'origin', 'master'], { cwd: filepath});

  child.on('close', (code) => {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${String(counter).padStart(padCount, '0')}: ${chalk.bold(file.padEnd(padCountEnd))} -> `);
    process.stdout.write(`${code === 0 ? chalk.bold('OK') : chalk.bold.bgRed('Failed')}`);
    runCommand();
  });
}
