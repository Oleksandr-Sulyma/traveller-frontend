'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import Loader from '@/components/Loader/Loader';
import type { StoryPost } from '@/types/story';
import { createStory } from '@/lib/api/clientApi';
import { useStoryDraftStore } from '@/lib/store/storyStore';
import ModalLayout from '@/components/ModalLayout/ModalLayout';
import css from './StoryForm.module.css';
import { ImageUpload, type ImageUploadValue } from './ImageUpload';

import { useCategories } from '@/lib/hooks/useCategories';



interface StoryFormValues {
  title: string;
  article: string;
  category: string; 
  img: string;
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



export default function StoryForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const { draft, setDraft, clearDraft } = useStoryDraftStore();
  const [coverImage, setCoverImage] = React.useState<ImageUploadValue | null>(null);
  const { categories } = useCategories();

  const initialValues: StoryFormValues = {
    title: draft.title,
    article: draft.article, 
    category: draft.category as unknown as string,
    img: '',
  };

  const handleCancel = () => {
    clearDraft();
  };


  const { mutate: createStoryMutation, isPending } = useMutation({
    mutationFn: createStory,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      router.push(`/stories/${data.id}`);
      clearDraft();
    },
    onError() {
      console.error('Помилка при створенні історії');
      setIsOpen(true);
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
      setDraft({ ...draft, img: undefined as any });
      return;
    }

    setCoverImage(value);
    const imgPreview = value?.preview ?? '';
    setFieldValue('img', imgPreview);
    
    setDraft({
      ...draft,
      img: (value?.file as any)!,
    });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        if (!coverImage) {
          toast.error('Додайте обкладинку історії');
          return;
        }

        setDraft({
          ...draft,
          title: values.title,
          article: values.article,
          category: values.category as any,
          img: coverImage.file as any,
        });


        const payload: StoryPost = {
          title: values.title,
          article: values.article,
          category: values.category, 
          img: coverImage.file,
        };

        console.log('Submitting story with payload:', payload);
        
        createStoryMutation(payload);
      }}
    >
      {({
        values,
        handleChange,
        setFieldValue,
        errors,
        touched,
        isValid,
        isSubmitting,
      }) => (
        <>
          {isPending && <Loader className={css.loader} size={100} color="#ffffff"  />}
           {isOpen && (
            <ModalLayout
              showButtons={false}
              title="Помилка під час збереження"
              onConfirm={() => setIsOpen(false)}
              onCancel={handleCancel}
              onClose={handleClose}
            />
          )}
          <h1>Створити нову історію</h1>
          <Form className={css.form}>
            <div className={css.coverRow}>
              <div className={css.coverBlock}>
                <label className={css.label}>Обкладинка статті</label>
                <ImageUpload
                  value={values.img}
                  onChange={value => handleImageChange(value, setFieldValue)}
                />
                {'img' in errors && (
                  <div className={css.error}>{(errors as any).img}</div>
                )}
              </div>

              <div className={css.actions}>
                <button
                  type="submit"
                  className="btn btn--default btn-primary"
                  disabled={
                    isPending ||
                    isSubmitting ||
                    !isValid ||
                    !coverImage
                  }
                >
                  {isPending ? 'Зберігаємо...' : 'Зберегти'}
                </button>
                <button
                  type="button"
                  className="btn btn--default btn-secondary"
                  onClick={handleCancel}
                >
                  Відмінити
                </button>
              </div>
            </div>

            <div className={`input-group ${css.formGroup}`}>
              <label htmlFor="title" className={css.label}>
                Заголовок
              </label>
              <Field
                id="title"
                type="text"
                name="title"
                className="input"
                placeholder="Введіть заголовок історії"
                maxLength={80}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  handleChange(e);
                  setDraft({ ...draft, title: e.target.value });
                }}
              />
              {touched.title && errors.title && (
                <div className={css.error}>{errors.title}</div>
              )}
            </div>

            <div className={`input-group ${css.formGroup}`}>
              <label htmlFor="category" className={css.label}>
                Категорія
              </label>
              <select
                id="category"
                name="category"
                className="input"
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
                {categories.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
              {touched.category && errors.category && (
                <div className={css.error}>{errors.category}</div>
              )}
            </div>

            <div className={`input-group ${css.formGroup}`}>
              <label htmlFor="article" className={css.label}>
                Опис історії
              </label>
              <Field
                as="textarea"
                id="article"
                name="article"
                rows={10}
                className="textarea"
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
          </Form>
        </>
      )}
    </Formik>
  );
}