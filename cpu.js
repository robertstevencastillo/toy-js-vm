const INSTRUCTIONS = require('./instructions');

class CPU {
  // private fields
  #currentInstruction = 0;

  constructor(memory) {
    this.memory = memory;

    this.registerNames = {
      pc: 0x0,
      r1: 0x10,
      r2: 0x12,
      zf: 0x14,
    };

    this.registers = {
      pc: 0, // your PC register doesn't hold an instruction but it should hold an 'index' (In a real CPU, it holds a memory address).
      r1: 10,
      r2: 20,
      zf: 0, // zero flag register. If value stored in a register is 0, then set zf to 1, else zf stays set to 0.
    };
  }

  fetch() {
    this.#currentInstruction = this.memory[this.registers.pc];
  }

  execute() {
    // Decoding
    const operator = this.#currentInstruction;
    const firstOperand = this.memory[this.registers.pc + 1];
    const secondOperand = this.memory[this.registers.pc + 2];

    // Point the register to the next operand in memory, once an instruction has been fetched and decoded
    this.registers.pc += 3;

    // Executing
    switch (operator) {
      // TODO: The way we implemented this instruction is incorrect
      case INSTRUCTIONS.LOAD_WORD: {
        if (firstOperand === this.registers.r1) {
          this.registers.r1 = this.memory[secondOperand];
        } else {
          this.registers.r2 = this.memory[secondOperand];
        }
        break;
      }
      case INSTRUCTIONS.STORE_WORD: {
        this.memory[secondOperand] = this.registers.r1;
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
      // TODO: Implement JZ Instruction
      case INSTRUCTIONS.JZ: {
        if (this.registers.zf) return; // Exit
        break;
      }
      default: {
        break;
      }
    }
  }

  run() {
    while (this.memory[this.registers.pc] !== INSTRUCTIONS.HALT) {
      this.fetch();
      this.execute();
    }
  }
}

module.exports = CPU;
