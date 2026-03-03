"use client"
import SavedStories from "@/components/Profile/SavedStories/SavedStories"
import { Story } from "@/types/story";
import { useState } from "react"

export const storiesMock: Story[] = [
  {
    id: "2",
    title: "Understanding TypeScript Interfaces",
    article: "In this guide, we dive deep into TypeScript interfaces and how to use them effectively.",
    img: "https://picsum.photos/600/400?random=2",
    category: {
      id: "c2",
      name: "Programming"
    },
    ownerId: {
      id: "u2",
      name: "Anna Smith",
      avatarUrl: "https://i.pravatar.cc/150?img=2"
    },
    favoriteCount: 25,
    formattedDate: "01 Mar 2026",
    createdAt: "2026-03-01T09:30:00.000Z",
    updatedAt: "2026-03-01T09:30:00.000Z"
  },
  {
    id: "3",
    title: "Node.js REST API Best Practices",
    article: "Learn how to structure your Node.js REST API using best practices and clean architecture.",
    img: "https://picsum.photos/600/400?random=3",
    category: {
      id: "c3",
      name: "Backend"
    },
    ownerId: {
      id: "u3",
      name: "Michael Brown",
      avatarUrl: "https://i.pravatar.cc/150?img=3"
    },
    favoriteCount: 40,
    formattedDate: "28 Feb 2026",
    createdAt: "2026-02-28T14:15:00.000Z",
    updatedAt: "2026-02-28T14:15:00.000Z"
  },
  {
    id: "4",
    title: "CSS Grid vs Flexbox",
    article: "A comparison between CSS Grid and Flexbox to help you choose the right layout system.",
    img: "https://picsum.photos/600/400?random=4",
    category: {
      id: "c1",
      name: "Frontend"
    },
    ownerId: {
      id: "u4",
      name: "Emily Johnson",
      avatarUrl: "https://i.pravatar.cc/150?img=4"
    },
    favoriteCount: 18,
    formattedDate: "25 Feb 2026",
    createdAt: "2026-02-25T11:45:00.000Z",
    updatedAt: "2026-02-25T11:45:00.000Z"
  },
  {
    id: "5",
    title: "Introduction to Docker",
    article: "This article introduces Docker and explains how to containerize your applications.",
    img: "https://picsum.photos/600/400?random=5",
    category: {
      id: "c4",
      name: "DevOps"
    },
    ownerId: {
      id: "u5",
      name: "David Wilson",
      avatarUrl: "https://i.pravatar.cc/150?img=5"
    },
    favoriteCount: 33,
    formattedDate: "20 Feb 2026",
    createdAt: "2026-02-20T08:20:00.000Z",
    updatedAt: "2026-02-20T08:20:00.000Z"
  },
  {
    id: "6",
    title: "Web Security Basics",
    article: "An overview of the most common web security vulnerabilities and how to prevent them.",
    img: "https://picsum.photos/600/400?random=6",
    category: {
      id: "c5",
      name: "Security"
    },
    ownerId: {
      id: "u6",
      name: "Sophia Martinez",
      avatarUrl: "https://i.pravatar.cc/150?img=6"
    },
    favoriteCount: 51,
    formattedDate: "18 Feb 2026",
    createdAt: "2026-02-18T16:10:00.000Z",
    updatedAt: "2026-02-18T16:10:00.000Z"
  }
];

const Saved = () => {
    const [savedUserStories, setSavedUserStories] = useState(storiesMock)
    return (<SavedStories stories={savedUserStories} page="profile" />)
}

export default Saved;