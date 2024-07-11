"use client"




import React, { useState } from 'react';
import Link from "next/link";
import { Spotlight } from "./ui/Spotlight";
import { Button } from "./ui/moving-border";
import SignupFormPopup from "./SignupFormPopup";  // Import the SignupFormPopup component
import Image from 'next/image';

const HeroSection: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupVisible(true);
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className="flex items-center p-16 rounded-lg relative">
        <div className="flex-1 relative top-[3rem] left-[12rem]">
          <h1 className="text-6xl font-bold mb-4">Let's Learn</h1>
          <h2 className="text-6xl font-bold mb-4"> & Earn</h2>
          <p className="text-xl mt-8">Get a chance to win</p>
          <p className="text-xl mb-14">
            up-to <span className="text-2xl text-blue-500">Rs. 15,000</span>
          </p>
          <Button
            borderRadius="1.75rem"
            className="bg-blue-500 dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
            onClick={handlePopupOpen}
          >
            Refer Now
          </Button>
        </div>
        <div className="flex-1 relative top-[3rem] right-[4rem]">
          <Image src="/refer_earn.png" alt="Students with smartphone" className="w-full h-auto" />
        </div>
      </div>
      <SignupFormPopup isVisible={isPopupVisible} onClose={handlePopupClose} />
    </>
  );
}

export default HeroSection;

