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
        className={`textarea ${variant}`}
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
      />
      
      <div className="input-info">
        <span className="error-text">
          Перевищено ліміт на {Math.abs(charsLeft)} симв.
        </span>

        <span className="input-counter">
          Лишилось символів: {charsLeft >= 0 ? charsLeft : 0}
        </span>
      </div>
    </div>
  );
};

export default StoryTextArea;