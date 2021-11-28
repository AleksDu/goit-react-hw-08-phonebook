import axios from "axios";
import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
} from "./contact-actions";
import { toast } from "react-toastify";

// axios.get("https://6197697eaf46280017e7e5de.mockapi.io/api/v1/contacts");

export const fetchContacts = () => (dispatch) => {
  dispatch(fetchContactsRequest());
  axios
    .get("/contacts")
    .then(({ data }) => dispatch(fetchContactsSuccess(data)))
    .catch((error) => {
      dispatch(fetchContactsError(error));
      if (error.response.status === 404) {
        toast.info("User's phonebook not found");
      } else if (error.response.status === 500) {
        toast.error("Server bugged, check later, please");
      } else {
        toast.error("Something wrong, reload this page, please.");
      }
    });
};

export const addContact = (name, number) => (dispatch) => {
  const contact = {
    name,
    number,
  };
  dispatch(addContactRequest());

  axios
    .post("/contacts", contact)
    .then(({ data }) => dispatch(addContactSuccess(data)))
    .catch((error) => {
      dispatch(addContactError(error));
      if (error.response.status === 400) {
        toast.error("Creation contact wrong!");
      } else {
        toast.error("Something wrong, reload this page, please.");
      }
    });
};

export const deleteContact = (contactId) => (dispatch) => {
  dispatch(deleteContactRequest());

  axios
    .delete(`/contacts/${contactId}`)
    .then(() => dispatch(deleteContactSuccess(contactId)))
    .catch((error) => {
      dispatch(deleteContactError(error));
      if (error.response.status === 404) {
        toast.info("User's phonebook not found");
      } else if (error.response.status === 500) {
        toast.error("Server bugged, check later, please");
      } else {
        toast.error("Something wrong, reload this page, please.");
      }
    });
};
