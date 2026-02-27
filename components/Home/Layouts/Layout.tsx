import css from './Layout.module.css';

export default function Layout() {
  return (
    <section className="container">
      <div className={css.wrapper}>
        <div className={css.position}>
          <h2>Проєкт, створений для тих, хто живе подорожами</h2>
          <p  className={css.text}>
            Ми віримо, що кожна подорож — це унікальна історія, варта того, щоб нею поділилися. Наша
            платформа створена, щоб об'єднати людей, закоханих у відкриття нового. Тут ви можете
            ділитися власним досвідом, знаходити друзів та надихатися на наступні пригоди разом з
            нами.
          </p>
        </div>
        <ul className={css.svgWrapper}>
          <li className={css.wrapperLi}>
            <svg className={css.svg} width="48" height="48">
              <use href="/sprites/sprite.svg#icon-wand_stars"></use>
            </svg>

            <h3>Наша місія</h3>
            <p>Об'єднувати людей через любов до пригод та надихати на нові відкриття.</p>
          </li>
          <li className={css.wrapperLi}>
            <svg width="48" height="48">
              <use href="/sprites/sprite.svg#icon-travel_luggage_and_bags"></use>
            </svg>
            <h3>Автентичні історії</h3>
            <p>Ми цінуємо справжні, нередаговані враження від мандрівників з усього світу.</p>
          </li>
          <li className={css.wrapperLi}>
            <svg width="48" height="48">
              <use href="/sprites/sprite.svg#icon-communication"></use>
            </svg>
            <h3>Ваша спільнота</h3>
            <p>Станьте частиною спільноти, де кожен може бути і автором, і читачем.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
