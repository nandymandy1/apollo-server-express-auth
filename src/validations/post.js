import * as yup from 'yup';

const title = yup
    .string()
    .required('Title of Blog is required.')
    .min(5, 'Title of the Blog should have atleast 5 characters.')
    .max(50, 'Title of the Blog should have atmost 50 characters.');

const content = yup
    .string()
    .required('Content of the Blog is required.')
    .min(20, 'Content of the Blog should have atleast 5 characters.')
    .max(3000, 'Content of the Blog should have atmost 3000 characters.');

export const NewPostRules = yup
    .object()
    .shape({
        title,
        content,
    });