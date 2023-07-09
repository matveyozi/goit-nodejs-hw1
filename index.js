const { Command } = require('commander');
const { listContacts,
	getContactById,
	removeContact,
	addContact } = require('./contacts');

const program = new Command();
program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case 'list':
			// ...
			const list = await listContacts();
			return list.length > 0 ? console.table(list) : console.log("This list have'd contact".red);
			break;

		case 'get':
			// ... id
			const contact = await getContactById(id);
			return !!contact ? console.log(contact) : console.log("There is no contact with this ID in the contact list".red);
			break;

		case 'add':
			// ... name email phone
			const newContact = await addContact(name, email, phone);
			return console.log(newContact);
			break;

		case 'remove':
			// ... id
			const removeContactWithID = await removeContact(id);
			return removeContactWithID ? console.log(removeContactWithID) : console.log("There is no contact with this ID in the contact list".red)
			break;

		default:
			console.warn('\x1B[31m Unknown action type!');
	}
}

invokeAction(argv);