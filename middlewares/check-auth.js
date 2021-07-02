const { verify } = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
    
    if(req.method === "OPTIONS"){
        return next();
    }
    else {
        try {
            const token = req.headers.authorization;
           
            if(!token) {
                res.json({ authenticationError: true, message: "No Authorized User" });
            }    
            const decodeToken = verify(token, 'amey@99**');
            req.userData = { userId: decodeToken.userId, email: decodeToken.email };
            next();
        }
        catch(error) {
            console.log(error);
            res.json({
                authenticationError: true,
                message: "Authentication Failed."
            });
            return next();
        }
    }
};

exports.checkAuth = checkAuth;