'use client';
import { Oval } from 'react-loader-spinner';

export default function Loader({ size = 40, color = '#4F6EDB' }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
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
