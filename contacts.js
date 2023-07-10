const nanoid = require('nanoid');
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join('db', 'contacts.json');


// TODO: задокументувати кожну функцію
/**
 * 
 * @returns {Promise[data]} масив контактів
 */
async function listContacts() {
	// ...твій код. Повертає масив контактів.
	try {
		const jsonResult = await fs.readFile(contactsPath);
		const json = JSON.parse(jsonResult);

		return !json ? [] : json;
	}
	catch (error) {
		console.log(error.message);
	}
}

/**
 * 
 * @param {id} contactId 
 * @returns {contact} повертає об'єкт з цим ID
 */

async function getContactById(contactId) {
	// ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
	try {
		const db = await listContacts();
		const contact = db.find(item => item.id === contactId);
		if (!contact) return console.log(null);

		return contact;
	} catch (error) {
		console.log(error.message);

	}
}

/**
 * 
 * @param {id} contactId 
 * @returns {removedContact} повертає об'єкт з ID, який видаляємо
 * Видаляє об'єкт зі списку
 */
async function removeContact(contactId) {
	// ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
	try {
		const db = await listContacts();
		const removedContact = db.find(item => item.id === contactId);
		if (!removedContact) {
			console.log(null);
			return null;
		};

		const updateContactList = db.filter(item => item.id !== contactId);
		await fs.writeFile(contactsPath, JSON.stringify(updateContactList));
		return removedContact;

	} catch (error) {
		console.log(error.message)
	}
}


/**
 * 
 * @param {name} name 
 * @param {email} email 
 * @param {phone} phone 
 * @returns {newContact} Новий контакт
 * Створює новий контакт в списку
 */
async function addContact(name, email, phone) {
	// ...твій код. Повертає об'єкт доданого контакту. 
	try {
		const db = await listContacts();
		const newContact = {
			id: nanoid(),
			name, email, phone
		}
		if (!name || !email || !phone) return console.log('Need all the necessary information: name, email and phone');
		db.push(newContact);
		fs.writeFile(contactsPath, JSON.stringify(db));
		return newContact;
	} catch (error) {
		console.log(error.message);
	}

}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact
}