import inquirer from "inquirer";
import chalk from "chalk";
const quizApi = "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let quiz = await fetch(data);
    let res = await quiz.json();
    return res.results;
};
let data = await fetchData(quizApi);
let startQuiz = async () => {
    let score = 0;
    // for user name
    let name = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "What Is Your Name?"
    });
    for (let i = 1; i <= 5; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let answer = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answers.map((val) => val),
        });
        if (answer.quiz == data[i].correct_answer) {
            ++score;
            console.log(chalk.italic.blue.bold("Correct"));
        }
        else {
            console.log(`Correct Answer is ${chalk.bold.italic.red(data[i].correct_answer)}`);
        }
    }
    console.log(`Dear ${chalk.bold.green(name.name)}, Your Score is ${chalk.bold.red(score)} Out Of ${chalk.red.bold("5")}`);
};
startQuiz();
