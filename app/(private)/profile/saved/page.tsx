"use client"
import SavedStories from "@/components/Profile/SavedStories/SavedStories"
import { useState } from "react"

const Saved = () => {
    const [savedUserStories, setSavedUserStories] = useState([])
    return (<SavedStories stories={savedUserStories} page="profile" />)
}

export default Saved;