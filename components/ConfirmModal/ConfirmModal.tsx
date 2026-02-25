
import ModalLayout from "../ModalLayout/ModalLayout";

interface ConfirmModalProps {
    onClose: () => void;
    onConfirm: () => void;
}

export default function ConfirmModal(props: ConfirmModalProps) {
    const { onConfirm, onClose } = props;
    return (
        <ModalLayout
            title="Ви точно хочете вийти?"
            description="Ми будемо сумувати за вами! "
            confirmButtonText="Вийти"
            cancelButtonText="Відмінити"
            onConfirm={onConfirm}
            onCancel={onClose}
            onClose={onClose}
        />
    );
}