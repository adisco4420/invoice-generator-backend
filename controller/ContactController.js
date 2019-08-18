const ContactModel = require('../models/ContactModel');
const { validateDuplicate } = require('../services/contactSrv');

const AddContact = async function (req, res) {
    try {
        const contactList = await ContactModel.find({userId: req.user})
        if (validateDuplicate(contactList, req.body.email, 'email')) {
            const createContact = await ContactModel.create({
                userId: req.user,
                ...req.body,
                accounts: [
                    {title: 'total', balance: 0.00},
                    {title: 'paid', balance: 0.00},
                    {title: 'pending', balance: 0.00}
                  ],
                  createdAt: new Date()
             })
        res.status(200).json({status: 'success', data: createContact})
        } else {
            res.status(400).json({status: 'failed', message: `(${req.body.email}) email already exist in your contact`})
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

const DeleteContact = async function (req, res) {
    try {
        const contact = await ContactModel.findByIdAndDelete(req.params.id);
        if(contact) return res.status(200).json({status: 'success', data: contact})
        res.status(404).json({status: 'failed', message: 'Not Found'})
    } catch (error) {
        res.status(500).json({status: 'error', message: 'server error occured'})        
    }
    
}

const ViewContact = async function (req, res) {
    try {
        const contact = await ContactModel.findById(req.params.id);
        if(contact) return res.status(200).json({status: 'success', data: contact});
        res.status(404).json({status: 'failed', message: 'Not Found'})
    } catch (error) {
        res.status(500).json({status: 'error', message: 'server error occured'})                
    }
}
const UpdateContact = async function (req, res) {
    try {
        const updatedContact = await ContactModel.findByIdAndUpdate(req.params.id, {...req.body}, {new: true});
        if(updatedContact) return res.status(200).json({status: 'success', data: updatedContact});
        res.status(404).json({status: 'failed', message: 'Not Found'})
    } catch (error) {
        res.status(500).json({status: 'error', message: 'server error occured'})                        
    }
}
module.exports = {
    AddContact,
    ListContact,
    DeleteContact,
    ViewContact,
    UpdateContact
}