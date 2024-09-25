import styles from './SearchBar.module.css';
import { Field, Form, Formik } from "formik";
import { IoSearch } from "react-icons/io5";


export default function SearchBar ({ }) {

    return (
        <header className={styles.searchHeader}>
            <Formik
                onSubmit={handleSubmit}
                initialValues={{ search: '' }}
            >
                <Form>
                    <button type="submit"><IoSearch/><span>Search</span></button>
                    <Field
                    name="search"
                    type="search"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    />      
                </Form>
            </Formik>
        </header>
    );
};