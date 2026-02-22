// app/(public)/ui-kit/page.tsx
export default function UIKit() {
  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      <h1>🎨 UI Kit — перевірка глобальних стилів</h1>

      {/* BUTTONS */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Buttons</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button className="button-primary">Primary Button</button>
          <button className="btn btn--secondary">Secondary</button>
          <button className="btn btn--outline">Outline</button>
          <button className="btn btn--icon">
            <svg width="20" height="20">
              <use href="/sprites/sprite.svg#icon-heart"></use>
            </svg>
          </button>
        </div>
      </section>

      {/* INPUTS */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Inputs</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px' }}>
          <input className="input" type="text" placeholder="Text input" />
          <input className="input" type="email" placeholder="Email" />
          <textarea className="input" placeholder="Textarea"></textarea>
          <label className="checkbox">
            <input type="checkbox" />
            <span style={{ marginLeft: '8px' }}>Checkbox</span>
          </label>
        </div>
      </section>

      {/* CARDS */}
      <section>
        <h2>Cards</h2>
        <div className="card" style={{ maxWidth: '400px' }}>
          <img src="https://picsum.photos/400/200" alt="Test" />
          <div className="card__body">
            <h3 className="card__title">
              Дуже довгий заголовок картки який повинен обрізатися на два рядки
            </h3>
            <p className="card__text">
              Дуже довгий опис який має обрізатися на кілька рядків щоб перевірити line-clamp.
            </p>
            <button className="btn">Read more</button>
          </div>
        </div>
      </section>
    </main>
  );
}
