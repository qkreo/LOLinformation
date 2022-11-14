const MathcesService = require('../services/Matches.service.js')


class MatchesController {
    
    mathcesService = new MathcesService()

    getMatchData = async (req, res, next) => {
        // const {name} = req.params
        try {
            const summoner = await this.mathcesService.getLeagueData()
            
            return res.status(200).send(summoner)

        } catch (err) {

            return next(err)
        }        
    }

    getChampion = async (req, res, next) => {

        const {championName} = req.params
        
        try {

            const champion = await this.mathcesService.getChampion(championName)
            
            return res.status(200).send(champion)

        } catch (err) {

            return next(err)
        }
    }

}



module.exports = MatchesController