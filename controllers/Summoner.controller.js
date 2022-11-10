const SummonersService = require('../services/Summoner.service.js')


class SummonersController {
    
    summonersService = new SummonersService()

    getUserData = async (req, res, next) => {
        const {name} = req.params
        try {
            const summoner = await this.summonersService.getUserData(name)
            
            return res.status(200).send(summoner)

        } catch (err) {

            return next(err)
        }        
    }
}



module.exports = SummonersController