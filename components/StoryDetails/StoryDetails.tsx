import Image from "next/image";
import { Story } from "@/types/story";

interface StoryDetailsProps {
    story: Story;

}

export default function StoryDetails({ story }: StoryDetailsProps) {

    const handleSave = () => {
        console.log("Збереження історії:", story._id);
    }

    return (
        <div>
            <div>
                <span>
                    Автор статті:
                </span>
                <span>
                    {story.ownerId.name}
                </span>
            </div>
            <div>
                <span>
                    Опубліковано:
                </span>
                <span>
                    {story.createdAt}
                </span>
            </div>
            <div >
                {story.category.name}
            </div>
            <div >
                <Image
                    src={story.img}
                    alt={story.title}
                    width={800}
                    height={500}
                    style={{ width: '100%', height: 'auto' }}
                    priority
                />
            </div>
            <aside>
                <div>{story.article}</div>
                <div>
                    <h3>Збережіть собі історію</h3>
                    <p>
                        Вона буде доступна у вашому профілі у розділі збережене
                    </p>
                    <button onClick={handleSave}>
                        Зберегти
                    </button>
                </div>

            </aside>



        </div>
    )
}