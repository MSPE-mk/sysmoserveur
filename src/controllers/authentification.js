const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const user = {
    id: 1,
    login: 'admin',
    password: 'admin123'
}

const accessTokenSecret = 'hkjshkhuedlortipoirujto';

exports.login = function (req, res) {
    console.log(req.body);
    User.find(req.body, (err, user) => {
        if (err) {
            res.status(404).json({ msg: 'Failed to connect to data base' })
        } else {
            if (user.length == 0) {
                console.log('user not found');
                res.status(204).send({msg:'user not exist'});
            } else {
                // Generate an access token
                const accessToken = jwt.sign({ username: user[0].username }, accessTokenSecret, { expiresIn: "1h" });
                let userInfo = {
                    name: user[0].username
                };
                res.status(200).json({ token: accessToken, expiresIn: 3600, userInfo: userInfo });
            }
        }
    })
}

exports.getUserById = function (req, res) {
    res.status(200).json({
        data: user
    })
}