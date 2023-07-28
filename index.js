const contacts = require('./contacts');
const {program} = require('commander');

program
.option('-a, --action <type>', 'choose action')
.option('-i, --id <type>', 'user id')
.option('-n, --name <type>', 'user name')
.option('-e, --email <type>', 'user email')
.option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();


const invokeActions = async ({action, id, name, email, phone}) => {
    switch (action) {
        case 'list':
            const allContacts = await contacts.listContacts();
            console.table(allContacts);
            break;
        case 'getById': 
            const  contact = await contacts.getContactById(id);
            console.log(contact);
            break;
        case 'addContact':
            const  newContact = await contacts.addContact({name,email,phone})
            console.log(newContact);
            break;
        case 'removeContact': 
            const deleteContact = await contacts.removeContact(id);
            console.log(deleteContact);
            break;
        default:
            console.warn('\x1B[31m Unknown action type!');
            break;
    }
}


invokeActions(options);