

import { useRouter } from "next/navigation";
import ModalLayout from "../ModalLayout/ModalLayout";

interface AuthRedirectModalProps {
    onClose: () => void;
}

export default function AuthRedirectModal({ onClose }: AuthRedirectModalProps) {
    const router = useRouter();

    const handleSingIn = () => {
        router.push("/sign-in"); // Шлях до сторінки логіну
        onClose();
    };

    const handleSingUp = () => {
        router.push("/sign-up"); // Шлях до сторінки реєстрації
        onClose();
    };

    return (
        <ModalLayout
            title="Помилка під час збереження"
            description="Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису зареєструйтесь"
            confirmButtonText="Зареєструватись"
            cancelButtonText="Увійти"
            onConfirm={handleSingUp}
            onCancel={handleSingIn}
            onClose={onClose}
        />
    );
}