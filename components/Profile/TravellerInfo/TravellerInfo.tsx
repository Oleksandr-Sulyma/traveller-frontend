import { TravellerInfoProps } from "@/types/profile";
import css from "./TravellerInfo.module.css"

const TravellerInfo = (props: TravellerInfoProps) => {
    const { imgLink, name, description } = props

    return (
        <section>
            <div className={`${css.sectionContainer} container`} >
                <img className={css.img} src={imgLink} alt={name} />
                <div>
                    <h2 className={css.title}>{name}</h2>
                    <p className={css.text}>{description}</p>
                </div>
            </div>
        </section>
    )
}

export default TravellerInfo;