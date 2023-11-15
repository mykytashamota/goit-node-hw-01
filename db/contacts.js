import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join(__dirname, "./contacts.json");

const getAllContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  console.log(contacts);
  return JSON.parse(contacts);
};

const getContactById = async (id) => {
  const contacts = await getAllContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact || null;
};

const addContact = async (data) => {
  const contacts = await getAllContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const removeContact = async (id) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    return null;
  }
  const [removedContact] = contacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
};
