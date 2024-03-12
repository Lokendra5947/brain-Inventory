const bcrypt = require('bcrypt')
const hashPassword = async (password) => {
    let hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword
 
}

const matchPassward = async (inputPassword,hashedPassword) => {
    let matchedPassward = await bcrypt.compare(inputPassword, hashedPassword);
    return matchedPassward;    
}
module.exports = {hashPassword,matchPassward}
