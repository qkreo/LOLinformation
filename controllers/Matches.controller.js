const MatchesService = require('../services/Matches.service.js')


class MatchesController {
    
    matchesService = new MatchesService()

    getMatchData = async (req, res, next) => {
        
        try {
            const match = await this.matchesService.getLeagueData()
            // const match = await this.matchesService.getUserPuuId()
            return res.status(200).send(match)

        } catch (err) {

            return next(err)
        }        
    }

    getChampion = async (req, res, next) => {

        const {championId} = req.params
        
        try {

            const champion = await this.matchesService.getChampion(championId)
            
            return res.status(200).send(champion)

        } catch (err) {

            return next(err)
        }
    }

    getWinRatingByChamp = async (req, res, next) => {

        const {championId} = req.params;
        
        try {

            const winRating = await this.matchesService.getWinRatingByChamp(championId)

            return res.status(200).send(winRating)
        }
        catch (err) {

            return next(err)
        }
    }

}



module.exports = MatchesController