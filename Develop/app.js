const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const questions = [
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
    name: `ID number`,
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

const roleQuestion = [
  {
    type: "list",
    name: "role",
    message: `what's your role`,
    choices: [`Engineer`, `Manager`, `Intern`],
  },
];

const engQuestions = [
  {
    type: "input",
    name: "Github username",
    message: "what is your Github Username?",
    validate: function (answer) {
      if (answer.length < 1) {
        return "You must enter a Github Username";
      }
      return true;
    },
  },
];

const managerQuestions = [
  {
    type: "input",
    name: "manager",
    message: "what is your office phone number",
    validate: function (answer) {
      if (answer.length < 1) {
        return "You must enter a valid phone number";
      }
      return true;
    },
  },
];

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

const lastQuestion = [
  {
    type: "list",
    name: "last question",
    message: `Would you like to add any other team members`,
    choices: [`yes`, `no`],
  },
];

// whats ur name
// whats ur role
//  if eng -> whatsur gh
//  if int -> whatsur school
//  if manager -> whatsur office number
// whats your id
// whats your email

// have helper functions for each class

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// helper functions

function init() {
  inquirer.prompt([roleQuestion]);
}

function engQuestions() {
  inquirer.prompt([engQuestions]);
}
function managerQuestions() {
  inquirer.prompt([managerQuestions]);
}

function internQuestions() {
  inquirer.prompt([internQuestions]);
}

function lastQuestion() {
  inquirer.prompt([lastQuestion]);
}

// write questions out
// save the userInput
// write helper fucntions
// .thens for inquierer prompts
// write init func

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
