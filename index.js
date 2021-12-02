const readline = require('readline');
const stream = require('stream');

/**
 * Provide prompting functionality.
 * @param {{ question: string, answer: string, muted: boolean }[]} questions
 * @returns {{ question: string, answer: string, muted: boolean }[]}
 * @example
 * nodePrompts([
 * 	{ question: 'User Name', answer: '', muted: false },
 * 	{ question: 'Password', answer: '', muted: true }
 * ]).then(([username, password]) => {
 * 	console.log(username.answer, password.answer);
 * });
 */
module.exports = function (title, questions = []) {
	const mutableStdout = new stream.Writable({
		write(chunk, encoding, callback) {
			if (!this.muted) {
				process.stdout.write(chunk, encoding);
			}
			callback();
		}
	});

	const rl = readline.createInterface({
		input: process.stdin,
		output: mutableStdout,
		terminal: true
	});

	console.log(`\x1b[32m${title}\x1b[0m`);
	console.log('\x1b[2mPress control+c to exit\x1b[0m');

	let promise = Promise.resolve();

	for (let index = 0, length = questions.length; index < length; index++) {
		promise = promise.then(() => {
			return new Promise((resolve) => {
				const { answer, question, muted = false } = questions[index];

				mutableStdout.muted = false;
				rl.question(`${question}${answer ? ` (${answer})` : ''}: `, (data) => {
					if (muted) {
						console.log('');
					}
					questions[index].answer = data || answer;
					resolve();
				});
				mutableStdout.muted = muted;
			});
		});
	}

	return promise.then(() => {
		rl.close();
		return questions;
	});
};
