const readline = require('../js/node_readline');
const read = input => input;
const lispEval = input => input;
const print = input => input;
const rep = input => print(
    lispEval(
      read(input)
    )
  );

while (true) {
  const input = readline.readline('user> ');
  if (!input || input.length === 0) {
    break;
  }
  console.log(rep(input));
}
