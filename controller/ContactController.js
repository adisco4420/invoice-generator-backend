const ContactModel = require('../models/ContactModel');
const UserModel = require('../models/UserModel');

const AddContact = async function (req, res) {
    try {
        const user = await UserModel.findById(req.user)
        const createContact = await ContactModel.create({
           userId: user._id,
           ...req.body
        })
        res.status(200).json({status: 'success', data: createContact})
    } catch (error) {
        res.status(500).json({status: 'error', message: 'server error occured'})
    }
}

const ListContact = async function(req, res) {
    try {
        const contacts = await ContactModel.find({userId: req.user});
        res.status(200).json({status: 'success', data: contacts});
    } catch (error) {
        res.status(500).json({status: 'error', message: 'server error occured'})
    }
}

module.exports = {
    AddContact,
    ListContact
}