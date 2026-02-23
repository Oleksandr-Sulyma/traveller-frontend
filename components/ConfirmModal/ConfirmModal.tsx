"use client"
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import css from "./ConfirmModal.module.css";

interface ConfirmModalProps {
    title: string;
    description?: string;
    confirmButtonText: string;
    cancelButtonText: string;
    onConfirm: () => void;
    onCancel: () => void;
}
export default function ConfirmModal({ title, description, confirmButtonText, cancelButtonText, onConfirm, onCancel }: ConfirmModalProps) {
    const modalRoot = document.getElementById("modal-root");
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onCancel();
            }
        }
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onCancel();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = "hidden";


        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "auto";
        }
    }, [onCancel]);

    if (!modalRoot) {
        return null;
    }
    return createPortal(
        <div className={css.overlay} role="dialog" aria-modal="true" >
            <div className={css.modal} ref={modalRef} >
                <svg className={css.iconClose}>
                    {/* Коли спрайт буде готовий, #icon-close */} X
                    <use href="/sprite.svg#icon-close"></use>
                </svg>
                <div className={css.content}>
                    <h3 className={css.title}>{title}</h3>
                    {description && <p className={css.description}>{description}</p>}
                </div>
                <div className={css.buttons}>
                    <button onClick={onConfirm} className={`${css.cancelButton} ${css.button}`}>{cancelButtonText}</button>
                    <button onClick={onCancel} className={`${css.confirmButton} ${css.button}`}>{confirmButtonText}</button>
                </div>

            </div>
        </div>, modalRoot
    )

}