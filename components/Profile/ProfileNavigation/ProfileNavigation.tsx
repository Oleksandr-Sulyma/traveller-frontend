import css from "./ProfileNavigation.module.css"
import { usePathname } from "next/navigation";
import Link from "next/link";

const ProfileNavigation = () => {
    const pathname = usePathname();

    const isSaved = pathname.includes("/profile/saved");
    const isOwn = pathname.includes("/profile/own");
    return (
        <section>
            <div className="container">
                <div className={css.div}>
                     <Link
                        href="/profile/saved"
                        className={`${css.link} ${isSaved ? css.active : ""}`}
                    >
                        Збережені історії
                    </Link>

                    <Link
                        href="/profile/own"
                        className={`${css.link} ${isOwn ? css.active : ""}`}
                    >
                        Мої історії
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ProfileNavigation;