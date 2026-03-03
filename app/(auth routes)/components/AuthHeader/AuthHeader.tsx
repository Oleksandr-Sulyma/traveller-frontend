import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/favicon.svg';
import css from './AuthHeader.module.css';

export default function AuthHeader() {
  return (
    <div className={css.header}>
      <Link href="/" className={css.logoLink}>
        <Image src={logo} width={22} height={22} alt="Logo" priority />
        <span className={css.logoText}>Подорожники</span>
      </Link>
    </div>
  );
}
