"use client";

import React, { useState } from 'react';
import StoryTextArea from '@/components/Forms/StoryTextArea/StoryTextArea';
import CustomSelect from '@/components/Forms/CustomSelect/CustomSelect';
import Tabs from '@/components/Forms/Tabs/Tabs'; 

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

  const ComponentSection = ({ title, usage, code, children }: any) => (
    <div style={{ marginBottom: '60px', borderBottom: '1px solid var(--color-scheme-1-border)', paddingBottom: '30px' }}>
      <h3 style={{ fontSize: '20px', color: 'var(--color-royal-blue)', marginBottom: '10px' }}>{title}</h3>
      <div style={{ 
        backgroundColor: 'var(--color-scheme-2-background)', 
        padding: '12px', 
        borderRadius: '6px', 
        marginBottom: '15px',
        fontSize: '14px',
        borderLeft: '4px solid var(--color-royal-blue)',
        color: 'var(--color-scheme-1-text)'
      }}>
        <strong>💡 Порада:</strong> {usage}
      </div>
      
      <div style={{ 
        padding: '20px', 
        border: '1px dashed var(--color-scheme-1-border)', 
        borderRadius: '8px',
        backgroundColor: 'var(--color-scheme-1-background)'
      }}>
        {children}
      </div>

      <pre style={{ 
        background: '#1e1e1e', 
        color: '#569cd6', 
        padding: '15px', 
        borderRadius: '8px', 
        marginTop: '15px',
        fontSize: '13px',
        overflowX: 'auto'
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', color: 'var(--color-scheme-1-text)' }}>
      <header style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>UI Kit: Довідник розробника</h1>
        <button className="btn btn-primary" onClick={toggleTheme}>
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
            <tr style={{ borderBottom: '1px solid var(--color-scheme-1-border)' }}>
              <td style={{ padding: '10px' }}>Кнопка (Стандарт)</td><td>.btn-primary / .btn-secondary</td><td>48px</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--color-scheme-1-border)' }}>
              <td style={{ padding: '10px' }}>Кнопка (Хедер)</td><td>.btn--header / .btn-icon--header</td><td>35px</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--color-scheme-1-border)' }}>
              <td style={{ padding: '10px' }}>Текстове поле (Input)</td><td>.input-group.input-type</td><td>69px (разом з помилкою)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--color-scheme-1-border)' }}>
              <td style={{ padding: '10px' }}>Поле тексту (Мале)</td><td>StoryTextArea variant="h-120"</td><td>146px (разом з лічильником)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--color-scheme-1-border)' }}>
              <td style={{ padding: '10px' }}>Поле тексту (Велике)</td><td>StoryTextArea variant="h-180"</td><td>206px (разом з лічильником)</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* --- КНОПКИ ТА ШИРИНА --- */}
      <section>
        <h2 style={{ fontSize: '28px', borderBottom: '2px solid', marginBottom: '30px' }}>1. Кнопки та керування шириною</h2>
        
        <ComponentSection 
          title="1.1 Зміна стану та ширини"
          usage="Поміняйте клас primary/secondary для кольору. Для ширини використовуйте inline-style або зовнішній контейнер."
          code={`<button className="btn btn-primary" style={{ width: '180px' }}>Фіксована</button>\n<button className="btn btn-secondary" style={{ width: '100%' }}>На всю ширину</button>`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button className="btn btn-primary" style={{ width: '180px' }}>180px Primary</button>
            <button className="btn btn-secondary" style={{ width: '100%' }}>Full Width Secondary</button>
          </div>
        </ComponentSection>

        <ComponentSection 
          title="1.2 Іконки: Primary vs Secondary"
          usage="Клас .btn-icon створює квадратну кнопку. Колір іконки успадковується (currentColor)."
          code={`<button className="btn btn-primary btn-icon">{PlusIcon}</button>\n<button className="btn btn-secondary btn-icon">{PlusIcon}</button>`}
        >
          <div style={{ display: 'flex', gap: '15px' }}>
            <button className="btn btn-primary btn-icon">{PlusIcon}</button>
            <button className="btn btn-secondary btn-icon">{PlusIcon}</button>
            <button className="btn btn-primary btn-icon--header">{PlusIcon}</button>
          </div>
        </ComponentSection>
      </section>

      {/* --- ПОСИЛАННЯ --- */}
      <section style={{ marginTop: '80px' }}>
        <h2 style={{ fontSize: '28px', borderBottom: '2px solid', marginBottom: '30px' }}>2. Посилання (links.css)</h2>
        
        <ComponentSection 
          title="2.1 Текстові та іконочні лінки"
          usage="Клас .link-text для звичайних лінків, .link-icon для кнопок-іконок без фону."
          code={`<a href="#" className="link-base link-text">Читати статтю</a>\n<a href="#" className="link-base link-icon">{PlusIcon}</a>`}
        >
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <a href="#" className="link-base link-text" onClick={(e) => e.preventDefault()}>Текстова лінка</a>
            <a href="#" className="link-base link-icon" onClick={(e) => e.preventDefault()}>{PlusIcon}</a>
          </div>
        </ComponentSection>
      </section>

      {/* --- ФУТЕР --- */}
      <section style={{ marginTop: '80px' }}>
        <h2 style={{ fontSize: '28px', borderBottom: '2px solid', marginBottom: '30px' }}>3. Футер (footer.css)</h2>
        
        <ComponentSection 
          title="3.1 Елементи футера"
          usage="Для посилань у футері використовуйте клас .link-footer-pc. Він має специфічні кольори для світлої/темної тем."
          code={`<div style={{ background: 'var(--footer-background)' }}>\n  <a href="#" className="link-base link-text link-footer-pc">Про нас</a>\n</div>`}
        >
          <div style={{ 
            background: 'var(--footer-background)', 
            padding: '20px', 
            borderRadius: '8px', 
            display: 'flex', 
            gap: '20px',
            color: 'var(--footer-text)'
          }}>
            <a href="#" className="link-base link-text link-footer-pc" onClick={(e) => e.preventDefault()}>Контакти</a>
            <a href="#" className="link-base link-text link-footer-pc" onClick={(e) => e.preventDefault()}>Допомога</a>
            <a href="#" className="link-base link-icon" style={{color: 'var(--footer-text)'}} onClick={(e) => e.preventDefault()}>{PlusIcon}</a>
          </div>
        </ComponentSection>
      </section>

      {/* --- ФОРМИ --- */}
      <section style={{ marginTop: '80px' }}>
        <h2 style={{ fontSize: '28px', borderBottom: '2px solid', marginBottom: '30px' }}>4. Форми та React-компоненти</h2>

        <ComponentSection 
          title="4.1 Динамічний Select"
          usage="Використовуйте компонент CustomSelect. Ширина контейнера регулюється через батьківський div."
          code={`import CustomSelect from '@/components/Forms/CustomSelect/CustomSelect';\n\n<div style={{ width: '300px' }}>\n  <CustomSelect label="Регіон" />\n</div>`}
        >
          <div style={{ width: '335px' }}>
            <CustomSelect label="Оберіть регіон подорожі" />
          </div>
        </ComponentSection>

        <ComponentSection 
          title="4.2 Перемикач Tabs"
          usage="Завжди має ширину 100% від контейнера, але обмежений max-width: 462px у CSS."
          code={`<Tabs onChange={(s) => console.log(s)} />`}
        >
          <Tabs />
        </ComponentSection>

{/* --- SECTION 5: TYPOGRAPHY SYSTEM --- */}
<section style={{ marginTop: '100px' }}>
  <h2 style={{ fontSize: '28px', borderBottom: '2px solid var(--color-royal-blue)', marginBottom: '30px', paddingBottom: '10px' }}>
    5. Typography (Шрифтова система)
  </h2>

  {/* 5.1 Основні гарнітури */}
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
    <div style={{ padding: '20px', border: '1px solid var(--color-scheme-1-border)', borderRadius: '12px' }}>
      <p style={{ fontSize: '14px', color: 'var(--color-neutral)', marginBottom: '10px' }}>Primary Font (Основний)</p>
      <p style={{ fontSize: '24px', fontWeight: 700 }}>Nunito Sans</p>
      <p style={{ opacity: 0.8 }}>Використовується для основного тексту, кнопок, інпутів та описів.</p>
    </div>
    <div style={{ padding: '20px', border: '1px solid var(--color-scheme-1-border)', borderRadius: '12px' }}>
      <p style={{ fontSize: '14px', color: 'var(--color-neutral)', marginBottom: '10px' }}>Heading Font (Заголовки)</p>
      <p style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--second-family)' }}>Raleway</p>
      <p style={{ opacity: 0.8 }}>Використовується виключно для заголовків H1-H4 та акцентних елементів.</p>
    </div>
  </div>

  {/* 5.2 Заголовки з поясненням адаптивності */}
  <ComponentSection 
    title="5.1 Семантичні заголовки (Raleway)"
    usage="Розміри змінюються автоматично: H1 на мобільних 32px, на десктопі 56px. Текст має letter-spacing: -0.01em."
    code={`<h1>Головний заголовок</h1>\n<h2>Назва секції</h2>\n<h3>Заголовок картки</h3>\n<h4>Заклик до дії</h4>`}
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '100%' }}>
      <div style={{ borderLeft: '3px solid var(--color-royal-blue)', paddingLeft: '20px' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-neutral)', textTransform: 'uppercase' }}>H1: Hero / Page Title</span>
        <h1 style={{ marginTop: '5px' }}>Подорожуй та ділись враженнями</h1>
      </div>
      <div style={{ borderLeft: '3px solid var(--color-royal-blue)', paddingLeft: '20px' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-neutral)', textTransform: 'uppercase' }}>H2: Section Header</span>
        <h2 style={{ marginTop: '5px' }}>Найкращі історії тижня</h2>
      </div>
      <div style={{ borderLeft: '3px solid var(--color-royal-blue)', paddingLeft: '20px' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-neutral)', textTransform: 'uppercase' }}>H3: Card Title</span>
        <h3 style={{ marginTop: '5px' }}>Таємниці старих Карпат</h3>
      </div>
      <div style={{ borderLeft: '3px solid var(--color-royal-blue)', paddingLeft: '20px' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-neutral)', textTransform: 'uppercase' }}>H4: Small Header</span>
        <h4 style={{ marginTop: '5px' }}>Приєднуйся до спільноти</h4>
      </div>
    </div>
  </ComponentSection>

  {/* 5.3 Службові класи */}
  <ComponentSection 
    title="5.2 Додаткові стилі тексту"
    usage="Класи для мета-даних, тегів та форм. Використовують Nunito Sans з різною жирністю."
    code={`<p className="author-info">Олена, 20 жов</p>\n<span className="tag-text">Європа</span>\n<span className="upload-text">Завантажити фото</span>`}
  >
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
      <div>
        <p className="author-info">Олена Кузнєцова, 20 жовтня</p>
        <p style={{ fontSize: '11px', color: 'var(--color-neutral)', marginTop: '5px' }}>.author-info: Bold, 16px/18px</p>
      </div>
      <div>
        <div style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: 'var(--color-royal-blue-lighter)', borderRadius: '20px' }}>
          <span className="tag-text">ЄВРОПА</span>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--color-neutral)', marginTop: '5px' }}>.tag-text: SemiBold, 12px/16px</p>
      </div>
      <div>
        <span className="upload-text">Додати світлину</span>
        <p style={{ fontSize: '11px', color: 'var(--color-neutral)', marginTop: '5px' }}>.upload-text: Medium, 16px/18px</p>
      </div>
    </div>
  </ComponentSection>
</section>

      </section>
    </div>
  );
}