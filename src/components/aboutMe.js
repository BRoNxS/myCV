import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import profilePic from "../assets/profilePic.jpg";

const imageVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const textVariants = {
    hidden: { opacity: 0, y: 150 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut", delay: 0.3 },
    },
};

const AboutMeContent = () => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                } else {
                    setInView(false);
                }
            },
            { threshold: 0.2 }
        );

        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <div
            ref={ref}
            id="aboutMeContent"
            className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black px-4 sm:px-6 md:px-12 py-10 sm:py-16 md:py-20"
        >
            <motion.div
                className="flex flex-col items-center text-center max-w-xl sm:max-w-2xl md:max-w-3xl w-full"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                <motion.div variants={imageVariants}>
                    <div className="p-[3px] rounded-full bg-gradient-to-r from-[#00BFFF] to-[#20C997]">
                        <div className="rounded-full overflow-hidden bg-black">
                            <img
                                src={profilePic}
                                alt="Profile Picture"
                                className="w-32 h-32 sm:w-40 sm:h-40 md:w-60 md:h-60 rounded-full object-cover"
                            />
                        </div>
                    </div>
                </motion.div>



                <motion.p
                    variants={textVariants}
                    className="mt-6 sm:mt-8 md:mt-10 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-montserrat font-light leading-relaxed px-4 md:px-8"
                >
                    I'm currently studying Computer Engineering at ESTiG and since 2021 I've been working as a Front-End Developer at ePharma. Most of my work revolves around JavaScript, jQuery, HTML and CSS. Along the way, I picked up some basic Java and even worked on a project with Angular. I've been in an Agile environment (Scrum) from the start, using Azure DevOps and Git pretty much every day.

                    Outside of work, I’m really into sports, gaming, and watching TV shows. it’s how I chill and disconnect a bit. I’m also always looking to learn something new, especially when it comes to front-end or anything dev-related. There’s always something cool to dig into.                </motion.p>
            </motion.div>
        </div>
    );
};

export default AboutMeContent;
