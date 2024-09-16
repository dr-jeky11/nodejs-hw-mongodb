import { writeContacts } from '../utils/writeContacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';

const generateContacts = async (number) => {
  const contacts = await readContacts();
  const generatedContacts = Array(number).fill(0).map(createFakeContact);

  const newContactList = [...contacts, ...generatedContacts];

  await writeContacts(newContactList);
};

generateContacts(3);
