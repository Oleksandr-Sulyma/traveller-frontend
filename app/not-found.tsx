import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 style={{ fontSize: '64px', marginBottom: '20px' }}>404</h1>
      <h2 style={{ marginBottom: '30px' }}>Упс! Сторінку не знайдено</h2>
      <p style={{ marginBottom: '40px' }}>
        Схоже, цей маршрут ще не прокладений нашими мандрівниками.
      </p>
      <Link href="/" className="btn">
        Повернутися на головну
      </Link>
    </main>
  );
}