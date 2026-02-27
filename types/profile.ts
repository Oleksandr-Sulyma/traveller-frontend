import { Story } from "./story";

export interface TravellerInfoProps {
    imgLink: string,
    name: string,
    description: string
}

export interface SavedStoriesProps {
    stories: Story[];
}
