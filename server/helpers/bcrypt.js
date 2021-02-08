const bcrypt = require('bcryptjs');

function hashPass (pass) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(pass, salt);
  return hash
}

function comparePass (pass, hashPass) {
  return bcrypt.compareSync(pass, hashPass);
}

module.exports =  {hashPass, comparePass}
