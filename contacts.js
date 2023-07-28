const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');


const contactsPath = path.join(__dirname, 'db/contacts.json');

const writeContacts  = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
} 


const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const getContactById = async (id) => {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === id);
    return result || null;
}

const addContact = async (data) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    }
    contacts.push(newContact);
    await writeContacts(contacts)
    return newContact;

}


const removeContact = async (id)=> { 
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(contact => contact.id === id);
    if (contactIndex === -1) return null;
    const [result] = contacts.splice(contactIndex, 1); 
    await writeContacts(contacts)
    return [result];
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
}