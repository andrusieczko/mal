const Reader = function(tokens) {
  this.tokens = tokens;
  this.currentPosition = 0;
}
Reader.prototype = Object.assign(Reader.prototype, {
  tokens: null,
  currentPosition: null,

  peek() {
    if (this.currentPosition >= this.tokens.length) {
      return null;
    }
    return this.tokens[this.currentPosition];
  },

  next() {
    const result = this.peek();
    this.currentPosition++;
    return result;
  }
});

const tokenizer = (input) => {
  const re = /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"|;.*|[^\s\[\]{}('"`,;)]*)/g;
  const results = [];
  while ((match = re.exec(input)[1]) != '') {
      if (match[0] === ';') { continue; }
      results.push(match);
  }
  return results;
}

const readList = (reader) => {
  const forms = [];
  while (reader.next()) {
    if (reader.peek() === ')') {
      break;
    }
    forms.push(readForm(reader));
  }
  return forms;
}

const readAtom = (reader) => {
  const token = reader.peek();
  if (!isNaN(parseInt(token))) {
    return {
      type: 'number',
      value: parseInt(token)
    }
  }
  return {
    type: 'symbol',
    value: token
  }
}

const readForm = (reader) => {
  const token = reader.peek();
  if (token === '(') {
    return readList(reader);
  }
  return readAtom(reader);
}

const readStr = (input) => {
  const tokens = tokenizer(input);
  const reader = new Reader(tokens);
  return readForm(reader);
}

module.exports = {readStr};