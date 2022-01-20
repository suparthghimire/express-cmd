const fs = require("fs").promises;

const import_collecton = {
  express: (module) => {
    if (module === "es6") return 'import express from "express";';
    return 'const express = require("express");';
  },
  path: (module) => {
    if (module === "es6") return 'import path from "path";';
    return 'const path = require("path");';
  },
  cookie_parser: (module) => {
    if (module === "es6") return 'import cookieParser from "cookie-parser";';
    return 'const cookieParser = require("cookie-parser");';
  },
  dotenv: (module) => {
    if (module === "es6") return 'import dotenv from "dotenv";';
    return 'const dotenv = require("dotenv");';
  },
};
const init_collection = {
  express: () => "const app = express();",
  dotenv: () => "dotenv.config();",
};
const middleware_collection = {
  start_server: (port) =>
    "const PORT = process.env.port || " +
    port +
    ";\napp.listen(" +
    port +
    ", () => console.log(`Server Started at ${PORT}`));",
  initial_route: () =>
    'app.get("/", (req,res) => res.status(200).json({message:"OK"}))',

  public: (dir_name) =>
    `app.use(express.static(path.join(__dirname, ${dir_name})));`,
  json: () => "app.use(express.json());",
  urlencoded: (extended) =>
    `app.use(express.urlencoded({ extended: ${extended} }));`,
  cookie_parser: () => "app.use(cookieParser());",
};
const template_collecton = {
  pug: (sub_folder) => {
    return `app.set("view engine", "pug")\napp.set("views", "views${
      sub_folder && sub_folder !== null && sub_folder !== ""
        ? `/${sub_folder}`
        : ""
    }");`;
  },
  ejs: (sub_folder) => {
    return `app.set("view engine", "ejs")\napp.set("views", "views${
      sub_folder && sub_folder !== null && sub_folder !== ""
        ? `/${sub_folder}`
        : ""
    }");`;
  },
};

const combine_syntax = (module, options) => {
  let data = [];

  data.push(import_collecton.path(module));
  if (options.de) data.push(import_collecton.dotenv(module));
  data.push(import_collecton.express(module));
  if (options.cp) data.push(import_collecton.cookie_parser(module));

  data.push("\n");
  if (options.de) data.push(init_collection.dotenv());
  data.push(init_collection.express());

  data.push("\n");
  data.push(middleware_collection.json());
  data.push(middleware_collection.urlencoded(false));
  data.push(middleware_collection.public("public"));
  if (options.cp) data.push(middleware_collection.cookie_parser());

  data.push("\n");

  if (options.template === "pug") data.push(template_collecton.pug());
  else if (options.template === "ejs") data.push(template_collecton.ejs());

  data.push("\n");
  data.push(middleware_collection.initial_route());

  data.push("\n");
  data.push(middleware_collection.start_server(3000));
  return data.reduce((a, b) => a + "\n" + b);
};

module.exports = combine_syntax;
