const CPU = require('./cpu');
const baseconvert = require('baseconvert');

// Program to Run
const programInstructions = [
  0x01, 0x01, 0x10, 0x01, 0x02, 0x12, 0x03, 0x01, 0x02, 0x02, 0x01, 0x03, 0xff,
];

// TODO Your memory should be an array containing 20 values. Might need to use an array buffer.
const buffer = new ArrayBuffer(20);

// TODO your memory view is an array of bytes, 8 bit integers
const memoryView = new Uint8Array(buffer).map((item, index) => {
  if (index === programInstructions.length) return;
  item = programInstructions[index];
  return item;
});

console.log(memoryView);

// const cpu = new CPU(memoryView);
// console.log(cpu); // to initally view our CPU
// cpu.run();
// console.log(cpu.programOutput);
