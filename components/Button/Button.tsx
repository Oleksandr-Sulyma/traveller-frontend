'use client';

import Link from 'next/link';
import css from './Button.module.css';

type CommonProps = {
  mode?: '' | 'primary' | 'cancel' | 'submit';  
  size?: 'small' | 'medium' | 'large';
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

type ButtonOnlyProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkOnlyProps = CommonProps & {
  href: string;
};

type ButtonProps = ButtonOnlyProps | LinkOnlyProps;

const Button = ({
  mode = '',           
  size = 'large',
  href,
  children,
  className,
  disabled = false,
  ...props
}: ButtonProps) => {
  const classes = [css.button, css[mode], css[size], className]  
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <Link
        href={href}
        prefetch={false}
        className={classes}
        aria-disabled={disabled}
      >
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
