"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Category, CategoryName } from '@/types/category';

export const CATEGORIES_LIST: Category[] = [
  { _id: 'asia', name: 'Азія' },
  { _id: 'mountains', name: 'Гори' },
  { _id: 'europe', name: 'Європа' },
  { _id: 'america', name: 'Америка' },
  { _id: 'africa', name: 'Африка' },
  { _id: 'deserts', name: 'Пустелі' },
  { _id: 'balkans', name: 'Балкани' },
  { _id: 'caucasus', name: 'Кавказ' },
  { _id: 'oceania', name: 'Океанія' }
];

interface SelectProps {
  label?: string;
  categories: Category[];
  placeholder?: string;
  onSelect?: (category: Category) => void;
}

const CustomSelect: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Category | null>(null);
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
    // Тут можна додати логіку відправки в Store або Form Context
  };

  return (
    <div className="select-group">
      <span className="select-label">Категорія</span>
      
      <div 
        ref={selectRef}
        className={`select-container ${isOpen ? 'is-open' : ''} ${selected ? 'is-filled' : ''}`}
      >
        <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
          <span className="select-trigger-text">
            {selected ? selected.name : "Категорія"}
          </span>
          <div className="select-icon">
            <svg>
              <use xlinkHref="/sprites/sprite.svg#icon-keyboard_arrow_down" />
            </svg>
          </div>
        </div>

        {isOpen && (
          <div className="select-dropdown">
            {CATEGORIES_LIST.map((category) => (
              <div 
                key={category._id} 
                className="select-item"
                onClick={() => handleSelect(category)}
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