const INSTRUCTIONS = require('./instructions');

class CPU {
  #currentInstruction = '';
  #currentInstructionIndex = 0;

  constructor(memory) {
    this.memory = memory;

    // Array for mapping a hex value to a register
    this.registerNames = {
      pc: '0',
      r1: '10',
      r2: '12',
    };

    // Array for storing values in registers
    this.registers = {
      pc: this.memory[0],
      r1: '',
      r2: '',
    };
  }

  fetch() {
    this.#currentInstruction = this.registers.pc;
    this.#currentInstructionIndex += 1;
    this.registers.pc = this.memory[this.#currentInstructionIndex];
  }

  execute() {
    // Decoding
    const operator = this.#currentInstruction.slice(0, 2);
    const firstOperand = this.#currentInstruction.substring(2, 4);
    const secondOperand = this.#currentInstruction.substring(4, 6);

    // Executing
    switch (operator) {
      case INSTRUCTIONS.LOAD_WORD: {
        // For a load instruction, the first operand is the value, the second operand is the register
        if (secondOperand === this.registerNames.r1) {
          this.registers.r1 = firstOperand;
        } else {
          this.registers.r2 = firstOperand;
        }
        break;
      }
      case INSTRUCTIONS.STORE_WORD: {
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
      console.log(this.registers);
    }
  }
}

module.exports = CPU;
