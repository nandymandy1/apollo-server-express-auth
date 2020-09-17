import * as yup from 'yup';

/**
 * USER MODEL Validation Rules
 */

const username = yup
    .string()
    .required('Username is required.')
    .min(5, 'Username should have atleast 5 characters.')
    .max(20, 'Username should have atmost 10 characters.')
    .matches(/^\w+$/, 'Should be alphanumeric.');

const firstName = yup
    .string()
    .required('First Name is required.')
    .min(3, 'First name should have atleast 3 characters.');

const lastName = yup
    .string()
    .required('Last name is required.')
    .min(3, 'Last name should have atleast 3 characters.');

const email = yup
    .string()
    .required('Email is required.')
    .email('This is invalid email.');

const password = yup
    .string()
    .required("Password is required.")
    .min(5, 'Password should have atleast 5 characters.')
    .max(10, 'Password should have atmost 10 characters.');

// User Registeration Validation Schema
export const UserRegisterationRules = yup.object().shape({
    username,
    password,
    firstName,
    lastName,
    email
});

// User Authentication Validation Schema
export const UserAuthenticationRules = yup.object().shape({
    username,
    password
});