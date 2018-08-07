const jwt = require('jsonwebtoken');

module.exports = {
    loginAuth: (req, res, next) => {
        let token = req.headers.token;
        if(!token){
            return res.status(400).json({
                msg: 'Credential Required'
            })
        }
        try {
            var decoded = jwt.verify(token, process.env.SECRETKEY);
            if(decoded){
                req.decoded = decoded;
                next();
            }
          } catch(err) {
            res.status(400).json({
                msg: 'Invalid token'
            })
          }
    }
}