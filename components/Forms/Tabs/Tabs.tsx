'use client';

import React, { useState } from 'react';
import styles from './Tabs.module.css';

interface TabsProps {
  firstLabel?: string;
  secondLabel?: string;
  onChange?: (state: 'state1' | 'state2') => void;
  defaultActive?: 'state1' | 'state2';
}

const Tabs: React.FC<TabsProps> = ({ 
  firstLabel = "Збережені історії", 
  secondLabel = "Мої історії", 
  onChange,
  defaultActive = 'state1'
}) => {
  const [active, setActive] = useState<'state1' | 'state2'>(defaultActive);

  const handleToggle = (targetState: 'state1' | 'state2') => {
    if (active === targetState) return; 
    setActive(targetState);
    if (onChange) {
      onChange(targetState);
    }
  };

  return (
    <div className={styles.tabsWrapper}>
      <div className={`
        ${styles.tabsSwitcher} 
        ${active === 'state1' ? styles.stateFirst : styles.stateSecond}
      `}>
        <button 
          type="button"
          className={`${styles.tabBtn} ${styles.tabBtnFirst}`}
          onClick={() => handleToggle('state1')}
        >
          {firstLabel}
        </button>
        <button 
          type="button"
          className={`${styles.tabBtn} ${styles.tabBtnSecond}`}
          onClick={() => handleToggle('state2')}
        >
          {secondLabel}
        </button>
      </div>
    </div>
  );
};

export default Tabs;