"use client";
import { useState } from "react";
import ConfirmModal from "@/components/ConfirmModal/ConfirmModal";

export default function TestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    console.log("Користувач вийшов!");
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Хедер</h1>
      <h1>Перевірка модалки</h1>

      <button onClick={() => setIsModalOpen(true)}>
        Відкрити вікно виходу
      </button>

      {isModalOpen && (
        <ConfirmModal
          title="Ви точно хочете вийти?"
          description="Ми будемо сумувати за вами! "
          confirmButtonText="Вийти"
          cancelButtonText="Відмінити"
          onConfirm={handleLogout}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

