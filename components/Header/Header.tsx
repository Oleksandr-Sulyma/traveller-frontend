"use client"
import { useState } from "react";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import AuthRedirectModal from "../AuthNavModal/AuthNavModal";

export default function Header() {
  // Стани для відкриття модалок
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isAuthWarningOpen, setIsAuthWarningOpen] = useState(false);

  const handleLogout = () => {
    console.log("Користувач вийшов");
    setIsLogoutOpen(false);
  };

  return (
    <header className="header">
      <h1>Header</h1>


      <div >
        {/* Кнопка 1: Тестуємо вихід */}
        <button onClick={() => setIsLogoutOpen(true)} className="btn">
          confirmModal
        </button>
        <br>
        </br>
        {/* Кнопка 2: Тестуємо помилку збереження */}
        <button onClick={() => setIsAuthWarningOpen(true)} className="btn">
          authNavModal
        </button>
      </div>



      {/* 1. Модалка підтвердження виходу */}
      {isLogoutOpen && (
        <ConfirmModal
          onClose={() => setIsLogoutOpen(false)}
          onConfirm={handleLogout}
        />
      )}

      {/* 2. Модалка редіректу (помилка збереження) */}
      {isAuthWarningOpen && (
        <AuthRedirectModal
          onClose={() => setIsAuthWarningOpen(false)}
        />
      )}
    </header>
  );
}