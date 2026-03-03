
"use client";
import { getStoryById } from "@/lib/api/clientApi";
import { Story } from "@/types/story";
import { useQuery } from "@tanstack/react-query";
import StoryDetails from "@/components/StoryDetails/StoryDetails";
import Loader from "@/components/Loader/Loader";
import { useEffect } from "react";
import css from "./StoryDetailsPage.module.css"
// import Popular from "@/components/Popular/Popular"; //


interface Props {
    storyId: string;
}

export default function StoryDetailsClient({ storyId }: Props) {


    const { data: story, isLoading, error } = useQuery<Story, Error>({
        queryKey: ["story", storyId],
        queryFn: () => getStoryById(storyId),
        refetchOnMount: false,
    });


    if (isLoading) {
        return <div><Loader /></div>;
    }
    if (error || !story) {
        return <div>Error: {error?.message || "Story not found"}</div>;
    }


    return (
        <main className="container">
            <section className={`section ${css.storyPageSection}`}>
                <h1 className={css.title}>{story.title}</h1>
                <StoryDetails story={story} />
            </section>
            <section className={`section ${css.popularSection}`}>
                <h2 className={css.titlePopularStory}>Популярні історії</h2>
                <div>-------</div>
                {/* компонент популярні історії */}
            </section>
        </main>
    )
}


