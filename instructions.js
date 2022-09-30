// TODO: Convert strings to hex values
const INSTRUCTIONS = {
  LOAD_WORD: 0x01,
  STORE_WORD: 0x02,
  ADD: 0x03,
  SUB: 0x04,

  // JUMP instruction modifies the address the the program counter contains.
  JUMP: 0x05, // Jump back to beginning of program.
  JZ: 0x06, // JZ = Jump if zero. If sign flag register is set to 1, then execute this jump instruction. The operand it takes is where to jump too.

  HALT: 0xff,
};

module.exports = INSTRUCTIONS;
