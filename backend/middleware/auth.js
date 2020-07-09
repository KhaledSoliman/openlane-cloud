const admin = require('../services/firebase');

const authMiddleware = (whiteList =[]) => (req, res, next) => {
    //skip whitelisted urls
    if(whiteList.find(req.baseUrl))
        next();
    //authenticate request
    return admin.auth().verifyIdToken(req.idToken)
        .then(function(decodedToken) {
            let uid = decodedToken.uid;
            return next();
            // ...
        }).catch(function(error) {
            return res.send(401, 'Failed to authenticate your request');
        });
};

module.exports = authMiddleware;