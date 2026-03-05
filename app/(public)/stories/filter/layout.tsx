import css from './Layout.module.css';

// Import Swiper styles
import 'swiper/css';

interface Props {
  children: React.ReactNode;
  categories: React.ReactNode;
}

export default function StoryPageLayout({ categories, children }: Props) {
  return (
    <section className={`container ${css.section}`}>
      <h2 className={css.align_center}>Історії Мандрівників</h2>
      {categories}
      {children}
    </section>
  );
}
