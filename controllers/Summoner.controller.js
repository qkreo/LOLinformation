const SummonersService = require('../services/Summoner.service.js')


class SummonersController {
    
    summonersService = new SummonersService()

    getUserData = (req, res, next) => {
        const {name} = req.params
        try {
            const summoner = this.summonersService.getUserData(name)

            return res.status(200).json(summoner)

        } catch (err) {

            return next(err)
        }        
    }
}



module.exports = SummonersController