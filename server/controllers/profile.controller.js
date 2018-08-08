const model = require('../models');

module.exports = {
    findById: (req, res) => {
        model.User.findById(req.decoded.id).then(data => {
            data.password = 'hidden'
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
}