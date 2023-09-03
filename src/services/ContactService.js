import axios from 'axios';

export class ContactService{

    static getAllContacts(){
        let dataURL = `https://userdata-yuj0.onrender.com/contacts`;
        return axios.get(dataURL);
    }

    static getSingleContact(contactId){
        let singleDataURL = `https://userdata-yuj0.onrender.com/contacts/${contactId}`;
        return axios.get(singleDataURL);
    }

    static createContact(contact){
        let dataURL = `https://userdata-yuj0.onrender.com/contacts`;
        return axios.post(dataURL, contact);
    }

    static updateContact(contact, contactId){
        let singleDataURL = `https://userdata-yuj0.onrender.com/contacts/${contactId}`;
        return axios.put(singleDataURL, contact);
    }

    static deleteContact(contactId){
        let contactURL = `https://userdata-yuj0.onrender.com/contacts/${contactId}`;
        return axios.delete(contactURL);
    }
}