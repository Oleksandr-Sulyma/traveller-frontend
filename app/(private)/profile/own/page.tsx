"use client"
import { useState } from "react"
import OwnStories from "@/components/Profile/OwnStories/OwnStories"
import { Story } from "@/types/story"

const Saved = () => {
    const [ownUserStories, setSavedUserStories] = useState<Story[]>([])
    return (<OwnStories stories={ownUserStories} />)
}

export default Saved;