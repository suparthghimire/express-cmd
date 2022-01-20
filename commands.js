#!/usr/bin/env node

const { program } = require("commander");
const { prompt } = require("inquirer");
program.version("1.0.0").description("Express Server Initializer");

const CreateServer = [
  {
    type: "input",
    name: "file_name",
    message: "Name of Entry Point File",
    validate: (input) => {
      const split = input.split(" ");
      if (split.length > 1) return "🚩 File Name Cannot Container Spaces";
      const regex = new RegExp(/^[a-zA-Z_ ... ]+$/);
      const match_regex = regex.test(input);
      if (!match_regex)
        return "🚩 Name can only contain Letters and Underscore (_) symbol";
      return true;
    },
  },
];
program
  .command("express-cli:init")
  .alias("ec:init")
  .description("Initializes Express Server")
  .option("--module", "-m", "Es6 Module Imports")
  .action((options) => {
    prompt(CreateServer).then((ans) => {
      console.log("File Created");
    });
  });

program.parse(process.argv);
