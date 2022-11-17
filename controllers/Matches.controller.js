const MatchesService = require('../services/Matches.service.js')


class MatchesController {
    
    matchesService = new MatchesService()

    getMatchData = async (req, res, next) => {
        const {sumNum,num} = req.params

        try {
            const summoner = await this.matchesService.getMatchData(sumNum,num)
            
            return res.status(200).send(summoner)

        } catch (err) {

            return next(err)
        }        
    }

    getChampion = async (req, res, next) => {

        const {championName} = req.params
        
        try {

            const champion = await this.matchesService.getChampion(championName)
            
            return res.status(200).send(champion)

        } catch (err) {

            return next(err)
        }
    }

}



module.exports = MatchesController