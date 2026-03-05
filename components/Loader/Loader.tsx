'use client';
import { Oval } from 'react-loader-spinner';

type LoaderProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function Loader({ size = 40, color = '#4F6EDB', className }: LoaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }} className={className}>
      <Oval
        height={size}
        width={size}
        color={color}
        secondaryColor="#E5E7EB"
        strokeWidth={4}
        ariaLabel="loading"
      />
    </div>
  );
}
