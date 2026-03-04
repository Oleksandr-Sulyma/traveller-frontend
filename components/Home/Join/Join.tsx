import SavedOrRegisterButton from '@/components/SavedOrRegisterButton/SavedOrRegisterButton';
import css from './Join.module.css';

export default function Join() {
  return (
    <section id="join" className="container">
      <div className={css.position}>
        <div className={css.wrapper}>
          <h2 className={css.title}>Приєднуйтесь до нашої спільноти</h2>
          <p className={css.description}>
            Долучайтеся до мандрівників, які діляться своїми історіями та надихають на нові пригоди.
          </p>
          <SavedOrRegisterButton />
        </div>
      </div>
    </section>
  );
}
