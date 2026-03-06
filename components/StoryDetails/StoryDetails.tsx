'use client'
import Image from "next/image";
import { Story } from "@/types/story";
import { useState, useEffect } from "react";
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
    const [alreadySaved, setAlreadySaved] = useState(false);

    const DEFAULT_IMAGE = "/images/storyForm/desktop@1x.webp"
    const [imgSrc, setImgSrc] = useState(story.img || DEFAULT_IMAGE);


    useEffect(() => {
        window.scrollTo(0, 0);

        const authData = localStorage.getItem("auth-storage");
        if (authData) {
            try {
                const parsed = JSON.parse(authData);
                const savedIds = parsed.state?.user?.savedStories || [];
                if (savedIds.includes(story.id)) {
                    setAlreadySaved(true);
                }
            } catch (e) {
                console.error("Error parsing auth-storage", e);
            }
        }
    }, [story.id]);

    const { mutate, isPending } = useMutation({
        mutationFn: () => addToSave(story.id),
        onSuccess: () => {
            toast.success("Історію збережено!");
            setAlreadySaved(true);
            queryClient.invalidateQueries({ queryKey: ["story", story.id] });
            queryClient.invalidateQueries({ queryKey: ["saved-stories"] });
        },
        onError: (error: any) => {
            const status = error.response?.status;
            if (status === 401) {
                setIsAuthModalOpen(true);
            } else if (status === 409) {
                setAlreadySaved(true);
                toast("Ця історія вже збережена", { icon: 'ℹ️' });
            } else {
                toast.error(error.response?.data?.message || "Помилка збереження");
            }
        }
    });

    const handleSave = async () => {
        const authData = localStorage.getItem("auth-storage");
        if (!authData || !authData.includes('"isAuthenticated":true')) {
            setIsAuthModalOpen(true);
            return;
        }
        mutate();
    };

    return (
        <div className="section">
            <article>
                <div className={css.metaContainer}>
                    <div className={css.meta}>
                        <div className={css.metaItem}>
                            <span className={css.label}>Автор статті: </span>
                            <span className={css.value}>{story.ownerId.name}</span>
                        </div>
                        <div className={css.metaItem}>
                            <span className={css.label}>Опубліковано: </span>
                            <span className={css.value}>
                                {story.formattedDate || (story.date ? new Date(story.date).toLocaleDateString('uk-UA') : 'Дата невідома')}
                            </span>
                        </div>
                    </div>
                    <div className={css.categoryTag}>{story.category.name}</div>
                </div>

                <div className={css.imageWrapper}>
                    <Image
                        src={imgSrc}
                        className={css.image}
                        alt={story.title}
                        width={335}
                        height={224}
                        style={{ width: '100%', height: 'auto' }}
                        priority
                        onError={() => {
                            if (imgSrc !== DEFAULT_IMAGE) setImgSrc(DEFAULT_IMAGE);
                        }}
                    />
                </div>

                <aside className={css.contentSide}>
                    <p className={css.storyArticle}>{story.article}</p>


                    {!alreadySaved && (
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
                    )}
                </aside>
            </article>

            {isAuthModalOpen && (
                <AuthNavModal onClose={() => setIsAuthModalOpen(false)} />
            )}
        </div>
    );
}