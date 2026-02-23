'use client';

import css from './SignUpPage.module.css';
import { useRouter } from 'next/navigation';
import { useId } from 'react';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { register } from '@/lib/api/clientApi';
import Link from 'next/link';

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const initialValues: FormValues = { username: '', email: '', password: '' };

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscore allowed')
    .required('Username is required'),

  email: Yup.string()
    .trim()
    .lowercase()
    .email('Enter a valid email address')
    .required('Email is required'),

  password: Yup.string()
    .matches(
      passwordRules,
      'Password must contain 8+ characters, uppercase, lowercase, number, and special character'
    )
    .required('Password is required'),
});

export default function SignUp() {
  // const queryClient = useQueryClient();
  const router = useRouter();
  const id = useId();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValues) => register(data),
  });

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    mutate(
      { username: values.username, email: values.email, password: values.password },
      { onSuccess: () => actions.resetForm() }
    );
  };
  return (
    <main className={css.center}>
      <ul>
        <li>
          <Link href="/sign-in">Реєстраця</Link>
        </li>
        <li>
          <Link href="/sign-in">Вхід</Link>
        </li>
      </ul>
      <h1>Реєстрація</h1>
      <p>Раді вас бачити у спільноті мандрівників!</p>
      <Formik
        validationSchema={RegisterSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${id}-username`}>Імʼя та Прізвище*</label>
            <Field
              className="input"
              id={`${id}-username`}
              type="text"
              name="username"
              placeholder="Ваше імʼя та прізвище"
            />
            <ErrorMessage component="span" name="username" />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${id}-email`}>Пошта*</label>
            <Field
              className="input"
              id={`${id}-email`}
              type="email"
              name="email"
              placeholder="hello@podorozhnyky.ua"
            />
            <ErrorMessage component="span" name="email" />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${id}-password`}>Пароль*</label>
            <Field
              className="input"
              id={`${id}-password`}
              type="password"
              name="password"
              placeholder="********"
            />
            <ErrorMessage component="span" name="password" />
          </div>

          <div>
            <button className="button-primary" type="submit">
              {isPending ? 'Реєструємо...' : 'Зареєструватись'}
            </button>
          </div>
        </Form>
      </Formik>
    </main>
  );
}
