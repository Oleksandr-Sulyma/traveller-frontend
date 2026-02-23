"use client";

import React, { useState } from 'react';

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
        <h2 style={{ color: '#4169e1', marginBottom: '30px' }}>1. Primary Variant</h2>

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
        <h2 style={{ color: '#777', marginBottom: '30px', marginTop: '100px' }}>2. Secondary Variant</h2>

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
        <h2 style={{ color: '#4169e1', marginBottom: '30px', marginTop: '100px' }}>3. Primary Icon Buttons</h2>

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
        <h2 style={{ color: '#777', marginBottom: '30px', marginTop: '100px' }}>4. Secondary Icon Buttons</h2>

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
        <h2 style={{ color: '#4169e1', marginBottom: '30px', marginTop: '100px' }}>5. Links System</h2>

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


      </div>
    </div>
  );
}