"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log("Initializing...");
  }

  prompting() {
    var done = this.async();

    this.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter a name for your app: ",
        default: "spbones"
      },
      {
        type: "input",
        name: "appFolder",
        message: "Enter a name for your app folder: ",
        default : 'spbones'
      },
      {
        type: "input",
        name: "url",
        message: "Enter the url of the Sharepoint site: ",
      },{
        type: "input",
        name: "username",
        message: "UserName: ",
      },{
        type: "password",
        name: "password",
        message: "Password: ",
      },
    ]).then(answers => {
      this.destinationRoot(answers.appFolder);
      this.fs.copyTpl(
        this.templatePath("env.js"),
        this.destinationPath("env.js"),
        answers
      );
      this.fs.copyTpl(
        this.templatePath("package.json"),
        this.destinationPath("package.json"),
        answers
      );
      this.fs.copyTpl(
        this.templatePath("webpack.config.js"),
        this.destinationPath("webpack.config.js"),
        answers
      );
      this.fs.copy(
        this.templatePath('deploy.js'),
        this.destinationPath('deploy.js')
      );
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );

      this.fs.copy(
        this.templatePath('blank.nothing'),
        this.destinationPath('resources/js/app.js')
      );
      this.fs.copy(
        this.templatePath('blank.nothing'),
        this.destinationPath('resources/css/app.css')
      );
      // this.fs.mkdirp('resources');
      // this.fs.mkdirp('reseouces/js');
      // this.fs.mkdirp('resources/css');
      // this.fs.mkdirp('resources/fonts');
      // this.fs.mkdirp('resources/img');
      // this.fs.mkdirp('resources/webparts');
      
      done();
    });
  }
};
