'use client';

import React, { useState } from 'react';
import StoryTextArea from '@/styles/components/StoryTextArea/StoryTextArea';
import CustomSelect from '@/styles/components/CustomSelect/CustomSelect';
import Tabs from '@/styles/components/Tabs/Tabs';
import GridContainer from '@/styles/components/GridContainer/GridContainer'; 
import stylesCard from '@/components/TravellerCard/TravellerCard.module.css';

export default function UiKitPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const DummyCard = ({ title }: { title: string }) => (
    <div className={stylesCard.traveler_card} style={{ margin: 0 }}>
       <div style={{ 
         width: '112px', 
         height: '112px', 
         borderRadius: '50%', 
         background: 'var(--color-royal-blue-light)',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         color: 'white',
         fontSize: '40px'
       }}>👤</div>
       <h4 style={{ margin: '10px 0' }}>{title}</h4>
       <p style={{ fontSize: '14px', opacity: 0.7 }}>Приклад картки в сітці UI Kit</p>
       <button className="btn btn-secondary btn--default" style={{ width: '100%', marginTop: 'auto' }}>
         Профіль
       </button>
    </div>
  );

  const PlusIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.0001 18.1675L7.23159 20.2075C6.66392 20.4521 6.12517 20.4062 5.61534 20.0697C5.1055 19.7332 4.85059 19.2571 4.85059 18.6412V4.42873C4.85059 3.96707 5.0195 3.56681 5.35734 3.22798C5.695 2.88898 6.09384 2.71948 6.55384 2.71948H17.4463C17.908 2.71948 18.3083 2.88898 18.6471 3.22798C18.9861 3.56681 19.1556 3.96707 19.1556 4.42873V18.6412C19.1556 19.2571 18.8997 19.7332 18.3878 20.0697C17.876 20.4062 17.3363 20.4521 16.7686 20.2075L12.0001 18.1675ZM12.0001 16.3452L17.4463 18.6412V4.42873H6.55384V18.6412L12.0001 16.3452ZM12.0001 4.42873H6.55384H17.4463H12.0001Z"
        fill="currentColor"
      />
    </svg>
  );

  const ComponentSection = ({ title, usage, code, children }: any) => (
    <div style={{ marginBottom: '60px', borderBottom: '1px solid var(--color-scheme-1-border)', paddingBottom: '30px' }}>
      <h3 style={{ fontSize: '20px', color: 'var(--color-royal-blue)', marginBottom: '10px' }}>{title}</h3>
      <div style={{ backgroundColor: 'var(--color-scheme-2-background)', padding: '12px', borderRadius: '6px', marginBottom: '15px', fontSize: '14px', borderLeft: '4px solid var(--color-royal-blue)', color: 'var(--color-scheme-1-text)' }}>
        <strong>💡 Порада:</strong> {usage}
      </div>
      <div style={{ padding: '20px', border: '1px dashed var(--color-scheme-1-border)', borderRadius: '8px', backgroundColor: 'var(--color-scheme-1-background)', overflow: 'hidden' }}>
        {children}
      </div>
      <pre style={{ background: '#1e1e1e', color: '#569cd6', padding: '15px', borderRadius: '8px', marginTop: '15px', fontSize: '13px', overflowX: 'auto' }}>
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1440px', margin: '0 auto', color: 'var(--color-scheme-1-text)' }}>
      <header style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>UI Kit: Довідник розробника</h1>
        <button className="btn btn-primary btn--default" onClick={toggleTheme}>
          Переключити на {theme === 'light' ? 'Dark' : 'Light'} тему
        </button>
      </header>

      {/* --- ГЛОБАЛЬНА ТАБЛИЦЯ ВИСОТ --- */}
      <section style={{ marginBottom: '80px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px', color: 'var(--color-royal-blue)' }}>Система висот елементів</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--color-royal-blue)' }}>
              <th style={{ padding: '10px' }}>Елемент</th>
              <th style={{ padding: '10px' }}>Клас / Варіант</th>
              <th style={{ padding: '10px' }}>Висота (px)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Кнопка (Стандарт)', '.btn-primary / .btn-secondary', '48px'],
              ['Кнопка (Хедер)', '.btn--header / .btn-icon--header', '35px'],
              ['Текстове поле (Input)', '.input-group.input-type', '69px (з помилкою)'],
              ['Поле тексту (Мале)', 'StoryTextArea h-120', '146px (з лічильником)'],
              ['Поле тексту (Велике)', 'StoryTextArea h-180', '206px (з лічильником)']
            ].map(([name, cls, h]) => (
              <tr key={name} style={{ borderBottom: '1px solid var(--color-scheme-1-border)' }}>
                <td style={{ padding: '10px' }}>{name}</td>
                <td>{cls}</td>
                <td>{h}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* --- 1. КНОПКИ --- */}
      <section>
        <h2 style={{ fontSize: '28px', borderBottom: '2px solid', marginBottom: '30px' }}>1. Кнопки та керування шириною</h2>
        <ComponentSection
          title="1.1 Зміна стану та ширини"
          usage="Поміняйте клас primary/secondary для кольору. Для ширини використовуйте inline-style або зовнішній контейнер."
          code={`<button className="btn btn-primary" style={{ width: '180px' }}>Фіксована</button>`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button className="btn btn-primary btn--default" style={{ width: '180px' }}>180px Primary</button>
            <button className="btn btn-secondary btn--default" style={{ width: '100%' }}>Full Width Secondary</button>
          </div>
        </ComponentSection>

        <ComponentSection
          title="1.2 Іконки"
          usage="Клас .btn-icon створює квадратну кнопку 48x48. Колір іконки успадковується."
          code={`<button className="btn btn-primary btn-icon">{PlusIcon}</button>`}
        >
          <div style={{ display: 'flex', gap: '15px' }}>
            <button className="btn btn-primary btn-icon">{PlusIcon}</button>
            <button className="btn btn-secondary btn-icon">{PlusIcon}</button>
          </div>
        </ComponentSection>
      </section>

      {/* --- 2. ПОСИЛАННЯ --- */}
      <section style={{ marginTop: '80px' }}>
        <h2 style={{ fontSize: '28px', borderBottom: '2px solid', marginBottom: '30px' }}>2. Посилання (links.css)</h2>
        <ComponentSection
          title="2.1 Текстові та іконочні лінки"
          usage="Клас .link-text для звичайних лінків, .link-icon для кнопок-іконок без фону."
          code={`<a href="#" className="link-base link-text">Читати статтю</a>`}
        >
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <a href="#" className="link-base link-text" onClick={e => e.preventDefault()}>Текстова лінка</a>
            <a href="#" className="link-base link-icon" onClick={e => e.preventDefault()}>{PlusIcon}</a>
          </div>
        </ComponentSection>
      </section>

      {/* --- 3. ФОРМИ --- */}
      <section style={{ marginTop: '80px' }}>
        <h2 style={{ fontSize: '28px', borderBottom: '2px solid', marginBottom: '30px' }}>3. Форми та React-компоненти</h2>
        <ComponentSection
          title="3.1 Базовий Текстовий Інпут"
          usage="Використовуйте структуру .input-group разом з класом .input. Поле помилки має бути присутнім."
          code={`<div className="input-group input-type">\n  <input className="input" placeholder="Ім'я" />\n  <span className="error-text"></span>\n</div>`}
        >
          <div style={{ width: '335px' }} className="input-group input-type">
            <input className="input" placeholder="Введіть ваше ім'я" />
            <span className="error-text"></span>
          </div>
        </ComponentSection>

        <ComponentSection
          title="3.2 CustomSelect та StoryTextArea"
          usage="Компоненти з кастомною логікою. Ширина регулюється батьківським блоком."
          code={`<CustomSelect label="Регіон" />\n<StoryTextArea variant="h-120" />`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <div style={{ width: '335px' }}><CustomSelect label="Оберіть регіон" /></div>
             <StoryTextArea variant="h-120" maxChars={500} />
          </div>
        </ComponentSection>

        <ComponentSection title="3.3 Tabs" usage="Завжди 100% ширини контейнера." code={`<Tabs />`}>
          <Tabs />
        </ComponentSection>
      </section>

      {/* --- 4. ТИПОГРАФІКА --- */}
      <section style={{ marginTop: '80px' }}>
        <h2 style={{ fontSize: '28px', borderBottom: '2px solid', marginBottom: '30px' }}>4. Типографіка (Raleway & Nunito)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
           <div style={{ padding: '20px', border: '1px solid var(--color-scheme-1-border)', borderRadius: '12px' }}>
              <h1 style={{ marginBottom: '10px' }}>H1 Title</h1>
              <p>Raleway Bold - 32px (Mob) / 56px (PC)</p>
           </div>
           <div style={{ padding: '20px', border: '1px solid var(--color-scheme-1-border)', borderRadius: '12px' }}>
              <h3 style={{ marginBottom: '10px' }}>H3 Card Header</h3>
              <p>Raleway Bold - 20px (Mob) / 32px (PC)</p>
           </div>
        </div>
      </section>

      {/* --- 5. GRID SYSTEM (СЕКЦІЯ З СІТКАМИ) --- */}
      <section style={{ marginTop: '80px' }}>
        <h2 style={{ fontSize: '28px', borderBottom: '2px solid', marginBottom: '30px' }}>5. Grid System (Сітки та контейнери)</h2>
        
        <ComponentSection
          title="5.1 Сітка для мандрівників (4 колонки)"
          usage="Variant='travellers'. Адаптивність: 1 (моб) -> 2 (планшет) -> 4 (ПК). Картки центруються."
          code={`<GridContainer variant="travellers">\n  {items.map(i => <TravelerCard key={i.id} {...i} />)}\n</GridContainer>`}
        >
          <div style={{ background: 'var(--color-royal-blue-lightest)', padding: '20px', borderRadius: '12px' }}>
            <GridContainer variant="travellers">
              <DummyCard title="Олена" />
              <DummyCard title="Андрій" />
              <DummyCard title="Марія" />
              <DummyCard title="Дмитро" />
            </GridContainer>
          </div>
        </ComponentSection>

        <ComponentSection
          title="5.2 Сітка для історій (3 колонки)"
          usage="Variant='stories'. На десктопі 3 колонки для кращого відображення широкого контенту."
          code={`<GridContainer variant="stories">\n  {items.map(i => <BlogCard key={i.id} {...i} />)}\n</GridContainer>`}
        >
          <div style={{ background: 'var(--color-royal-blue-lightest)', padding: '20px', borderRadius: '12px' }}>
            <GridContainer variant="stories">
              {[1, 2, 3].map(i => (
                <div key={i} style={{ 
                  background: 'var(--color-white)', 
                  height: '180px', 
                  borderRadius: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  border: '1px solid var(--color-royal-blue)',
                  width: '100%'
                }}>
                  Blog Card {i}
                </div>
              ))}
            </GridContainer>
          </div>
        </ComponentSection>
      </section>

      <footer style={{ marginTop: '100px', textAlign: 'center', opacity: 0.5, fontSize: '12px' }}>
        UI Kit v1.0 | Розроблено для Travellers App
      </footer>
    </div>
  );
}