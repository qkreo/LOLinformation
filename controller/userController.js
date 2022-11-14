const UserService = require('../service/userservice');

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    findChallengers = async (req, res, next) => {
        try {
            let info = await this.userService.findChallengers();
            res.json(info);
        } catch (err) {
            next(err);
        }
    };

    findGrandmasters = async (req, res, next) => {
        try {
            let info = await this.userService.findGrandmasters();
            res.json(info);
        } catch (err) {
            next(err);
        }
    };

    findMasters = async (req, res, next) => {
        try {
            let info = await this.userService.findMasters();
            res.json(info);
        } catch (err) {
            next(err);
        }
    };

    findTiers = async (req, res, next) => {
        try {
            const { Tier } = req.params;
            const { Page } = req.query;
            let info = await this.userService.findTiers(Tier.toUpperCase(),Page);
            res.json(info);
        } catch (err) {
            next(err);
        }
    };

}

module.exports = UserController;
