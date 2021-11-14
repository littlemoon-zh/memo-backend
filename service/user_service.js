/**
 * user management logic
 * login logout register
 */

const User = require('../models/user');
const {sign} = require('../middleware/jwt_verify');

const user_login = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({"username": username});
    console.log(user);
    if (!user) {
        res.json({msg: 'username does not exist', code: 400, data: {}})
        return;
    }
    if (user.password === password) {
        const token = sign({username, id: String(user._id)});
        res.json({msg: 'success', code: 200, data: {token}})
    } else {
        res.json({msg: 'wrong password, try again', code: 400, data: {}})
    }
}

const user_logout = (req, res) => {

}

const user_register = async (req, res) => {
    try {
        let user = req.body;
        const filter = {username: user.username}
        console.log(filter);
        const result = await User.find(filter);
        // console.log('res', result);
        if (result.length === 0) {
            const new_user = await User.create(user);
            await new_user.save();
            res.json({msg: 'success', status: 200});
        } else {
            res.json({msg: 'User already exists', status: 400})
        }
    } catch (error) {
        console.log(error)
        res.json({msg: 'Register failed', status: 400});
    }


}

exports.user_login = user_login
exports.user_register = user_register
exports.user_logout = user_logout