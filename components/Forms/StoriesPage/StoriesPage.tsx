import React, { useState } from 'react';
import Tabs from '../Tabs/Tabs';
import SavedStoriesList from '../SavedStoriesList/SavedStoriesList';
import MyStoriesList from '../MyStoriesList/MyStoriesList';

const StoriesPage = () => {
  // Використовуємо 'state1' як початкове значення (відповідає "Збережені історії")
  const [activeTab, setActiveTab] = useState('state1');

  const handleTabChange = (selectedState: 'state1' | 'state2') => {
  setActiveTab(selectedState);
  };

  return (
    <div className="container">
      <h1>Ваші розповіді</h1>

      {/* 1. Використовуємо компонент Tabs. 
          2. Текст кнопок підтягнеться автоматично (Default Props).
          3. Функція onChange оновлює наш стан.
      */}
      <Tabs onChange={handleTabChange} />

      <section style={{ marginTop: '24px' }}>
        {/* ЛОГІКА ВІДОБРАЖЕННЯ:
            Якщо activeTab дорівнює 'state1' — рендеримо список збережених.
            Якщо activeTab дорівнює 'state2' — рендеримо список власних історій.
        */}
        
        {activeTab === 'state1' && <SavedStoriesList />}
        {activeTab === 'state2' && <MyStoriesList />}
      </section>
    </div>
  );
};

export default StoriesPage;