const nodePrompts = require('./index');

nodePrompts('PROMPT', [
	{ question: 'User Name', answer: '', muted: false },
	{ question: 'Password', answer: '', muted: true }
]).then(([username, password]) => {
	console.log(username.answer, password.answer);
});
