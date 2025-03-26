import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import experiences from "../json/experience.json";
import jsLogo from "../assets/icons/js.svg";
import htmlLogo from "../assets/icons/html.svg";
import cssLogo from "../assets/icons/css.svg";
import jqueryLogo from "../assets/icons/jquery.svg";
import javaLogo from "../assets/icons/java.svg";
import angularLogo from "../assets/icons/angular.svg";

const techIcons = {
    JavaScript: jsLogo,
    HTML: htmlLogo,
    CSS: cssLogo,
    JQuery: jqueryLogo,
    Java: javaLogo,
    Angular: angularLogo,
};

const animations = {
    blinkEffect: {
        opacity: [0, 1, 0],
        transition: { duration: 1.2, repeat: Infinity },
    },
    textAnimation: (isLeft) => ({
        hidden: { opacity: 0, x: isLeft ? 50 : -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, x: isLeft ? -50 : 50, transition: { duration: 0.3 } },
    }),
    fadeInUp: (delay = 0) => ({
        initial: { opacity: 0, y: 0 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 0 },
        transition: { duration: 0.01, delay },
    }),
    fadeInX: (isLeft, delay = 0) => ({
        initial: { opacity: 0, x: isLeft ? -50 : 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: isLeft ? -50 : 50 },
        transition: { duration: 0.2, delay },
    }),
};

const ProfessionalExperienceContent = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isBlinkingActive, setBlinkingActive] = useState(false);
    const [isTimelineVisible, setTimelineVisible] = useState(false);
    const [isSectionVisible, setSectionVisible] = useState(false);
    const sectionRef = useRef(null);

    const [isInstructionVisible, setInstructionVisible] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setSectionVisible(true);
                setTimeout(() => setTimelineVisible(true), 10);
                setTimeout(() => setBlinkingActive(true), 1500);
                setInstructionVisible(true);
            } else {
                setTimelineVisible(false);
                setSectionVisible(false);
                setBlinkingActive(false);
                setSelectedIndex(null);
                setInstructionVisible(false);
            }
        }, { threshold: 0 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleDotClick = (index) => {
        const newIndex = index === selectedIndex ? null : index;
        setSelectedIndex(newIndex);
        if (newIndex !== null) {
            setBlinkingActive(false);
        }
    };

    return (
        <div ref={sectionRef} id="professionalExperienceContent" className="relative flex flex-col items-center min-h-screen bg-black text-white p-6 w-full">
            {isInstructionVisible && selectedIndex === null && (
                <motion.p
                    className="text-base sm:text-lg md:text-xl font-montserrat text-white absolute top-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Clique nas bolinhas para ver os detalhes
                </motion.p>
            )}

            <AnimatePresence>
                {isTimelineVisible && (
                    <motion.div
                        className="absolute left-1/2 w-[1px] bg-gradient-to-b from-white via-white via-[80%] to-transparent transform -translate-x-1/2 z-10 top-20 bottom-0"
                        initial={{height: 0}}
                        animate={{height: "100%"}}
                        exit={{height: 0}}
                        transition={{duration: 1}}
                    />

                )}
            </AnimatePresence>
                <div
                    className={`relative w-full max-w-md flex flex-col items-center mt-20 transition-opacity duration-500 ${
                        isSectionVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                >

                    {experiences.map((exp, index) => {
                        const isLeft = index % 2 === 0;
                        const isActive = selectedIndex === index;

                        return (
                            <motion.div
                                key={index}
                                className={`relative flex items-center mb-16 sm:mb-24 md:mb-32 w-full z-10 ${isLeft ? "justify-start" : "justify-end"}`}
                                {...animations.fadeInUp(0)}
                            >

                                <motion.div
                                    className="w-5 h-5 rounded-full absolute left-[calc(50%-10px)] top-1/2 transform -translate-x-1/2 cursor-pointer z-30"
                                    style={{background: "linear-gradient(to right, #00BFFF, #20C997)"}}
                                    onClick={() => handleDotClick(index)} {...animations.fadeInUp(1.2)} />
                                {index === 0 && isBlinkingActive && selectedIndex === null && (
                                    <motion.div
                                        className="absolute w-7 h-7 rounded-full border border-white left-1/2 top-[calc(50%-4px)] transform -translate-x-1/2 pointer-events-none z-20"
                                        animate={animations.blinkEffect}/>
                                )}
                                <motion.div
                                    className={`rounded-lg shadow-lg w-fit p-2 sm:p-4 ${isLeft ? "ml-[240px] sm:ml-[240px] md:ml-[270px] lg:ml-[330px]" : "mr-[240px] sm:mr-[240px] md:mr-[270px] lg:mr-[330px]"}`} {...animations.fadeInX(isLeft, 1)}>
                                    <p className={`text-xl sm:text-2xl md:text-3xl w-64 sm:w-80 md:w-96 font-montserrat ${isLeft ? "text-left" : "text-right"}`}>
                                        {exp.month ? `${exp.month} ${exp.year}` : exp.year}
                                    </p>
                                    <div
                                        className={`flex flex-wrap gap-x-6 gap-y-4 mt-5 ${isLeft ? "justify-start" : "justify-end "}`}>
                                        {exp.technologies.map((tech, idx) => (
                                            <motion.div
                                                key={idx}
                                                className="flex flex-col items-center w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12"
                                                {...animations.fadeInX(isLeft, 1 + idx * 0.2)}
                                            >
                                                <img src={techIcons[tech.name]} alt={tech.name}
                                                     className="w-full h-full object-contain"/>
                                                <p className="text-xs sm:text-sm md:text-base font-montserrat mt-2 sm:mt-4">{tech.name}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.p
                                            className={`absolute w-56 sm:w-80 md:w-96 rounded-lg shadow-lg text-white text-xs sm:text-sm md:text-sm font-montserrat p-2 sm:p-4 mt-4 ${
                                                isLeft
                                                    ? "right-[220px] sm:right-[230px] md:right-[240px] lg:right-[330px] text-right"
                                                    : "left-[240px] sm:left-[230px] md:left-[240px] lg:left-[330px] text-left"
                                            }`}
                                            initial="hidden" animate="visible" exit="exit"
                                            variants={animations.textAnimation(isLeft)}>
                                            {exp.text}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
        </div>
    );
};

export default ProfessionalExperienceContent;
