let userData = require('./userData.json');

module.exports = {
    getAllUsers: (req, res) => {
        //this looks great, but could have saved you some typing to destrucure a little bit
        if(req.query.favorites){
            const filteredUsers = userData.filter(user => user.favorites.includes(req.query.favorites)) 
            res.status(200).send(filteredUsers)
        }
        if(req.query.age){
            const filteredAge = userData.filter(user => user.age < req.query.age)
            res.status(200).send(filteredAge)
        }
        if(req.query.email){
            const filteredEmail = userData.filter(user => user.email === req.query.email)
            res.status(200).send(filteredEmail)
        } else {
            res.status(200).send(userData);
        }
    },
    getUser: (req, res) => {
        const {id} = req.params;
        const oneUser = userData.findIndex(user => user.id === +id)
        if(oneUser === -1){
            res.sendStatus(404);
        }
        //this should be in an else clause, without it you get the error, "can not send headers afte they are sent"
        res.status(200).send(userData[oneUser])
    },
    getAllAdmin: (req, res) => {
        //try using an implicit return with this arrow function
        const admin = userData.filter((user) => {
            return user.type === 'admin'
        });
        res.status(200).send(admin);
    },
    getAllNonAdmin: (req, res) => {
        //same implicit return
        const nonAdmin = userData.filter((user) => {
            return user.type !== 'admin'
        });
        res.status(200).send(nonAdmin);
    },
    getUserByType: (req, res) => {
        //implicit retrun
        const filteredByType = userData.filter((user) => {
           return user.type === req.params.userType;
        });
        res.status(200).send(filteredByType);
    },
    addUser: (req, res) => {
        //this is not a good idea, because if you delete a user in the middle of the array then you could create users with duplicate ids
        req.body.id = (userData[userData.length - 1].id) + 1;
        const {body} = req;
        userData.push(body);
        res.status(200).send(userData);
        
    },
    updateUser: (req, res) => {
        const {id} = req.params;
        const {body} = req;
        const users = userData.map((user) => {
            
            if(user.id === +id) {
                //try using a spread operator to shorten this
                user.first_name = body.first_name,
                user.last_name = body.last_name,
                user.email = body.email,
                user.gender = body.gender,
                user.language = body.language,
                user.age = body.age,
                user.city = body.city,
                user.state = body.state,
                user.type = body.type,
                user.favorites = body.favorites
            }
            return user;
        })
        res.status(200).send(users);
    },
    deleteUser: (req, res) => {
        allUsers = userData.filter((user) => user.id !== +req.params.id)
        res.status(200).send(allUsers);
    }
}
