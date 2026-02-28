import css from './AuthFooter.module.css';

export default function AuthFooter() {
  const year = new Date().getFullYear();

  return <p className={`${css.footer} tag-text`}>{`©  ${year} Подорожники`}</p>;
}
