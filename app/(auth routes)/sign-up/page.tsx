'use client';

import css from './SignUpPage.module.css';
import toast from 'react-hot-toast';
import Link from 'next/link';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useAuthStore } from '@/lib/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useId } from 'react';
import { AxiosError } from 'axios';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const initialValues: FormValues = { name: '', email: '', password: '' };

const passwordRules = /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*\d)(?=.*[@$!%*?&]).{8,}$/u;

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(5, 'Ім’я користувача має містити щонайменше 5 символів')
    .max(40, 'Ім’я користувача має містити не більше 40 символів')
    .matches(
      /^[\p{L}\p{N}_ ]+$/u,
      'Можна використовувати лише літери, цифри, підкреслення та пробіл'
    )
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
    mutationFn: register,
    onSuccess: user => {
      setUser(user);
      toast.success('Акаунт створено! Перенаправляємо до профілю...');
      router.push('/profile');
    },
    onError: (err: AxiosError) => {
      const status = err.response?.status ?? 0;

      const errorMessages: Record<number, string> = {
        400: 'Будь ласка, перевірте правильність заповнення форми.',
        409: 'Email вже зареєстрований. Спробуйте увійти або використати інший email.',
        422: 'Пароль має бути не менше 8 символів і містити велику літеру, цифру та спеціальний символ.',
        500: 'Виникла помилка на сервері. Спробуйте пізніше.',
      };

      toast.error(errorMessages[status] ?? 'Не вдалося завершити реєстрацію. Спробуйте ще раз.');
    },
  });

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    mutate(
      // @ts-ignore
      { name: values.name, email: values.email, password: values.password },
      { onSuccess: () => actions.resetForm() }
    );
  };
  return (
    <>
      <div className={css.wrapper}>
        <ul className={`${css.list}`}>
          <li className={`${css.item} ${css.active}`}>
            <Link className={`${css.link} "text-md"`} href="/sign-up">
              Реєстрація
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
              <label htmlFor={`${id}-name`}>Імʼя та Прізвище*</label>
              <Field
                className="input"
                id={`${id}-name`}
                type="text"
                name="name"
                placeholder="Ваше імʼя та прізвище"
              />
              <ErrorMessage className="error-text" component="span" name="name" />
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
    </>
  );
}
