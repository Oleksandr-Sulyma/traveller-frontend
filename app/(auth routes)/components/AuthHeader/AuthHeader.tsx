import Link from 'next/link';
import css from './AuthHeader.module.css';
export default function AuthHeader() {
  return (
    <Link className={css.logo} href="/">
      Подорожники
    </Link>
  );
}
