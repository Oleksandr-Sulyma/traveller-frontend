'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Category } from '@/types/category';

// Ми залишаємо список тут як дефолтний, якщо пропси не передані
export const CATEGORIES_LIST: Category[] = [
  { id: 'asia', name: 'Азія' },
  { id: 'mountains', name: 'Гори' },
  { id: 'europe', name: 'Європа' },
  { id: 'america', name: 'Америка' },
  { id: 'africa', name: 'Африка' },
  { id: 'deserts', name: 'Пустелі' },
  { id: 'balkans', name: 'Балкани' },
  { id: 'caucasus', name: 'Кавказ' },
  { id: 'oceania', name: 'Океанія' }
];

interface CustomSelectProps {
  label?: string;
  categories?: Category[];
  placeholder?: string;
  onSelect?: (category: Category) => void;
  defaultValue?: Category | null;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ 
  label = "Категорія", 
  categories = CATEGORIES_LIST, 
  placeholder = "Оберіть категорію",
  onSelect,
  defaultValue = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Category | null>(defaultValue);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (category: Category) => {
    setSelected(category);
    setIsOpen(false);
    if (onSelect) {
      onSelect(category);
    }
  };

  return (
    <div className="input-group">
      <span style={{ 
        marginBottom: '8px', 
        fontSize: '14px', 
        fontWeight: 500,
        color: 'var(--color-scheme-1-text)' 
      }}>
        {label}
      </span>
      
      <div 
        ref={selectRef}
        className={`select-container ${isOpen ? 'is-open' : ''} ${selected ? 'is-filled' : ''}`}
        style={{ position: 'relative', cursor: 'pointer' }}
      >
        <div 
          className="input" 
          onClick={() => setIsOpen(!isOpen)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            minHeight: '43px'
          }}
        >
          <span style={{ color: selected ? 'inherit' : 'var(--color-input-placeholder)' }}>
            {selected ? selected.name : placeholder}
          </span>
          
          <div style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', 
            transition: 'transform 0.2s ease',
            display: 'flex',
            alignItems: 'center'
          }}>
            <svg width="20" height="20" fill="currentColor">
              <use xlinkHref="/sprites/sprite.svg#icon-keyboard_arrow_down" />
            </svg>
          </div>
        </div>

        {isOpen && (
          <div className="select-dropdown" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 10,
            marginTop: '4px',
            background: 'var(--color-scheme-1-background)',
            border: '1px solid var(--color-scheme-1-border)',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="select-item"
                onClick={() => handleSelect(category)}
                style={{
                  padding: '10px 12px',
                  transition: 'background 0.2s ease'
                }}
              >
                {category.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;