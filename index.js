const CPU = require('./cpu');
const baseconvert = require('baseconvert');

// Program to run
// TODO: Represent these as hex values
// TODO Your memory should be an array containing 20 values. Might need to use an array buffer.
const programInstructions = ['010110', '010212', '030102', '02010e', 'ff'];

const cpu = new CPU(programInstructions);
console.log(cpu); // to initally view our CPU
cpu.run();
console.log(cpu.programOutput);
