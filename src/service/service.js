"use strict";

const {Cli} = require(`../cli`);

const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = `--help`;

const ExitCode = {
  success: 0,
  error: 1,
};

const runDefaultCommand = () => {
  Cli[DEFAULT_COMMAND].run();
};

const userArguments = process.argv.slice(USER_ARGV_INDEX);

if (userArguments.length === 0) {
  runDefaultCommand();
  process.exit(ExitCode.success);
} else {
  for (const command of userArguments) {
    if (Cli[command]) {
      Cli[command].run();
    } else {
      runDefaultCommand();
    }
    // EsLint ругается https://eslint.org/docs/rules/no-unused-expressions
    // Cli[command] ? Cli[command].run() : runDefaultCommand();
  }
  process.exit(ExitCode.success);
}
