'use client';

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useAuthStore } from '@/lib/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useId } from 'react';
import Link from 'next/link';
import * as Yup from 'yup';

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
  const setUser = useAuthStore(state => state.setUser);
  const router = useRouter();
  const id = useId();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValues) => register(data),
    onSuccess: user => {
      setUser(user);
      router.push('/profile');
    },
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
      <div>
        <h1>Вхід</h1>
        <p>Вітаємо знову у спільноту мандрівників!</p>
      </div>
      <Formik
        validationSchema={RegisterSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="input-group input-type">
            <label htmlFor={`${id}-email`}>Пошта*</label>
            <Field
              className="input"
              id={`${id}-email`}
              type="email"
              name="email"
              placeholder="hello@podorozhnyky.ua"
            />
            <ErrorMessage className="error-text" component="span" name="email" />
          </div>

          <div className="input-group input-type">
            <label htmlFor={`${id}-password`}>Пароль*</label>
            <Field
              className="input"
              id={`${id}-password`}
              type="password"
              name="password"
              placeholder="********"
            />
            <ErrorMessage className="error-text" component="span" name="password" />
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
