const UserService = require("../service/userservice");


class UserController {
    constructor() {
      this.userService = new UserService();
    }
    findUser = async (req, res, next) => {

        try {
            const { sommonerId } = req.body;
      
            let info = await this.userService.findUser(sommonerId);

            res.json(info);
          } catch (err) {
            next(err);
          }
        };
 
      };    
    
module.exports = UserController;
