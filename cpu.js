const INSTRUCTIONS = require('./instructions');

class CPU {
  // private fields
  #currentInstruction = '';
  #currentInstructionIndex = 0;
  #output;

  constructor(memory) {
    this.memory = memory;

    this.registerNames = {
      pc: '0',
      r1: '10',
      r2: '12',
    };

    this.registers = {
      pc: this.memory[0],
      r1: '',
      r2: '',
    };
  }

  get programOutput() {
    return this.#output;
  }

  fetch() {
    this.#currentInstruction = this.registers.pc;
    this.#currentInstructionIndex += 1;
    this.registers.pc = this.memory[this.#currentInstructionIndex];
  }

  execute() {
    // Decoding
    const operator = this.#currentInstruction.slice(0, 2);
    const firstOperand = this.#currentInstruction.slice(2, 4);
    const secondOperand = this.#currentInstruction.slice(4, 6);

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
        this.registers.r1 = this.registers.r1 + this.registers.r2;
        break;
      }
      case INSTRUCTIONS.SUB: {
        this.registers.r1 = this.registers.r1 - this.registers.r2;
        break;
      }
      case INSTRUCTIONS.HALT: {
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
