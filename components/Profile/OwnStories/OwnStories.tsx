import StoryCard from "@/components/StoryCard/StoryCard";
import { SavedStoriesProps } from "@/types/profile";
import Link from "next/link";
import css from "./OwnStories.module.css"

const OwnStories = ({ stories, page }: SavedStoriesProps) => {
    return (
        <section>
            <div className="container">
                {stories.length != 0 ?
                    stories.map((story) => (
                        <StoryCard storyInf={story} />
                    )) : page === "profile" ?
                    <div className={css.div}>
                        <h2 className={css.title}>Ви ще нічого не публікували, поділіться своєю першою історією!</h2>
                        <Link href="/stories/create" className={css.btn}>Опублікувати історію</Link>
                    </div>
                        : 
                    <div className={css.div}>
                        <h2 className={css.title}>Цей користувач ще не публікував історій</h2>
                        <Link href="/stories" className={css.btn}>Назад до історій</Link>
                    </div>
                    }
            </div>
        </section>
    )
}

export default OwnStories;