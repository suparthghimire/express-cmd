const { CreateInitServer } = require("./utils/server_template");
const fs = require("fs");
const {
  CreateController,
  CreateRoute,
} = require("./utils/controller_route_template");
const fsPromises = fs.promises;
const CreateServerFile = (parameters) => {
  const data = CreateInitServer(parameters.module, parameters);
  fsPromises
    .writeFile(parameters.file_name, data)
    .then(() => {
      console.log("Server Initialized");
    })
    .catch((err) => console.error("Error", err));
};

const CreateControllerFile = async (parameters) => {
  const crud = parameters.crud || parameters.c;
  let fileName =
    parameters.file_name[0].toUpperCase() +
    parameters.file_name.slice(1) +
    "Controller.js";
  const dir = "./controllers";

  if (!fs.existsSync(dir)) await fsPromises.mkdir(dir, { recursive: false });
  await fsPromises.open(`./controllers/${fileName}`, "w");

  const data = CreateController(crud);
  await fsPromises.writeFile(`./controllers/${fileName}`, data);
  console.log("Controller Created");
};

const CreateRouteFile = async (parameters) => {
  const crud = parameters.crud || parameters.c;
  let fileName =
    parameters.file_name[0].toLowerCase() +
    parameters.file_name.slice(1) +
    ".js";
  let controllerName =
    parameters.file_name[0].toUpperCase() +
    parameters.file_name.slice(1) +
    "Controller";
  const dir = "./routes";
  if (!fs.existsSync(dir)) await fsPromises.mkdir(dir, { recursive: false });

  const data = CreateRoute(controllerName, crud, parameters.module);
  await fsPromises.writeFile(`./routes/${fileName}`, data);
  console.log("Route File Created");
};
module.exports = { CreateServerFile, CreateControllerFile, CreateRouteFile };
