// Global variables
let answer = null;
let error = null;
let operators = [];

// this variable holds the first number in the array numbers before pushing it
let numbersString = null;
// this variable holds the rest of the statment before pushing it to the statement
let statementString = null;

let numbers = [];
let previousValue = null;

function handleCalculations() {
	// reset variables
	reset();
	// get the input value
	let statement = document.getElementById("statement").value;
	// get all numbers and operators separately
	for (let i = 0; i < statement.length; i++) {
		// reset
		numbersString = "";
		statementString = "";
		if (
			statement[i] === "+" ||
			statement[i] === "-" ||
			statement[i] === "*" ||
			statement[i] === "/"
		) {
			operators.push(statement[i]);

			for (let k = 0; k < i; k++) {
				numbersString = numbersString.concat(statement[k]);
			}
			numbers.push(parseInt(numbersString));

			for (let j = i + 1; j < statement.length; j++) {
				statementString = statementString.concat(statement[j]);
			}
			statement = statementString;
			i = 0;
		}
		if (i === statement.length - 1) {
			numbers.push(parseInt(statement));
		}
	}
	// get the answer
	calculate(numbers, operators);
	// display the answer
	displayAnswer(answer);
}

function calculate(numbers, operators) {
	for (i = 0; i < numbers.length; i++) {
		switch (operators[i]) {
			case "+":
				if (i === 0) {
					answer = previousValue = numbers[i] + numbers[i + 1];
				} else {
					previousValue = answer = previousValue + numbers[i + 1];
				}
				break;
			case "-":
				if (i === 0) {
					answer = previousValue = numbers[i] - numbers[i + 1];
				} else {
					previousValue = answer = previousValue - numbers[i + 1];
				}
				break;
			case "*":
				if (i === 0) {
					answer = previousValue = numbers[i] * numbers[i + 1];
				} else {
					previousValue = answer = previousValue * numbers[i + 1];
				}
				break;
			case "/":
				if (i === 0) {
					answer = previousValue = numbers[i] / numbers[i + 1];
				} else {
					previousValue = answer = previousValue / numbers[i + 1];
				}
				break;
			default:
				error = "Syntax error invalid operator type";
		}
	}
}

function reset() {
	answer = null;
	error = null;
	operators = [];
	numbersString = null;
	statementString = null;
	numbers = [];
	previousValue = null;
}

function displayAnswer(answer) {
	if (isNaN(answer) || !answer) {
		answer = "syntax error";
	}
	let el = document.querySelector(".answer");
	el.setAttribute("data-after", "ans = " + answer);
}

function append(string) {
	let input = document.getElementById("statement");
	if (string === "ac") {
		input.value = "";
		let el = document.querySelector(".answer");
		el.setAttribute("data-after", "");
	} else if (string === "del") {
		let input = document.getElementById("statement");
		let newValue = input.value.slice(0, -1);
		input.value = newValue;
	} else input.value = input.value + string;
}

// show the answer when pressing enter key
document.getElementById("statement").addEventListener("keypress", function (e) {
	if (e.key === "Enter") {
		handleCalculations();
	}
});
