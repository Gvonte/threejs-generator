'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    // this.log(
    //   yosay(`Welcome to the dazzling ${chalk.red('generator-gvonte')} generator!`)
    // );

    // const prompts = [
    //   {
    //     type: 'confirm',
    //     name: 'someAnswer',
    //     message: 'Would you like to enable this option?',
    //     default: true
    //   }
    // ];

    // return this.prompt(prompts).then(props => {
    //   // To access props later use this.props.someAnswer;
    //   this.props = props;
    // });
  }

  writing() {
    // let target = [
    //   'public/favicon.ico', 
    //   'public/index.html', 
    //   'package.json', 
    //   'proxy.json', 
    //   'build/build.js', 
    //   'build/check-versions.js',
    // ];
    this.fs.copy(
      this.templatePath(),
      this.destinationPath()
    );
  }

  install() {
    // this.installDependencies();
    this.npmInstall();
  }
};
