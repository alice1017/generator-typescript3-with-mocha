import path from "path";
import Generator from "yeoman-generator";

const templateFiles = [
  ".eslintignore",
  ".eslintrc.js",
  ".gitignore",
  ".mocharc.json",
  ".travis.yml",
  "LICENSE",
  "package.json",
  "README.md",
  "src/index.ts",
  "test/index.test.ts",
  "tsconfig.json"
]

export default class TypescriptProjectGenerator extends Generator {

  constructor(args, options) {
    super(args, options);
  }

  async prompting() {
    const prompts = [
      {
        type: "input",
        name: "author",
        message: "Who is the author of this project?",
        default: this.user.git.name()
      },
      {
        type: "input",
        name: "project",
        message: "What is your project name?",
        default: path.basename(this.destinationRoot())
      },
      {
        type: "input",
        name: "description",
        message: "Write your project description"
      }
    ];
    this.answers = await this.prompt(prompts);
  }

  async writing(){

    for(const file of templateFiles) {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.answers
      );
    }
  }

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }
}
