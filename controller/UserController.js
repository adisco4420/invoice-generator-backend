const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../env')
const sendMail = require('../email');

const RegisterUser = async function(req, res) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await UserModel.create({
          ...req.body,
          isVerified: false,
          accounts: [
            {title: 'income', balance: 0.00},
            {title: 'expense', balance: 0.00},
            {title: 'outstanding', balance: 0.00}
          ]
        });
        const token = jwt.sign({
          id: user._id
        }, env.JWT_SECRET, {
          expiresIn: '1h'
        });
        const result = user.toJSON();
        delete result['password'];
        sendMail('confirm', user.email, token);
        res.status(200).json({
          status: 'success',
          data: {
            result: result,
            token
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
            message: err,
          });
        }
      }
}
const ConfirmUser = async function (req, res) {
  try {
    const token = req.body.token;
    const tokenData = jwt.verify(token, env.JWT_SECRET);

    const user = await UserModel.findById(tokenData.id)
    if (user.isVerified) return res.status(422).json({
      status: 'error',
      message: 'account has already been verified'
    });

    const updateUser = await UserModel.findByIdAndUpdate(tokenData.id, {
      isVerified: true
    }, {
      new: true
    });
    if (!updateUser) return res.status(403).json({
      status: 'error',
      message: 'user not found'
    })
    res.status(200).json({
      status: 'success',
      data: updateUser
    })
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'you are not authorized'
    });

  }
}
const ResendEmail = async function (req, res) {
  try {
    const user = await UserModel.findOne({email: req.body.email})
    if (!user) return res.status(404).json({status: 'error', message: 'user not found'});
    if (user.isVerified) return res.status(422).json({status: 'error', message: 'you are already verified'});
    const token = jwt.sign({
      id: user._id
    }, env.JWT_SECRET, {
      expiresIn: '1h'
    });
    sendMail('confirm', user.email, token);
    res.status(200).json({status: 'success', message: 'verification message has been sented'})
  } catch (error) {
    res.status(500).json({status:'error', message: 'server error'})
  }
}
const SetupUser = async function (req, res) {
  try {
    const user = await UserModel.findById(req.user)
    if(!user) return res.status(404).json({status:'not found', message: 'user not found'})
    const updateUser = await UserModel.findByIdAndUpdate(user._id, {...req.body})
    res.status(200).json({status: 'success', data: updateUser})
  } catch (error) {
    res.status(500).json({status: 'error', message: "server error occured"})
  }
}
const LoginUser = async function (req, res) {
  try {
    const user = await UserModel.findOne({
      email: req.body.email
    }, '+password');
    if (!user) return res.status(404).json({
      status: 'not found',
      message: 'invalid password or email'
    });

    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isValidPassword) return res.status(401).json({
      status: 'error',
      message: 'invalid password or email'
    })

    const result = user.toJSON();
    delete result['password'];
    const token = jwt.sign({
      id: user.id
    }, env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.status(200).json({
      data: {
        result: result,
        token
      }
    })

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'server error occured'
    })
  }
}

const UserProfile = async function (req, res) {
  try {
    const user = await UserModel.findById(req.user)
    if (!user) return res.status(404).json({
      status: 'bad input',
      message: 'user not found'
    });
    res.status(200).json({
      status: 'success',
      data: user
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'server error'
    })
  }
}
module.exports = {
    RegisterUser,
    ConfirmUser,
    ResendEmail,
    SetupUser,
    LoginUser,
    UserProfile
}