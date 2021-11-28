import { useSelector, useDispatch } from "react-redux";
import { contactsOperations, contactsSelectors } from "../../redux/contacts";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { motion, AnimatePresence } from "framer-motion";
import { variants } from "../../utils/motionVar";
import s from "./ContactList.module.css";

function ContactList() {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(contactsSelectors.getVisibleContacts);
  const contacts = useSelector(contactsSelectors.getContacts);

  return (
    <>
      {contacts.length > 0 && (
        <motion.ul className={s.list}>
          <AnimatePresence>
            {visibleContacts.map(({ id, name, number }) => (
              <motion.li
                className={s.item}
                key={id}
                initisl="initial"
                animate="animate"
                exit="exit"
                transititon="transititon"
                variants={variants}
              >
                <p className={s.info}>
                  <b>{name}</b>
                  <em>{number}</em>
                </p>
                <IconButton
                  aria-label="delete"
                  color="secondary"
                  typr="button"
                  onClick={() => dispatch(contactsOperations.deleteContact(id))}
                >
                  <DeleteIcon />
                </IconButton>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
      {!contacts.length && (
        <AnimatePresence>
          <motion.p
            initial="initial"
            animate="animate"
            exit="exit"
            transition="transition"
            variants={variants}
          >
            Your Phonebook is empty. Put sth.
          </motion.p>
        </AnimatePresence>
      )}
    </>
  );
}

export default ContactList;
