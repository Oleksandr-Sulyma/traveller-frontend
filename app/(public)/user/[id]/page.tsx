"use client"

import TravellerInfo from "@/components/Profile/TravellerInfo/TravellerInfo";
import { useState } from "react";
import css from "./userProfile.module.css";
import OwnStories from "@/components/Profile/OwnStories/OwnStories";
import { Story } from "@/types/story";

const UserProfile = () => {
    const [ownUserStories, setSavedUserStories] = useState<Story[]>([])
    const [userData] = useState({
        imgLink:
          "https://png.pngtree.com/thumb_back/fh260/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg",
        name: "Анастасія Олійник",
        description:
          "Люблю активні подорожі та дослідження нових місць. Ділюся практичними порадами та маршрутами для мандрівників.",
    });
    return (
        <>
            <TravellerInfo {...userData} />
            <div className="container">
                <h2 className={css.title}>Історії Мандрівника</h2>
            </div>
            <OwnStories stories={ownUserStories} page='user' />
        </>
    );
}

export default UserProfile;