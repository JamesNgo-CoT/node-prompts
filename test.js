const nodePrompts = require('./index');

nodePrompts([
	{ question: 'Question 1', answer: 'Answer 1', muted: false },
	{ question: 'Question 2', answer: '', muted: true }
], 'PROMPT').then(([username, password]) => {
	console.log(username.answer, password.answer);
});
