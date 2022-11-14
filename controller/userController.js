const UserService = require("../service/userservice");


class UserController {
    constructor() {
      this.userService = new UserService();
    }
    findUser = async (req, res, next) => {
        try {

            let info = await this.userService.findUser();

            res.json(info);
          } catch (err) {
            next(err);
          }
        };
    findgame = async (req, res, next) => {
      try {

          let info = await this.userService.findgame();

          res.json(info);
        } catch (err) {
          next(err);
        }
      };    

      };    
    
module.exports = UserController;
