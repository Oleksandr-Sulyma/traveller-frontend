"use client";

import React, { useState } from 'react';
import TextArea from '@/components/Forms/StoryTextArea/StoryTextArea'
import CustomSelect, { CATEGORIES_LIST } from '@/components/Forms/CustomSelect/CustomSelect';
import Tabs from '@/components/Forms/Tabs/Tabs'; 
import styles from '@/components/Forms/Tabs/Tabs.module.css';


export default function UiKitPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const PlusIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.0001 18.1675L7.23159 20.2075C6.66392 20.4521 6.12517 20.4062 5.61534 20.0697C5.1055 19.7332 4.85059 19.2571 4.85059 18.6412V4.42873C4.85059 3.96707 5.0195 3.56681 5.35734 3.22798C5.695 2.88898 6.09384 2.71948 6.55384 2.71948H17.4463C17.908 2.71948 18.3083 2.88898 18.6471 3.22798C18.9861 3.56681 19.1556 3.96707 19.1556 4.42873V18.6412C19.1556 19.2571 18.8997 19.7332 18.3878 20.0697C17.876 20.4062 17.3363 20.4521 16.7686 20.2075L12.0001 18.1675ZM12.0001 16.3452L17.4463 18.6412V4.42873H6.55384V18.6412L12.0001 16.3452ZM12.0001 4.42873H6.55384H17.4463H12.0001Z" fill="currentColor" />
    </svg>
  );

  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '375px',
    paddingInline: '20px',
    marginInline: 'auto',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    border: '1px dashed #ccc',
    paddingBlock: '20px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center'
  };

  const ComponentSection = ({ title, description, code, children }: any) => (
    <div style={{ marginBottom: '80px', borderBottom: '2px solid #eee', paddingBottom: '40px' }}>
      <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px' }}>{title}</h3>
      <p style={{ color: theme === 'light' ? '#666' : '#aaa', marginBottom: '20px' }}>{description}</p>
      
      <div className="container" style={containerStyle}>
        {children}
      </div>

      <pre style={{ 
        background: '#2d2d2d', 
        color: '#ccc', 
        padding: '15px', 
        borderRadius: '8px', 
        overflowX: 'auto',
        fontSize: '13px',
        marginTop: '20px'
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <div style={{ 
      backgroundColor: theme === 'light' ? '#ffffff' : '#0f1115', 
      color: theme === 'light' ? '#000' : '#fff',
      minHeight: '100vh', 
      padding: '40px 10px',
      transition: '0.3s'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '28px' }}>UI Kit Control Panel</h1>
          <button 
            onClick={toggleTheme}
            style={{ 
              padding: '10px 20px', 
              cursor: 'pointer',
              borderRadius: '30px',
              border: '2px solid #4169e1',
              background: 'transparent',
              color: '#4169e1',
              fontWeight: 'bold'
            }}
          >
            {theme === 'light' ? 'Увімкнути Dark Mode' : 'Увімкнути Light Mode'}
          </button>
        </header>

        {/* --- SECTION 1: PRIMARY BUTTONS --- */}
        <h2 style={{ color: '#4169e1', marginBottom: '30px' }}>1. Button</h2>
        <h3 style={{ color: '#27b351', marginBottom: '30px' }}>1.1. Primary Variant</h3>

        <ComponentSection 
          title="Primary: Standard"
          description="Основна кнопка, висота 48px. Ширина за контентом (падінги 24px)."
          code={`<button className="btn btn-primary btn--default">Primary Button</button>`}
        >
          <button className="btn btn-primary btn--default">Primary Button</button>
        </ComponentSection>

        <ComponentSection 
          title="Primary: Fixed Width (180px)"
          description="Основна кнопка із заданою шириною 180px."
          code={`<button className="btn btn-primary btn--default" style={{ width: '180px' }}>180px Button</button>`}
        >
          <button className="btn btn-primary btn--default" style={{ width: '180px' }}>180px Button</button>
        </ComponentSection>

        <ComponentSection 
          title="Primary: Header Size"
          description="Зменшена версія для хедера. Висота 35px."
          code={`<button className="btn btn-primary btn--header">Header Primary</button>`}
        >
          <button className="btn btn-primary btn--header">Header Primary</button>
        </ComponentSection>

        {/* --- SECTION 2: SECONDARY BUTTONS --- */}
        <h3 style={{ color: '#777', marginBottom: '30px', marginTop: '100px' }}>1.2. Secondary Variant</h3>

        <ComponentSection 
          title="Secondary: Standard"
          description="Другорядна кнопка, висота 48px."
          code={`<button className="btn btn-secondary btn--default">Secondary Button</button>`}
        >
          <button className="btn btn-secondary btn--default">Secondary Button</button>
        </ComponentSection>

        <ComponentSection 
          title="Secondary: Fixed Width (180px)"
          description="Другорядна кнопка із заданою шириною 180px."
          code={`<button className="btn btn-secondary btn--default" style={{ width: '180px' }}>180px Button</button>`}
        >
          <button className="btn btn-secondary btn--default" style={{ width: '180px' }}>180px Button</button>
        </ComponentSection>

        {/* --- SECTION 3: PRIMARY ICON BUTTONS --- */}
        <h3 style={{ color: '#4169e1', marginBottom: '30px', marginTop: '100px' }}>1.3. Primary Icon Buttons</h3>

        <ComponentSection 
          title="Primary Icon: Standard (48px)"
          description="Квадратна кнопка 48x48 з іконкою."
          code={`<button className="btn btn-primary btn-icon">{PlusIcon}</button>`}
        >
          <button className="btn btn-primary btn-icon">{PlusIcon}</button>
        </ComponentSection>

        <ComponentSection 
          title="Primary Icon: Fixed Width (180px)"
          description="Квадратна кнопка розтягнута до 180px (іконка по центру)."
          code={`<button className="btn btn-primary btn-icon" style={{ width: '180px' }}>{PlusIcon}</button>`}
        >
          <button className="btn btn-primary btn-icon" style={{ width: '180px' }}>{PlusIcon}</button>
        </ComponentSection>

        <ComponentSection 
          title="Primary Icon: Header (35px)"
          description="Квадратна кнопка 35x35 для хедера."
          code={`<button className="btn btn-primary btn-icon--header">{PlusIcon}</button>`}
        >
          <button className="btn btn-primary btn-icon--header">{PlusIcon}</button>
        </ComponentSection>

        {/* --- SECTION 4: SECONDARY ICON BUTTONS --- */}
        <h3 style={{ color: '#777', marginBottom: '30px', marginTop: '100px' }}> 1.4. Secondary Icon Buttons</h3>

        <ComponentSection 
          title="Secondary Icon: Standard (48px)"
          description="Квадратна кнопка Secondary 48x48."
          code={`<button className="btn btn-secondary btn-icon">{PlusIcon}</button>`}
        >
          <button className="btn btn-secondary btn-icon">{PlusIcon}</button>
        </ComponentSection>

        <ComponentSection 
          title="Secondary Icon: Fixed Width (180px)"
          description="Квадратна кнопка Secondary розтягнута до 180px."
          code={`<button className="btn btn-secondary btn-icon" style={{ width: '180px' }}>{PlusIcon}</button>`}
        >
          <button className="btn btn-secondary btn-icon" style={{ width: '180px' }}>{PlusIcon}</button>
        </ComponentSection>

        <ComponentSection 
          title="Secondary Icon: Header (35px)"
          description="Квадратна кнопка Secondary 35x35."
          code={`<button className="btn btn-secondary btn-icon--header">{PlusIcon}</button>`}
        >
          <button className="btn btn-secondary btn-icon--header">{PlusIcon}</button>
        </ComponentSection>

        {/* --- SECTION 5: LINKS --- */}
        <h2 style={{ color: '#4169e1', marginBottom: '30px', marginTop: '100px' }}>2. Links System</h2>

        <ComponentSection 
          title="Text Link: Standard"
          description="Текстове посилання, ширина auto (за ТЗ)."
          code={`<a href="#" className="link-base link-text">Link</a>`}
        >
          <a href="#" className="link-base link-text"  onClick={(e) => e.preventDefault()}>Link</a>
        </ComponentSection>

        <ComponentSection 
          title="Text Link: Fixed Width (180px)"
          description="Текстове посилання з шириною 180px."
          code={`<a href="#" className="link-base link-text" style={{ width: '180px' }}>Link</a>`}
        >
          <a href="#" className="link-base link-text" style={{ width: '180px' }} onClick={(e) => e.preventDefault()}>Link</a>
        </ComponentSection>

        <ComponentSection 
          title="Icon Link: Standard (28px)"
          description="Посилання-іконка 28x28."
          code={`<a href="#" className="link-base link-icon">{PlusIcon}</a>`}
        >
          <a href="#" className="link-base link-icon" onClick={(e) => e.preventDefault()}>{PlusIcon}</a>
        </ComponentSection>

         {/* --- SECTION 3: TEXT INPUTS (Fixed 67px) --- */}
        <h2 style={{ color: '#4169e1', marginBottom: '30px' }}>3. Text Inputs</h2>

        <ComponentSection 
          title="3.1 Input: Normal"
          description="Стандартний стан. Висота всієї конструкції 67px (інпут 43px + зона помилки)."
          code={`<div className="input-group input-type">\n  <input className="input" placeholder="Введіть ваше ім'я" />\n  <div className="input-info">\n    <span className="error-text">Помилка</span>\n  </div>\n</div>`}
        >
          <div className="input-group input-type">
            <input className="input" placeholder="Введіть ваше ім'я" />
            <div className="input-info">
              <span className="error-text">Текст помилки з'явиться тут</span>
            </div>
          </div>
        </ComponentSection>

        <ComponentSection 
          title="3.2 Input: Error State"
          description="Додано клас .has-error. Рамка стає червоною, текст помилки — видимим."
          code={`<div className="input-group input-type has-error">\n  <input className="input" defaultValue="wrong-data" />\n  <div className="input-info">\n    <span className="error-text">Будь ласка, перевірте дані</span>\n  </div>\n</div>`}
        >
          <div className="input-group input-type has-error">
            <input className="input" defaultValue="wrong-data" />
            <div className="input-info">
              <span className="error-text">Будь ласка, перевірте дані</span>
            </div>
          </div>
        </ComponentSection>

      {/* --- SECTION 4: TEXT AREAS (React Component) --- */}
<h2 style={{ color: '#4169e1', marginBottom: '30px', marginTop: '100px' }}>4. Text Areas</h2>

{/* 4.1 Варіант за замовчуванням (Історія) */}
<ComponentSection 
  title="4.1 Story Area (Default)"
  description="Варіант для великих текстів. Висота 180px, ліміт 2500 символів та плейсхолдер встановлені автоматично."
  code={`// Не потрібно передавати жодних пропсів\n<StoryTextArea />`}
>
  <TextArea />
</ComponentSection>

{/* 4.2 Варіант для коротких повідомлень */}
<ComponentSection 
  title="4.2 General Message Area (Custom)"
  description="Для коротких повідомлень передаємо варіант 'h-120' та потрібний ліміт символів."
  code={`<StoryTextArea \n  variant="h-120" \n  maxChars={300} \n  placeholder="Напишіть короткий коментар..." \n/>`}
>
  <TextArea 
    variant="h-120" 
    maxChars={300} 
    placeholder="Напишіть короткий коментар..." 
  />
</ComponentSection>

{/* 4.3 Демонстрація стану помилки */}
<ComponentSection 
  title="4.3 Error State Demo"
  description="Компонент сам вираховує залишок і вмикає червоний колір, якщо текст задовгий."
  code={`// Просто введіть текст більше ліміту - помилка з'явиться автоматично`}
>
  {/* Тут ми просто показуємо компонент, щоб розробник міг потестити введення */}
  <TextArea 
    variant="h-120" 
    maxChars={10} 
    placeholder="Введіть більше 10 символів..." 
  />
</ComponentSection>

{/* --- SECTION 5: CUSTOM SELECT --- */}
<h2 style={{ color: 'var(--color-royal-blue)', marginBottom: '30px', marginTop: '100px' }}>5. Custom Select</h2>

<ComponentSection 
  title="5.1 Category Selection"
  description="Адаптивний селект з вибором регіону. Підтримує темну тему та мобільні версії."
  code={`<CustomSelect />`}
>
  <CustomSelect />
</ComponentSection>

{/* Для візуальної перевірки станів розробником без взаємодії */}
<ComponentSection 
  title="5.2 Select States"
  description="Візуальна перевірка кольорів у стані Filled та Open."
  code={`// Ці стани активуються автоматично через CSS класи .is-filled та .is-open`}
>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
    
    {/* Стан: Filled */}
    <div className="select-group">
      <span className="select-label">Категорія</span>
      <div className="select-container is-filled">
        <div className="select-trigger">
          <span className="select-trigger-text">Європа</span>
          <div className="select-icon">
            <svg><use xlinkHref="/sprites/sprite.svg#icon-keyboard_arrow_down" /></svg>
          </div>
        </div>
      </div>
    </div>

    {/* Стан: Open */}
    <div className="select-group">
      <span className="select-label">Категорія</span>
      <div className="select-container is-open">
        <div className="select-trigger" style={{ borderColor: 'var(--color-royal-blue-light)' }}>
          <span className="select-trigger-text">Категорія</span>
          <div className="select-icon" style={{ transform: 'rotate(180deg)' }}>
            <svg><use xlinkHref="/sprites/sprite.svg#icon-keyboard_arrow_down" /></svg>
          </div>
        </div>
        <div className="select-dropdown">
           <div className="select-item">Азія</div>
           <div className="select-item" style={{ background: 'var(--color-neutral-lightest)' }}>Гори</div>
           <div className="select-item">Європа</div>
        </div>
      </div>
    </div>

  </div>
</ComponentSection>

{/* Section 6: Tabs Switching */}
<ComponentSection 
  title="6.1 Tabs: Interactive Component"
  description="Універсальний перемикач станів. Підтримує передачу назв кнопок через пропси. Повертає значення 'state1' або 'state2' у функцію onChange."
  code={`<Tabs 
  firstLabel="Збережені історії" 
  secondLabel="Мої історії" 
  onChange={(state) => console.log(state)} 
/>`}
>
  <Tabs onChange={(state) => console.log("Обрано:", state)} />
</ComponentSection>

<ComponentSection 
  title="6.2 Tabs States & Props API"
  description="Візуальна перевірка станів та опис вхідних параметрів."
  code={`// API Компонента:
// firstLabel (string): Текст лівої кнопки (за замовчуванням: "Збережені історії")
// secondLabel (string): Текст правої кнопки (за замовчуванням: "Мої історії")
// onChange (function): Callback, що отримує 'state1' або 'state2'
`}
>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
    
    {/* Візуальна перевірка Стан 1 */}
    <div className="kit-group">
      <span className="kit-label" style={{ marginBottom: '10px', display: 'block', color: 'var(--color-neutral)' }}>
        Стан: state1 (Active First)
      </span>
      {/* Використовуємо реальний компонент з фіксацією пропса, якщо він підтримує value, 
          або просто чисту верстку для тесту кольорів: */}
      <div className={styles.tabsWrapper}>
        <div className={`${styles.tabsSwitcher} ${styles.stateFirst}`}>
          <button className={`${styles.tabBtn} ${styles.tabBtnFirst}`}>Monthly</button>
          <button className={`${styles.tabBtn} ${styles.tabBtnSecond}`}>Yearly</button>
        </div>
      </div>
    </div>

    {/* Візуальна перевірка Стан 2 */}
    <div className="kit-group">
      <span className="kit-label" style={{ marginBottom: '10px', display: 'block', color: 'var(--color-neutral)' }}>
        Стан: state2 (Active Second)
      </span>
      <div className={styles.tabsWrapper}>
        <div className={`${styles.tabsSwitcher} ${styles.stateSecond}`}>
          <button className={`${styles.tabBtn} ${styles.tabBtnFirst}`}>Збережені історії</button>
          <button className={`${styles.tabBtn} ${styles.tabBtnSecond}`}>Мої історії</button>
        </div>
      </div>
    </div>

  </div>
</ComponentSection>

      </div>
    </div>
  );
}