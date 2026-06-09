import React from "react";

const ContactUsHero = () => {
  return (
    <section
      className={`w-full pt-40 pb-20 lg:pt-44 flex flex-col items-center justify-center gap-6 padding-x`}
    >
      <h1 className="font-bold text-4xl lg:text-[64px] mb-1 text-center tracking-normal leading-[1]">
        Great Things Start <br /> With a{" "}
        <span className="red-text">Conversation!</span>
      </h1>
      <p className="text-base lg:text-[24px] md:w-2/3 text-center 2xl:text-[30px] font-light leading-[1.1] text-gray-400 lg:w-[70%] xl:w-1/2">
        Let's start with a simple action. Share your idea with us, and we’ll
        help you make it amazing.
      </p>
    </section>
  );
};

export default ContactUsHero;
