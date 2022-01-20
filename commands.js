#!/usr/bin/env node

const { program } = require("commander");
const { prompt } = require("inquirer");
const {
  CreateServerFile,
  CreateControllerFile,
  CreateRouteFile,
} = require("./index");
const pkg = require("./package.json");
program.version(pkg.version).description(pkg.description);

const module_ques = {
  type: "input",
  name: "module",
  message: "Are You Using es6 imports? (y/n)",
  validate: (input) => {
    const split = input.split(" ");
    if (split.length > 1) return "🚩 Spaces Are Not Allowed";
    if (input.toLowerCase() !== "y" && input.toLowerCase() !== "n")
      return "🚩 Valid Inputs are: (Y, y, N, n)";
    return true;
  },
};

const CreateServer = [
  {
    type: "input",
    name: "file_name",
    message: "Name of Entry Point File",
    validate: (input) => {
      input = input.trim();
      const split = input.split(" ");
      if (split.length > 1) return "🚩 File Name Cannot Container Spaces";
      const regex = new RegExp(/^[a-zA-Z_ ... ]+$/);
      const match_regex = regex.test(input);
      if (!match_regex)
        return "🚩 Name can only contain Letters and Underscore (_) symbol";
      return true;
    },
  },
  {
    type: "input",
    name: "d_e",
    message: "Are You using dotenv package (y/n)",
    validate: (input) => {
      input = input.trim();
      const split = input.split(" ");
      if (split.length > 1) return "🚩 Spaces Are Not Allowed";
      if (input.toLowerCase() !== "y" && input.toLowerCase() !== "n")
        return "🚩 Valid Inputs are: (Y, y, N, n)";
      return true;
    },
  },
  {
    type: "input",
    name: "c_p",
    message: "Are You using Cookie Parser package (y/n)",
    validate: (input) => {
      input = input.trim();
      const split = input.split(" ");
      if (split.length > 1) return "🚩 Spaces Are Not Allowed";
      if (input.toLowerCase() !== "y" && input.toLowerCase() !== "n")
        return "🚩 Valid Inputs are: (Y, y, N, n)";
      return true;
    },
  },
  {
    type: "input",
    name: "template",
    message:
      "Template Name [Supported: pug, ejs.] Leave Blank if No Template is used",
    validate: (input) => {
      const split = input.split(" ");
      if (split.length > 1) return "🚩 Spaces Are Not Allowed";
      if (
        input.toLowerCase() !== "ejs" &&
        input.toLowerCase() !== "pug" &&
        input.toLowerCase() !== ""
      )
        return "🚩 Entered Templated Is not supported yet";
      return true;
    },
  },

  {
    type: "input",
    name: "views_directory",
    message: "Views Directory Name Leave Blank if No Template is used",
    validate: (input) => {
      const split = input.split(" ");
      if (split.length > 1) return "🚩 Spaces Are Not Allowed";
      return true;
    },
  },
  module_ques,
];

const CreateController = [
  {
    type: "input",
    name: "file_name",
    message: "Name of Controller",
    validate: (input) => {
      const split = input.split(" ");
      if (split.length > 1) return "Names Cannot hava Spaces";
      const regex = new RegExp(/^[a-zA-Z_ ... ]+$/);
      const match_regex = regex.test(input);
      if (!match_regex) return "Name Can only Contain Letters and _ Symbol";
      return true;
    },
  },
  module_ques,
];
const CreateRoute = [
  {
    type: "input",
    name: "file_name",
    message: "Name of Route",
    validate: (input) => {
      const split = input.split(" ");
      if (split.length > 1) return "Names Cannot hava Spaces";
      const regex = new RegExp(/^[a-zA-Z_ ... ]+$/);
      const match_regex = regex.test(input);
      if (!match_regex) return "Name Can only Contain Letters and _ Symbol";
      return true;
    },
  },
  module_ques,
];

program
  .command("express-cli:init")
  .alias("ec:init")
  .description("Initializes Express Server")
  .option("--module", "-m", "Es6 Module Imports")
  .action((options) => {
    prompt(CreateServer).then((ans) => {
      options = {
        ...options,
        ...ans,
        c_p: ans.c_p === "y" ? true : false,
        d_e: ans.d_e === "y" ? true : false,
        module: ans.module === "y" ? "es6" : "es5",
      };
      CreateServerFile(options);
    });
  });

program
  .command("express-cli:cr-create")
  .alias("ec:cr-create")
  .description("Create Controller and Route")
  .option("-c", "CRUD Functions Implementation")
  .option("--crud", "Crud Function Implementation")
  .action((options) => {
    prompt(CreateController).then((ans) => {
      const parameters = {
        ...options,
        ...ans,
        module: ans.module === "y" ? "es6" : "es5",
      };
      CreateControllerFile(parameters);
      CreateRouteFile(parameters);
    });
  });

program.parse(process.argv);
