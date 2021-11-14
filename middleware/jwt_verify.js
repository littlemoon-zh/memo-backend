const jwt = require("jsonwebtoken");

/**
 *
 * @param req, contains token
 * @param res
 * @param next
 */
const jwt_verify = (req, res, next) => {
    try {
        const verified = jwt.verify(req.headers['token'] || "", process.env.SECRET_KEY);
        req.userId = verified.id;
        console.log(verified, 'verified');
    } catch (e) {
        console.log(e)
        res.json({
            msg: 'verification failed',
            code: '400'
        });
        return
    }
    next();
}

const sign = (data) => {
    return jwt.sign(data, process.env.SECRET_KEY, {expiresIn: '7200s'})
}

exports.jwt_verify = jwt_verify;
exports.sign = sign