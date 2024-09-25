import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = (contactId) =>
  ContactsCollection.findById(contactId);

export const createContact = (payload) => ContactsCollection.create(payload);

export const updateContact = (contactId, payload, options = {}) => {
  const contact = ContactsCollection.findByIdAndUpdate(contactId, payload, {
    new: true,
    runValidators: true,
    ...options,
  });
  if (!contact) return null;
  return contact;
};

export const deleteContactById = (contactId) =>
  ContactsCollection.findByIdAndDelete(contactId);
