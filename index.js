const argv = require("yargs").argv;

// TODO: рефакторити
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await getAllBooks();
      return console.log(allContacts);

    case "get":
      // ... id
      const contactsId = await getContactById(id);
      return console.log(contactsId);

    case "add":
      // ... name email phone
      break;

    case "remove":
      // ... id
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
