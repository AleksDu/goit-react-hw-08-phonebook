import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { contactsOperations, contactsSelectors } from "../../redux/contacts";
import NumberFormat from "react-number-format";
import Button from "@material-ui/core/Button";
import LoaderComponent from "../LoaderComponent";
import s from "./ContactForm.module.css";

function ContactForm() {
  const contacts = useSelector(contactsSelectors.getContacts);
  const dispatch = useDispatch();
  const isLoading = useSelector(contactsSelectors.getLoading);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };
  const checkDoubleNumber = (number) => {
    return contacts.find((contact) => contact.number === number);
  };

  const checkDoubleName = (name) => {
    return contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
  };
  const checkEmptyQuery = (name, number) => {
    return name.trim() === "" || number.trim() === "";
  };
  // Метод на отправке формы. Формирует из стейта контакт и передает во внешний метод
  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkDoubleName(name)) {
      return toast(`😵 ${name} is already in contacts!🙄 `);
    } else if (checkDoubleNumber(number)) {
      return toast(`😉 ${number} is already in contacts!🙄`);
    } else if (checkEmptyQuery(name, number)) {
      return toast.info("😎 Enter the contact's name and  phone number!");
    } else {
      dispatch(contactsOperations.addContact(name, number));
    }
    reset();
  };
  const reset = () => {
    setName("");
    setNumber("");
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        Name
        <input
          type="text"
          name="name"
          placeholder="Contact name"
          aria-label="input to you name"
          className={s.input}
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        />
      </label>
      <label className={s.label}>
        Number
        <NumberFormat
          format="+1 (###) ###-####"
          mask="_"
          type="tel"
          name="number"
          placeholder="Phone number"
          aria-label="input to you phone number"
          className={s.input}
          value={number}
          onChange={handleChange}
          pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
          title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
        />
      </label>
      {!isLoading && (
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
        >
          Add contact
        </Button>
      )}
      {isLoading && <LoaderComponent />}
    </form>
  );
}

export default ContactForm;
