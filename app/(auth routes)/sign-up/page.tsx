'use client';

import css from './SignUpPage.module.css';
import Link from 'next/link';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useId } from 'react';
import { useAuthStore } from '@/lib/store/authStore';

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
    .min(5, 'Ім’я користувача має містити щонайменше 5 символів')
    .max(30, 'Ім’я користувача має містити не більше 30 символів')
    .matches(/^[a-zA-Z0-9_]+$/, 'Можна використовувати лише літери, цифри та підкреслення')
    .required('Будь ласка, введіть ім’я користувача'),

  email: Yup.string()
    .trim()
    .lowercase()
    .email('Введіть коректну електронну адресу')
    .required('Будь ласка, введіть електронну пошту'),

  password: Yup.string()
    .matches(
      passwordRules,
      'Пароль має містити щонайменше 8 символів, великі та малі літери, цифру і спеціальний символ'
    )
    .required('Будь ласка, введіть пароль'),
});

export default function SignUp() {
  const id = useId();
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValues) => register(data),
    onSuccess: user => {
      setUser(user);
      router.push('/profile');
    },
  });

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    mutate(
      { username: values.username, email: values.email, password: values.password },
      { onSuccess: () => actions.resetForm() }
    );
  };
  return (
    <main>
      <div className={css.wrapper}>
        <ul className={`${css.list}`}>
          <li className={`${css.item} ${css.active}`}>
            <Link className={`${css.link} "text-md"`} href="/sign-up">
              Реєстраця
            </Link>
          </li>
          <li className={css.item}>
            <Link className={`${css.link} "text-md"`} href="/sign-in">
              Вхід
            </Link>
          </li>
        </ul>
        <div>
          <h1 className={`${css.center_text} ${css.mb_24}`}>Реєстрація</h1>
          <p className={`${css.center_text} "text-main"`}>
            Раді вас бачити у спільноті мандрівників!
          </p>
        </div>
        <Formik
          validationSchema={RegisterSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <div className="input-group input-type">
              <label htmlFor={`${id}-username`}>Імʼя та Прізвище*</label>
              <Field
                className="input"
                id={`${id}-username`}
                type="text"
                name="username"
                placeholder="Ваше імʼя та прізвище"
              />
              <ErrorMessage className="error-text" component="span" name="username" />
            </div>

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
              <button
                className="btn btn-primary"
                style={{ height: '44px', width: '100% ' }}
                type="submit"
              >
                {isPending ? 'Реєструємо...' : 'Зареєструватись'}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </main>
  );
}
