let userData = require('./userData.json');

module.exports = {
    getAllUsers: (req, res) => {
        //this looks great, but could have saved you some typing to destrucure a little bit
        const {favorites, age, email} = req.query;
        if(favorites){
            const filteredUsers = userData.filter(user => user.favorites.includes(favorites)) 
            res.status(200).send(filteredUsers)
        }
        if(age){
            const filteredAge = userData.filter(user => user.age < age)
            res.status(200).send(filteredAge)
        }
        if(email){
            const filteredEmail = userData.filter(user => user.email === email)
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
        } else {
        //this should be in an else clause, without it you get the error, "can not send headers afte they are sent"
            res.status(200).send(userData[oneUser])
        }
    },
    getAllAdmin: (req, res) => {
        //try using an implicit return with this arrow function
        const admin = userData.filter((user) =>  user.type === 'admin');
        res.status(200).send(admin);
    },
    getAllNonAdmin: (req, res) => {
        //same implicit return
        const nonAdmin = userData.filter((user) => user.type !== 'admin');
        res.status(200).send(nonAdmin);
    },
    getUserByType: (req, res) => {
        //implicit return
        const filteredByType = userData.filter((user) => user.type === req.params.userType);
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
                //spread operator
                const {id} = user;
                user = {id,...body};
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
