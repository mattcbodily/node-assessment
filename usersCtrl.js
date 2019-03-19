let userData = require('./userData.json');

module.exports = {
    getAllUsers: (req, res) => {
        let users = [];
        if(req.query.favorites){
            users = userData.filter((user) => {
                return user.favorites.includes(req.query.favorites)
            })
        } else if(req.query.age){
            users = userData.filter((user) => {
                return user.age < req.query.age;
            })
        } else if(req.query.email){
            users = userData.filter((user) => {
                return user.email === req.query.email;
            })
        } else {
            return userData;
        }
        res.status(200).send(users);
    },
    getUser: (req, res) => {
        const {id} = req.params;
        const oneUser = userData.findIndex(user => user.id === +id)
        if(oneUser === -1){
            res.sendStatus(404);
        }
        res.status(200).send(userData[oneUser])
    },
    getAllAdmin: (req, res) => {
        const admin = userData.filter((user) => {
            return user.type === 'admin'
        });
        res.status(200).send(admin);
    },
    getAllNonAdmin: (req, res) => {
        const nonAdmin = userData.filter((user) => {
            return user.type !== 'admin'
        });
        res.status(200).send(nonAdmin);
    },
    getUserByType: (req, res) => {
        const filteredByType = userData.filter((user) => {
           return user.type === req.params.userType;
        });
        res.status(200).send(filteredByType);
    },
    addUser: (req, res) => {
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