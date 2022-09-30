const INSTRUCTIONS = require('./instructions');

class CPU {
  // private fields
  #currentInstruction = '';
  #output;

  constructor(memory) {
    this.memory = memory;

    this.registerNames = {
      pc: '0',
      r1: '10',
      r2: '12',
      zf: '14',
    };

    this.registers = {
      pc: 0, // your PC register doesn't hold an instruction but it should hold an 'index' (In a real CPU, it holds a memory address).
      r1: '',
      r2: '',
      zf: 0, // zero flag register. If value stored in a register is 0, then set zf to 1, else zf stays set to 0.
    };
  }

  get programOutput() {
    return this.#output;
  }

  fetch() {
    this.#currentInstruction = this.memory[this.registers.pc];
  }

  execute() {
    // Decoding
    const operator = this.#currentInstruction.slice(0, 2);
    const firstOperand = this.#currentInstruction.slice(2, 4);
    const secondOperand = this.#currentInstruction.slice(4, 6);

    // Point the register to the next instruction in memory, once an instruction has been fetched and decoded
    this.registers.pc += 1;

    // Executing
    switch (operator) {
      case INSTRUCTIONS.LOAD_WORD: {
        if (secondOperand === this.registerNames.r1) {
          this.registers.r1 = firstOperand;
        } else {
          this.registers.r2 = firstOperand;
        }
        break;
      }
      case INSTRUCTIONS.STORE_WORD: {
        this.#output = this.registers.r1;
        break;
      }
      case INSTRUCTIONS.ADD: {
        // TODO: Convert the string within each register to a number, and then perform calculation. You can then convert it back to a string.
        this.registers.r1 = this.registers.r1 + this.registers.r2;
        break;
      }
      case INSTRUCTIONS.SUB: {
        // TODO: Convert the string within each register to a number, and then perform calculation. You can then convert it back to a string.
        this.registers.r1 = this.registers.r1 - this.registers.r2;
        break;
      }
      // TODO: Implement JZ Instruction
      case INSTRUCTIONS.JZ: {
        break;
      }
      default: {
        break;
      }
    }
    return operator;
  }

  run() {
    while (this.#currentInstruction !== INSTRUCTIONS.HALT) {
      this.fetch();
      this.execute();
    }
  }
}

module.exports = CPU;
