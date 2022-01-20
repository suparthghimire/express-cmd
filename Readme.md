# Express-CMD

CLI tool to Generate Boilerplate Code for Initialization of Servers, Creating Routes and Creating Controllers

It is tiresome to write same lines of Code to initialize server, create routes and creating controllers for Express based applications.

Specially if the application is very Large, and there are alot of routes to create, this gives unnecessary headache while development. This only is route creation. Creating controllers for these routes is even more tiresome.

Express-cmd package removes this headache by allowing you to generate these files on the fly with some simple commands.

Note: This Package Officially replaces Express-Cr Package.

## Requirements

The Application Runs on Node JS v10x and above. The tool is made for Express Framework.

### Compilation Requirements

- Node JS v10.x and above
- Express## Installation

Installation Globally

```bash
$ npm install --global express-cmd
```

Installation In as Dev Dependency

```bash
$ npm install --save-dev express-cmd
```

## File Generation

The file structure adopted by express-cmd is as below:

```folter
root
├── controllers         # Auto Generated when command is run First Time.
                          All Files for controllers reside inside this directory.
├── routes              # Auto Generated when command is run First Time.
                          All Files for routing reside in inside this directory
├── server.js           # Auto Generated with Command is run first time
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

```

Server Initialization

```bash
$ express-cmd init
? Name of Entry Point File server.js
? Are you using dotenv package (y/n) y
? Are You using Cookie Parser package (y/n) y
? Template Name [Supported: pug, ejs.] Leave Blank if No Template is used
? Views Directory Name Leave Blank if No Template is used
? Are You Using es6 imports? (y/n) n
Server Initialized
```

Creating Controller and Routes Combined (No CRUD Functions)

```bash
$ express-cmd cr-create
? Name of Controller: Name
Route File Created
Controller Created
```

Creating Controller and Routes Combined (With CRUD Functions)

```bash
$ express-cmd cr-create -c
? Name of Controller: Name
Controller Created
```

Creating Controller Only (Without CRUD)

```bash
$ express-cmd c-create
? Name of Controller: Name
Controller Created
```

Creating Controller Only (With CRUD)

```bash
$ express-cmd c-create -c
? Name of Controller: Name
```

Creating Route Only (Without CRUD)

```bash
$ express-cmd r-create
? Name of Route: Name
```

Creating Route Only (With CRUD)

```bash
$ express-cmd r-create -c
? Name of Route: Name
```

[GitHub](https://github.com/suparthghimire/express-cmd)
