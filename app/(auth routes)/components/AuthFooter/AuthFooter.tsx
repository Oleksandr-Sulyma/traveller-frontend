export default function AuthFooter() {
  const year = new Date().getFullYear();

  return <p>{`©  ${year} Подорожники`}</p>;
}
