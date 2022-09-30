// TODO: Convert strings to hex values
const INSTRUCTIONS = {
  LOAD_WORD: '01',
  STORE_WORD: '02',
  ADD: '03',
  SUB: '04',

  // JUMP instruction modifies the address the the program counter contains.
  JUMP: '05', // Jump back to beginning of program.
  JZ: '06', // JZ = Jump if zero. If sign flag register is set to 1, then execute this jump instruction. The operand it takes is where to jump too.

  HALT: 'ff',
};

module.exports = INSTRUCTIONS;
