const userModel = require("./models/userModel");

async function getUserByMail(email){
    try {
        const user  = await userModel.findOne({email})
        return user    
    } catch (error) {
        return resizeBy.status(404).json({error:"there is no such user with this mail "})
    }

}

module.exports = { getUserByMail }