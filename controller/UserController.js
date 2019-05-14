const UserModel = require('../models/UserModel');
const AuthMiddleWare = require('../middlewares/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../env')

const RegisterUser = async function(req, res) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await UserModel.create({
          ...req.body,
          isVerified: false,
        });
        const token = jwt.sign({
          id: user._id
        }, env.JWT_SECRET, {
          expiresIn: '1h'
        });
        const result = user.toJSON();
        delete result['password'];
        // sendMail('confirm', 'adisco4420@gmail.com', token);
        res.status(200).json({
          status: 'success',
          data: {
            result: result
          }
        });
      } catch (err) {
        if (err.code === 11000) {
          res.status(400).json({
            status: 'error',
            message: 'this email already exist'
          })
        } else {
          res.status(500).json({
            status: 'error',
            message: 'server error occured',
          });
        }
      }
}

module.exports = {
    RegisterUser
}