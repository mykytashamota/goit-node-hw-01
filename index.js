import {
  addContact,
  getAllContacts,
  getContactById,
  removeContact,
  updateById,
} from "./contacts.js";

import { program } from "commander";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

console.log(argv);

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await getAllContacts();
      return console.table(allContacts);

    case "get":
      const contactById = await getContactById(id);
      return console.log(contactById);

    case "add":
      const newContact = await addContact(name, email, phone);
      return console.log(newContact);

    case "remove":
      const deleteContact = await removeContact(id, { name, email, phone });
      return console.log(deleteContact);

    case "update":
      const updateContact = await updateById(id);
      return console.log(updateContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
// // const contacts = require("./contacts");
