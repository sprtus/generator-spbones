const chalk = require('chalk');
const mkdirp = require('mkdirp');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.log(`\n💀 💀 💀  ${chalk.blueBright('Let’s create a SharePoint project...')}\n`);

    // [name] attribute
    this.argument('name', { type: String, required: false });

    // Folders created during project setup
    this.folders = [
      'src/js',
      'src/layout',
      'src/master',
      'src/scss',
      'src/wp',
    ];

    // Files copied during project setup
    this.files = [
      '.gitignore',
      'entry.js',
      'package.json',
      'SPGo.json',
      'webpack.config.js',
      'src/js/app.js',
      'src/scss/app.scss',
    ];

    // NPM packages for installation
    this.packages = [
      'babel-core',
      'babel-loader',
      'babel-preset-env',
      'css-loader',
      'extract-text-webpack-plugin',
      'file-loader',
      'glob',
      'node-sass',
      'path',
      'sass-loader',
      'webpack',
    ];
  }

  prompting() {
    if (this.options.name && this.options.name.length) {
      this.destinationRoot(this.options.name);
      this.config = { name: this.options.name };
      return;
    } else {
      return this.prompt([{
        type: 'input',
        name: 'name',
        message: 'App Name (Folder Name):',
        default: this.appname,
      }]).then(answers => {
        this.destinationRoot(answers.name);
        this.config = answers;
      });
    }
  }

  writing() {
    // Create folders
    this.log('\nSetting up project...');
    for (let folder of this.folders) {
      mkdirp.sync(this.destinationPath(folder));
    }

    // Copy files
    for (let file of this.files) {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.config,
      );
    }
  }

  install() {
    this.log('\nInstalling dependencies...');
    this.npmInstall(this.packages, { 'save-dev': true });
  }

  end() {
    this.log(chalk.gray('\n---'));
    this.log('\nYour project has been created:');
    this.log(chalk.greenBright(`  ${this.destinationRoot()}`));
    this.log('\nBuild assets:');
    this.log(chalk.greenBright('  npm run dev'));
    this.log(chalk.greenBright('  npm run watch'));
    this.log(chalk.greenBright('  npm run production'));
    this.log('\nCheck out SPFlash for quick and easy template generation within your SPBones project.');
    this.log(chalk.green.underline('https://marketplace.visualstudio.com/items?itemName=spiritous.spflash'));
    this.log('\nCheck out SPGo for streamlined deployment to one or more SharePoint environments.');
    this.log(chalk.green.underline('https://marketplace.visualstudio.com/items?itemName=SiteGo.spgo'));
    this.log(chalk.blueBright('\nEnjoy. 💀\n'));
  }
};
