import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder,
  sortBy,
  filter,
}) => {
  const skip = (page - 1) * perPage;
  const contactQuery = ContactsCollection.find();

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactQuery).countDocuments(),
    contactQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

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

export const deleteContact = (contactId) =>
  ContactsCollection.findByIdAndDelete(contactId);
