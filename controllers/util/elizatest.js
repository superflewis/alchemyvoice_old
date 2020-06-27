const Eliza = require('eliza-as-promised');
 
var eliza = new Eliza();
 
// start an Eliza conversation
console.log('>> ' + eliza.getInitial());
 
// tell Eliza something
let statement = 'I need some help';
console.log('<< ' + statement);
 
// let Eliza respond
// will respond with response.final if you're done
// will respond with response.reply if you still need more therapy
eliza.getResponse(statement)
  .then((response) => {
    if (response.reply) {
      console.log('>> ' + response.reply);
    }
    if (response.final) {
      console.log('>> ' + response.final);
      process.exit(0);
    }
  });
 
// repeat getResponse() over and over till response.final is defined