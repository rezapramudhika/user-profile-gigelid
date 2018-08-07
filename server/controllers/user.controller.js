const model = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 13;

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
        model.User.find().then(data => {
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
    
}