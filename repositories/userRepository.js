const Summoners = require("../models/summoners")

class UserRepository {

    findSummoner = async (data) => {
        return await Summoners.findById(data)
    }

    saveSummoner = async (data) => {
        return await Summoners.create(data)
   
    }

}

module.exports = UserRepository