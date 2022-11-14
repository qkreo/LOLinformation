const Summoners = require("../models/sommoners")
const Bronze = require('../models/Bronze')
const Silver = require('../models/Silver')
const Gold = require('../models/Gold')
const Platinum = require('../models/Platinum')
const Diamond = require('../models/Diamond')
const Master = require('../models/Master')
const Grandmaster = require('../models/Grandmaster')
const Challenger = require('../models/Challenger')

class UserRepository {

    findSummoner = async (data) => {
        return await Summoners.findById(data)
    }

    saveSummoner = async (data) => {
        return await Summoners.create(data)
   
    }

}

module.exports = UserRepository