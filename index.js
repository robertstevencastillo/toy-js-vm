const CPU = require("./cpu")
const baseconvert = require('baseconvert')


// Program to run
const programInstructions = [
  "010110",
  "010212",
  "030102",
  "02010e",
  "ff"
]

const cpu = new CPU(programInstructions);
cpu.run()