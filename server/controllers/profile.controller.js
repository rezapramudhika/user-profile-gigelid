const model = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 13;

module.exports = {
    findById: (req, res) => {
        model.User.findById(req.decoded.id).then(data => {
            data.password = 'hidden';
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
    update: (req, res) => {
        model.User.update(req.body, {
            where: {
                id: req.decoded.id
            }
        }).then(data => {
            model.User.findById(req.decoded.id).then(data => {
                data.password = 'hidden';
                res.status(200).json({
                    msg: 'Success',
                    data
                });
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'Internal Server Error'
                })
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                msg: 'Internal Server Error'
            })
        });
    },
    uploadImage: (req, res) => {
        req.body.imgUrl = req.file.cloudStoragePublicUrl;
        model.User.update(req.body, {
            where: {
                id: req.decoded.id
            }
        }).then(data => {
            model.User.findById(req.decoded.id).then(data => {
                data.password = 'hidden';
                res.status(200).json({
                    msg: 'Success',
                    data: data
                });
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: 'Internal Server Error'
                })
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                msg: 'Internal Server Error'
            })
        });
    },
    changePassword: (req, res) => {
        model.User.findById(req.decoded.id)
            .then(data => {
                let check = bcrypt.compareSync(req.body.oldPassword, data.password);
                let salt = bcrypt.genSaltSync(saltRounds);
                let hash = bcrypt.hashSync(req.body.newPassword, salt);
                if (check) {
                    model.User.update({
                        password: hash
                    }, {
                            where: {
                                id: req.decoded.id
                            }
                        }).then(data => {
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
                } else {
                    res.status(401).json({
                        msg: 'Bad Credentials'
                    });
                }
            }).catch(err => {
                res.status(500).json({
                    msg: 'Error',
                    err
                })
            })
    }
}