import jwt from 'jsonwebtoken';
import crypto  from 'crypto';
import config from '../config';


let secret =  config.secret; 

function login (req, res)  {
    try {
        let refreshId = res.locals.auth.userId + secret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        res.locals.auth.refreshKey = salt;
        let token = jwt.sign(res.locals.auth, secret);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        res.status(201).send({accessToken: token, refreshToken: refresh_token});
        console.log('login success');
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

const minutes = 5;

function refresh_token (req, res) {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, secret);
        res.status(201).send({id: token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

function facebookLogin (req, res) {
    let appToken = jwt.sign(res.locals.auth, secret ,{expiresIn: 2 * 60});
    res.send({appToken: appToken})
}

export default { login, refresh_token, facebookLogin }