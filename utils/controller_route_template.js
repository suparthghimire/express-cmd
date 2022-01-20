const fs = require("fs").promises;
const create_controller_function = (name, status, message) => {
  return `${name}: (req, res) => res.status(${status}).json({ message: "${message}" })`;
};
const create_route_function = (
  method,
  route,
  controller_name,
  controller_function
) => {
  return `router.${method}("${route}", ${controller_name}.${controller_function})`;
};

const CreateController = (crud) => {
  const start = "module.exports = {";
  const index = create_controller_function("index", 200, "Index Endpoint");
  let crud_functions = [];
  if (crud)
    crud_functions = [
      create_controller_function("post", 201, "Post Endpoint"),
      create_controller_function("show", 200, "Show Endpoint"),
      create_controller_function("update", 201, "Update Endpoint"),
      create_controller_function("delete", 201, "Delete Endpoint"),
    ];

  const end = "};";
  const crud_data =
    crud_functions.length > 0
      ? crud_functions.reduce((a, b) => a + ",\n  " + b)
      : "";
  return start + "\n  " + index + ",  \n  " + crud_data + "\n" + end;
};
const CreateRoute = (controller_name, crud, module) => {
  let express_import = 'const express = require("express")';
  if (module === "es6") express_import = 'import express from "express"';

  let controller_import = `const ${controller_name} = require("../controllers/${controller_name}")`;
  if (module === "es6")
    controller_import = `import ${controller_name} from "../controllers/${controller_name}.js"`;

  const initialize_router = "const router = express().Router";

  const index_route = create_route_function(
    "get",
    "/",
    controller_name,
    "index"
  );
  let crud_routes = [];
  if (crud) {
    crud_routes = [
      create_route_function("post", "/post", controller_name, "post"),
      create_route_function("get", "/show/:id", controller_name, "show"),
      create_route_function("put", "/update/:id", controller_name, "update"),
      create_route_function("patch", "/update/:id", controller_name, "update"),
      create_route_function("delete", "/update/:id", controller_name, "delete"),
    ];
  }
  let crud_string = "";
  if (crud) {
    crud_string = crud_routes.reduce((a, b) => a + ";\n" + b);
  }
  return (
    express_import +
    ";\n" +
    initialize_router +
    ";\n\n" +
    controller_import +
    ";\n\n" +
    index_route +
    "\n" +
    crud_string +
    "\n"
  );
};

module.exports = {
  CreateRoute,
  CreateController,
};
