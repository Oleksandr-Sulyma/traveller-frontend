"use client";

import ProfileNavigation from "@/components/Profile/ProfileNavigation/ProfileNavigation";
import TravellerInfo from "@/components/Profile/TravellerInfo/TravellerInfo";
import { useState } from "react";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const [userData] = useState({
    imgLink:
      "https://png.pngtree.com/thumb_back/fh260/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg",
    name: "Анастасія Олійник",
    description:
      "Люблю активні подорожі та дослідження нових місць. Ділюся практичними порадами та маршрутами для мандрівників.",
  });

  return (
    <div>
      <TravellerInfo {...userData} />
      <ProfileNavigation />
      <div>{children}</div>
    </div>
  );
}