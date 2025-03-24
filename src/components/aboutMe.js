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
            className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black px-4 py-10"
        >
            <motion.div
                className="flex flex-col items-center text-center max-w-3xl w-full"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                <motion.div variants={imageVariants}>
                    <div className="p-[3px] rounded-full bg-gradient-to-r from-[#00BFFF] to-[#20C997]">
                        <div className="rounded-full overflow-hidden bg-black">
                            <img
                                src={profilePic}
                                alt="Profile Picture"
                                className="w-40 h-40 md:w-60 md:h-60 rounded-full object-cover"
                            />
                        </div>
                    </div>
                </motion.div>

                <motion.h2
                    variants={textVariants}
                    className="text-3xl md:text-5xl text-white mt-6 font-montserrat font-light"
                >
                    Bruno Santos, 26
                </motion.h2>

                <motion.p
                    variants={textVariants}
                    className="mt-6 text-lg text-gray-300 font-montserrat font-light leading-relaxed"
                >
                    I’m a Computer Engineering student at the School of Technology and Management in Bragança,
                    passionate about innovation and continuous learning. I thrive on challenges, quickly adapt to new
                    technologies, and always aim to deliver efficient and creative solutions.
                </motion.p>
            </motion.div>
        </div>
    );
};

export default AboutMeContent;
