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
      }
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
        this.destinationPath('src/js/app.js')
      );
      this.fs.copy(
        this.templatePath('reset.css'),
        this.destinationPath('src/css/app.scss')
      );
      
      this.npmInstall(['webpack'], { 'save-dev': true });
      this.npmInstall(['spsave'], { 'save-dev': true });
      this.npmInstall(['css-loader'], { 'save-dev': true });
      this.npmInstall(['node-sass'], { 'save-dev': true });
      this.npmInstall(['sass-loader'], { 'save-dev': true });
      this.npmInstall(['extract-text-webpack-plugin'], { 'save-dev': true });
      this.npmInstall(['copy-webpack-plugin'], { 'save-dev': true });
      this.npmInstall(["clean-webpack-plugin"], { 'save-dev': true });
      
      done();
    });
  }
};
