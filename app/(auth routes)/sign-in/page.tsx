'use client';

import { useRouter } from 'next/navigation';
import { useId } from 'react';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { register } from '@/lib/api/clientApi';
import Link from 'next/link';

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = { email: '', password: '' };

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .lowercase()
    .email('Введіть коректну електронну адресу')
    .required("Електронна пошта є обов'язковою"),

  password: Yup.string().required("Пароль є обов'язковим"),
});

export default function SignIn() {
  const router = useRouter();
  const id = useId();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValues) => register(data),
  });

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    mutate(
      { email: values.email, password: values.password },
      { onSuccess: () => actions.resetForm() }
    );
  };
  return (
    <main>
      <ul>
        <li>
          <Link href="/sign-in">Реєстраця</Link>
        </li>
        <li>
          <Link href="/sign-in">Вхід</Link>
        </li>
      </ul>
      <h1>Вхід</h1>
      <p>Вітаємо знову у спільноту мандрівників!</p>
      <Formik
        validationSchema={RegisterSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
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

          <div>
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
              {isPending ? 'Здійснюється вхід...' : 'Увійти'}
            </button>
          </div>
        </Form>
      </Formik>
    </main>
  );
}
