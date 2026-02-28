'use client'
import Image from "next/image";
import { Story } from "@/types/story";
import { useState } from "react";
import AuthNavModal from "@/components/AuthNavModal/AuthNavModal"
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addToSave } from "@/lib/api/clientApi";
import css from "./StoryDetails.module.css";

interface StoryDetailsProps {
    story: Story;
}

export default function StoryDetails({ story }: StoryDetailsProps) {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => addToSave(story._id),
        onSuccess: () => {
            toast.success("Історію збережено у вашому профілі!");
            queryClient.invalidateQueries({ queryKey: ["story", story._id] });
        },
        onError: (error: any) => {
            const status = error.response?.status;

            if (status === 401) {
                setIsAuthModalOpen(true);
            } else if (status === 409) {
                toast("Ця історія вже збережена", { icon: 'ℹ️' });
            } else {
                toast.error(error.response?.data?.message || "Помилка збереження");
            }
        }
    });

    const handleSave = () => {
        if (!localStorage.getItem("token")) {
            setIsAuthModalOpen(true);
            return;
        }
        mutate();
    };



    return (
        <section className="section">
            <article className="container">
                <div className={css.metaContainer}>
                    <div className={css.meta}>
                        <div className={css.metaItem}>
                            <span className={css.label}>Автор статті: </span>
                            <span className={css.value}>
                                {story.ownerId.name}
                            </span>
                        </div>
                        <div className={css.metaItem}>
                            <span className={css.label}>Опубліковано: </span>
                            <span className={css.value}>

                                {new Date(story.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    {/* Категорія */}
                    <div className={css.categoryTag}>
                        {story.category.name}
                    </div>
                </div>
                {/* Головне зображення */}
                <div className={css.imageWrapper}>
                    <Image
                        src={story.img}
                        className={css.image}
                        alt={story.title}
                        width={335}
                        height={224}
                        style={{ width: '100%', height: 'auto' }}
                        priority
                    />
                </div>

                <aside className={css.contentSide}>
                    <p className={css.storyArticle}>
                        {story.article}
                    </p>

                    {/* Блок для додавання в Збережені */}
                    <div className={css.saveBox}>
                        <h3 className={css.sidebarTitle}>Збережіть собі історію</h3>
                        <p className={css.sidebarText}>
                            Вона буде доступна у вашому профілі у розділі збережене
                        </p>
                        <button
                            onClick={handleSave}
                            disabled={isPending}
                            className={`btn btn-primary ${css.saveBtn}`}
                        >
                            {isPending ? "Зберігаємо..." : "Зберегти"}
                        </button>
                    </div>
                </aside>
            </article>

            {/* Модалка навігації */}
            {isAuthModalOpen && (
                <AuthNavModal onClose={() => setIsAuthModalOpen(false)} />
            )}
        </section>
    );
}