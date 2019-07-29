const ContactModel = require('../models/ContactModel');
const { validateDuplicate } = require('../services/contactSrv');

const AddContact = async function (req, res) {
    try {
        const contactList = await ContactModel.find({userId: req.user})
        if (validateDuplicate(contactList, req.body.email, 'email')) {
            const createContact = await ContactModel.create({
                userId: req.user,
                ...req.body
             })
        res.status(200).json({status: 'success', data: createContact})
        } else {
            res.status(400).json({status: 'error', message: `(${req.body.email}) email already exist in your contact`})
        }
    } catch (error) {
        res.status(500).json({status: 'error', message: error})
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