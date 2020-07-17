const bcrypt = require('bcrypt');
const saltRounds = 10;


function hashPassword(input){
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(input, salt);
    return hash
}


function decodePassword(input, passwordFromDB){
    return bcrypt.compareSync(input, passwordFromDB);
}

module.exports = {hashPassword, decodePassword}