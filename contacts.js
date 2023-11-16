import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export const getAllContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

export const getContactById = async (id) => {
  const contacts = await getAllContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact || null;
};

export const addContact = async (data) => {
  const contacts = await getAllContacts();
  const newContact = {
    ...data,
    id: nanoid(),
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

export const removeContact = async (id) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
};

export const updateById = async (id, data) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...data };
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
};

// module.exports = {
//   getAllContacts,
//   getContactById,
//   addContact,
//   removeContact,
//   updateById,
// };
