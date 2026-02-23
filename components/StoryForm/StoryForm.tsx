'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import type { StoryPost } from '@/types/story';
import { createStory } from '@/lib/api/clientApi';
import { useStoryDraftStore } from '@/lib/store/storyStore';

import css from './StoryForm.module.css';
import { ImageUpload, type ImageUploadValue } from './ImageUpload';
import { Category, CATEGORY_MAP } from '@/types/category';


interface StoryFormValues {
  title: string;
  article: string;
  category: string; // categoryId
  img: string; // preview url for draft only
}

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

const validationSchema = Yup.object({
  title: Yup.string()
    .max(80, 'Максимум 80 символів')
    .required("Заголовок є обов'язковим"),
  article: Yup.string()
    .max(2500, 'Максимум 2500 символів')
    .required('Опис історії є обов\'язковим'),
  category: Yup.string().required('Оберіть категорію'),
  img: Yup.string().nullable(),
});

const CATEGORIES = Object.keys(Category)

export default function StoryForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useStoryDraftStore();
  const [coverImage, setCoverImage] = React.useState<ImageUploadValue | null>(null);

  const initialValues: StoryFormValues = {
    title: draft.title,
    article: draft.article, 
    category: draft.category as unknown as string,
    img: draft.img,
  };

  const handleCancel = () => {
    router.back();
  };


  const { mutate: createStoryMutation, isPending } = useMutation({
    mutationFn: createStory,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      clearDraft();
      handleCancel();
    },
    onError() {
      toast.error('Помилка при створенні історії');
    },
  });

  const handleImageChange = (
    value: ImageUploadValue | null,
    setFieldValue: (field: string, value: unknown) => void,
  ) => {
    if (value && value.file.size > MAX_IMAGE_SIZE) {
      toast.error('Максимальний розмір зображення — 2MB');
      setCoverImage(null);
      setFieldValue('img', '');
      setDraft({ ...draft, img: '' });
      return;
    }

    setCoverImage(value);
    const img = value?.preview ?? '';
    setFieldValue('img', img);
    setDraft({ ...draft, img });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      validate={values => {
        const errors: Partial<Record<keyof StoryFormValues | 'storyImage', string>> = {};
        // storyImage required по ТЗ
        if (!coverImage) {
          errors.storyImage = 'Обкладинка історії є обов\'язковою';
        }
        return errors;
      }}
      onSubmit={values => {
        if (!coverImage) {
          toast.error('Додайте обкладинку історії');
          return;
        }

        // синхронизируем драфт
        setDraft({
          ...draft,
          title: values.title,
          article: values.article,
          category: values.category as any,
          img: values.img,
        });


        const payload: any = {
          title: values.title,
          article: values.article,
          category: values.category, // categoryId
          storyImage: {
            buffer: Array.from(coverImage.buffer),
          },
        };

        console.log('Submitting story with payload:', payload);
        
        createStoryMutation(payload as StoryPost as any);
      }}
    >
      {({ values, handleChange, setFieldValue, errors, touched }) => (
        <Form className={css.form}>
          <div className={css.coverBlock}>
            <label className={css.label}>Обкладинка статті</label>
            <ImageUpload
              value={values.img}
              onChange={value => handleImageChange(value, setFieldValue)}
            />
            {'storyImage' in errors && (
              <div className={css.error}>{(errors as any).storyImage}</div>
            )}
          </div>

          <div className={css.formGroup}>
            <label htmlFor="title" className={css.label}>
              Заголовок
            </label>
            <Field
              id="title"
              type="text"
              name="title"
              className={css.input}
              placeholder="Введіть заголовок історії"
              maxLength={80}
            />
            {touched.title && errors.title && (
              <div className={css.error}>{errors.title}</div>
            )}
          </div>

          <div className={css.formGroup}>
            <label htmlFor="category" className={css.label}>
              Категорія
            </label>
            <select
              id="category"
              name="category"
              className={css.select}
              value={values.category}
              onChange={e => {
                handleChange(e);
                setDraft({ ...draft, category: e.target.value as any });
              }}
              required
            >
              <option value="" disabled>
                Категорія
              </option>
              {CATEGORIES.map(categoryId => (
                <option key={categoryId} value={categoryId}>
                  {CATEGORY_MAP[categoryId]}
                </option>
              ))}
            </select>
            {touched.category && errors.category && (
              <div className={css.error}>{errors.category}</div>
            )}
          </div>

          <div className={css.formGroup}>
            <label htmlFor="article" className={css.label}>
              Опис історії
            </label>
            <Field
              as="textarea"
              id="article"
              name="article"
              rows={10}
              className={css.textarea}
              placeholder="Ваша історія тут"
              maxLength={2500}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                handleChange(e);
                setDraft({ ...draft, article: e.target.value });
              }}
            />
            {touched.article && errors.article && (
              <div className={css.error}>{errors.article}</div>
            )}
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Відмінити
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isPending}

            >
              {isPending ? 'Зберігаємо...' : 'Зберегти'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}