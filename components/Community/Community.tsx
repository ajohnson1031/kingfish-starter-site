"use client";

import { FC } from "react";
import CommunityCard from "../CommunityCard";
import { CommunityProps } from "./Community.types";

const Community: FC<CommunityProps> = ({ communityItems }) => {
  return (
    <div className="w-full md:w-3/4 flex flex-col items-center py-6 md:py-12 relative mx-auto text-white mt-10 md:gap-10">
      <div className="flex justify-end">
        <div className="py-6 px-4 md:px-0 md:pr-6">
          <h2 className="text-4xl font-bold">Community</h2>
          <p className="text-lg">
            <span className="text-orange-400">Join</span> Our Community
          </p>
          <p className="font-extralight py-4">
            At the heart of our community lies a profound belief in the decentralized and distributed nature of blockchain technology. We are united by the conviction that
            decentralized systems empower individuals, foster transparency, and promote inclusivity.
          </p>
          <p className="font-extralight pb-4">
            Our ethos is built on the idea that blockchain technology has the potential to revolutionize traditional systems by placing control back into the hands of the people.
            Decentralization democratizes finance, governance, and information exchange, and for those reasons, as we continue to grow, we'll remain committed to fostering a
            community where innovation thrives, and collaboration flourishes.
          </p>
          <p className="font-bold">If you love memes, crypto, and aquatic life, then join our vibrant community!</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {communityItems.map((item, i) => (
          <CommunityCard
            key={`${item.title}_${i}`}
            title={item.title}
            url={item.url}
            image={item.image}
            className="w-full md:w-1/3"
            description={item.description}
            buttonText={item.buttonText}
            bgcolor={item.bgcolor}
          />
        ))}
      </div>
    </div>
  );
};

export default Community;
