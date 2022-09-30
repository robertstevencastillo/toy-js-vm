const CPU = require('./cpu');
const baseconvert = require('baseconvert');

// Program to Run
const program1 = [
  0x01, // *** LOAD_WORD instruction
  0x01, 
  0x10, 
  0x01, // *** LOAD_WORD instruction
  0x02, 
  0x12, 
  0x03, // *** ADD instruction
  0x01, // take the value in this register
  0x02, // add the value found in the previous step, to the value found within this register
  0x02, // *** STORE_WORD instruction
  0x01, // take what's in this register
  0x03, // store it in this location in memory
  0xff, // *** HALT instruction
];

const program2 = [
  0x01, 0x01, 0x10,
  0x01, 0x02, 0x12,
  0x03, 0x01, 0x02,
  0x02, 0x01, 0x0e,
  0xff,
  0x00,
  0x00, 0x00,
  0xa1, 0x14,
  0x0c, 0x00
]

// TODO: Testing JZ instruction
const program3 = [
  0x01, // *** LOAD_WORD instruction
  0x01,
  0x10,
  0x14, // *** SET ZF instruction
  0x06 // SET 
]

const buffer = new ArrayBuffer(20);
const memoryView = new Uint8Array(buffer).map((item, index) => {
  if (index === program1.length) return;
  item = program1[index];
  return item;
});

const buffer2 = new ArrayBuffer(20);
const memoryView2 = new Uint8Array(buffer2).map((item, index) => {
  if (index === program2.length) return;
  item = program2[index];
  return item;
});

console.log("*** VM 1 ***")
const cpu = new CPU(memoryView);
cpu.run();
console.log(cpu)
console.log()

console.log("*** VM 2 ***")
const cpu2 = new CPU(memoryView2);
cpu2.run();
console.log(cpu2)
console.log()
