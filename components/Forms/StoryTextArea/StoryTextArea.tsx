'use client';

import React, { useState, ChangeEvent } from 'react';

interface StoryTextAreaProps {
  variant?: 'h-120' | 'h-180';
  maxChars?: number;
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

const StoryTextArea: React.FC<StoryTextAreaProps> = ({ 
  variant = 'h-180', 
  maxChars = 2500, 
  placeholder = "Ваша історія тут",
  onValueChange 
}) => {
  const [text, setText] = useState<string>("");

  const charsLeft = maxChars - text.length;
  const isError = charsLeft < 0;
  const groupClass = variant === 'h-180' ? 'area-180' : 'area-120';

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setText(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <div className={`input-group ${groupClass} ${isError ? 'has-error' : ''}`}>
      <textarea
        className="textarea"
        style={{ height: variant === 'h-180' ? '180px' : '120px', resize: 'none' }}
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
      />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
        <span className="error-text">
          {isError ? "Перевищено ліміт символів!" : ""}
        </span>
        <span style={{ fontSize: '12px', color: isError ? 'var(--color-red)' : 'var(--color-neutral)' }}>
          {text.length} / {maxChars}
        </span>
      </div>
    </div>
  );
};

export default StoryTextArea;