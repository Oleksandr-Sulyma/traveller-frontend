// import s from './Hero.module.css';

export default function Hero() {
  return (
    <section>
      <div className="container">
        {/* Використовуємо базовий H1 та базовий p */}
        <h1>Твої пригоди варті того, щоб про них знали</h1>
        <p>Ділися історіями та знаходь нові маршрути разом із нами.</p>
        
        {/* клас для великої кнопки */}
        <button className="button-primary button-primary-large">
          Розпочати подорож
        </button>
      </div>
    </section>
  );
}