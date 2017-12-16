const prStr = (form) => {
  if (Array.isArray(form)) {
    return '(' + form.map(subform => prStr(subform)).join(' ') + ')';
  }
  switch(form.type) {
    case 'symbol':
      return form.value;
    case 'number':
      return form.value;
  }
  return form;
}

module.exports = {prStr};