const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { error } = require("console");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// empty employees array
// employees from each session will be added in
const employees = [];

// first the three general questions will be asked (name, id#, email)
const initQuestions = [
  {
    type: "input",
    name: "name",
    message: `what's your name?`,
    validate: function (answer) {
      if (answer.length < 1) {
        return "You must enter a name";
      }
      return true;
    },
  },
  {
    type: "input",
    name: `ID`,
    message: `what's your ID number`,
    validate: function (answer) {
      if (answer.length < 1) {
        return "You must enter a valid ID Number";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "email",
    message: "what is your email",
    validate: function (answer) {
      if (answer.length < 1) {
        return "you must enter a valid email address";
      }
      return true;
    },
  },
];

// then the role question will be asked
// depending on the answer, only of the following questions will be asked
const roleQuestions = [
  {
    type: "list",
    name: "role",
    message: `what's your role`,
    choices: [`Engineer`, `Manager`, `Intern`],
  },
];

// if the user picks Engineer, this question is asked
const engQuestions = [
  {
    type: "input",
    name: "github",
    message: "what is your Github Username?",
    validate: function (answer) {
      if (answer.length < 1) {
        return "You must enter a Github Username";
      }
      return true;
    },
  },
];
// if the user picks manager, this question is asked
const managerQuestions = [
  {
    type: "input",
    name: "office",
    message: "what is your office number",
    validate: function (answer) {
      if (answer === NaN) {
        return "You must enter a valid number";
      }
      return true;
    },
  },
];
// if the user picks intern, this question is asked
const internQuestions = [
  {
    type: "input",
    name: "school",
    message: "What school do you go to?",
    validate: function (answer) {
      if (answer.length < 1) {
        return "You must enter a school";
      }
      return true;
    },
  },
];
// after all the questions are asked, the final question is asked
const finalQuestions = [
  {
    type: "list",
    name: "last",
    message: `Would you like to add any other team members`,
    choices: [`yes`, `no`],
  },
];

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// helper functions

function init() {
  inquirer.prompt(initQuestions).then((mainAnswers) => {
    roleBasedQuestions(mainAnswers);
  });
}

function roleBasedQuestions(mainAnswers) {
  inquirer.prompt(roleQuestions).then((e) => {
    switch (e.role) {
      case "Intern":
        console.log("test" + mainAnswers.name);
        internQuestion(mainAnswers);
        break;
      case "Engineer":
        engQuestion(mainAnswers);
        break;
      case "Manager":
        managerQuestion(mainAnswers);
        break;
    }
  });
}

function engQuestion(mainAnswers) {
  inquirer.prompt(engQuestions).then((answers) => {
    const engUser = answers.github;
    const engineer = new Engineer(
      mainAnswers.name,
      mainAnswers.ID,
      mainAnswers.email,
      engUser
    );
    employees.push(engineer);
    lastQuestion();
  });
}

function managerQuestion(mainAnswers) {
  inquirer.prompt(managerQuestions).then((answers) => {
    const managerUser = answers.office;
    const manager = new Manager(
      mainAnswers.name,
      mainAnswers.ID,
      mainAnswers.email,
      managerUser
    );
    employees.push(manager);
    lastQuestion();
  });
}

function internQuestion(mainAnswers) {
  inquirer.prompt(internQuestions).then((answers) => {
    const internUser = answers.school;
    const intern = new Intern(
      mainAnswers.name,
      mainAnswers.ID,
      mainAnswers.email,
      internUser
    );
    employees.push(intern);
    lastQuestion();
  });
}

function lastQuestion() {
  inquirer.prompt(finalQuestions).then((answers) => {
    const userInput = answers.last;
    if (userInput === `yes`) {
      init();
    } else {
      let html = render(employees);
      fs.writeFile("output/team.html", html, (err) => {
        if (err) {
          return "error";
        }
      });
      return;
    }
  });
}

init();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
