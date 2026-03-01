import React from 'react';
import css from './GridContainer.module.css';

interface GridContainerProps {
  children: React.ReactNode;
  variant?: 'travellers' | 'stories';
  className?: string;
}

const GridContainer: React.FC<GridContainerProps> = ({ 
  children, 
  variant = 'travellers', 
  className = '' 
}) => {
  const combinedClasses = `${css.grid} ${css[variant]} ${className}`.trim();

  return (
    <ul className={combinedClasses}>
      {children}
    </ul>
  );
};

export default GridContainer;