const model = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 13;
const jwt = require('jsonwebtoken');

module.exports = {
    register: (req, res) => {
        const { email, name, password, contact } = req.body
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(password, salt);
        model.User.create({
            email,
            name,
            password: hash,
            contact
        }).then(data => {
            data.password = 'Hidden'
            res.status(200).json({
                msg: 'Success',
                data
            })
        }).catch(err => {
            res.status(500).json({
                msg: 'Error',
                err
            })
        })
    },
    get: (req, res) => {
        model.User.findAll().then(data => {
            res.status(200).json({
                msg: 'Success',
                data
            })
        }).catch(err => {
            res.status(500).json({
                msg: 'Error',
                err
            })
        })
    },
    checkEmail: (req, res) => {
        model.User.find({ 
            where: { email: req.query.email } 
        }).then(data => {
            if(data){
                res.status(403).json({
                    msg: 'Email already in use!'
                })
            }else{
                res.status(200).json({
                    msg: 'Email available'
                })
            }
        }).catch(err => {
            res.status(500).json({
                msg: 'Error',
                err
            })
        })
    },
    checkContact: (req, res) => {
        model.User.find({ 
            where: { contact: req.query.contact } 
        }).then(data => {
            if(data){
                res.status(403).json({
                    msg: 'Phone number already in use!'
                })
            }else{
                res.status(200).json({
                    msg: 'Phone number available'
                })
            }
        }).catch(err => {
            res.status(500).json({
                msg: 'Error',
                err
            })
        })
    },
    login: (req, res) => {
        const { email, password } = req.body;
        model.User.findOne({
            where: { email: email }
        })
            .then(data => {
                if (data) {
                    let check = bcrypt.compareSync(password, data.password);
                    if (check) {
                        const token = jwt.sign({ id: data.id, email: data.email }, process.env.SECRETKEY);
                        data.password = 'hidden';
                        data.dataValues.token = token;
                        res.status(200).json({
                            msg: 'Success',
                            data
                        })
                    }else {
                        res.status(401).json({
                            msg: 'Bad Credentials'
                        });
                    }
                } else {
                    res.status(404).json({
                        msg: 'User Not Found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'Internal Server Error'
                })
            })
    },
    findById: (req, res) => {
        model.User.findById(req.decoded.id).then(data => {
            res.status(200).json({
                msg: 'Success',
                data
            })
        }).catch(err => {
            res.status(500).json({
                msg: 'Error',
                err
            })
        })
    },
}