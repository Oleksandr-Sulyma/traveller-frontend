"use client"
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import css from "./ModalLayout.module.css";



export interface ModalLayoutProps {
    title: string;
    description?: string;
    confirmButtonText: string;
    cancelButtonText: string;
    onConfirm: () => void;
    onCancel: () => void;
    onClose: () => void;
}
export default function ModalLayout({ title, description, confirmButtonText, cancelButtonText, onConfirm, onCancel, onClose }: ModalLayoutProps) {
    const modalRoot = document.getElementById("modal-root");
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        }
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
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
    }, [onClose]);

    if (!modalRoot) {
        return null;
    }
    return createPortal(
        <div className={css.overlay} role="dialog" aria-modal="true" >
            <div className={css.modal} ref={modalRef} >
                <button
                    type="button"
                    onClick={onClose}
                    className={`${css.closeBtn} `}
                    aria-label="Close"
                >
                    <svg className={css.iconClose} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <use href="/sprites/sprite.svg#icon-close"></use>
                    </svg>
                </button>

                <div className={css.content}>
                    <h3 className={css.title}>{title}</h3>
                    {description && <p className={css.description}>{description}</p>}
                </div>
                <div className={css.buttons}>
                    <button onClick={onCancel} className={`btn btn-secondary ${css.button} `}>{cancelButtonText}</button>
                    <button onClick={onConfirm} className={`btn btn-primary ${css.button} `}>{confirmButtonText}</button>
                </div>

            </div>
        </div >, modalRoot
    )

}