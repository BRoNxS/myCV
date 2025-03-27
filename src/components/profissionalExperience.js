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
        hidden: { opacity: 0, x: isLeft ? 150 : -150 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, x: isLeft ? -150 : 150, transition: { duration: 0.3 } },
    }),
    fadeInUp: (delay = 0) => ({
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4, delay } },
        exit: { opacity: 0, y: 30 },
    }),
    fadeInX: (isLeft, delay = 0) => ({
        initial: { opacity: 0, x: isLeft ? -150 : 150 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.5, delay } },
        exit: { opacity: 0, x: isLeft ? -150 : 150 },
    }),
};

const ProfessionalExperienceContent = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isBlinkingActive, setBlinkingActive] = useState(false);
    const [isTimelineVisible, setTimelineVisible] = useState(false);
    const [isSectionVisible, setSectionVisible] = useState(false);
    const [isInstructionVisible, setInstructionVisible] = useState(true);
    const sectionRef = useRef(null);

    const animationKey = isSectionVisible ? "visible" : "hidden";

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
            {typeof window !== "undefined" && window.innerWidth < 768 ? (
                <div className="flex flex-col gap-5 w-full max-w-sm">
                    {[...experiences].reverse().map((exp, index) => (
                        <motion.div
                            key={index}
                            className="bg-zinc-950 p-4 rounded-xl shadow-lg w-full"
                            initial="initial"
                            animate="animate"
                            variants={animations.fadeInUp(index * 0.2)}
                        >
                            <p className="text-lg font-bold mb-3 text-center">
                                {exp.month ? `${exp.month} ${exp.year}` : exp.year}
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 mb-4">
                                {exp.technologies.map((tech, idx) => (
                                    <div key={idx} className="flex flex-col items-center w-10 h-10">
                                        <img src={techIcons[tech.name]} alt={tech.name} className="w-full h-full object-contain" />
                                        <p className="text-xs mt-1">{tech.name}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-center mt-6">{exp.text}</p>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <>
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

                    <div className={`relative w-full max-w-md flex flex-col items-center mt-20 transition-opacity duration-500 ${isSectionVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                        <AnimatePresence>
                            {isTimelineVisible && (
                                <motion.div
                                    className="absolute left-1/2 w-[1px] bg-gradient-to-b from-white/10 via-white/90 to-white transform -translate-x-1/2 z-10 top-0 bottom-0"
                                    initial={{ height: 0 }}
                                    animate={{ height: "100%" }}
                                    exit={{ height: 0 }}
                                    transition={{ duration: 1 }}
                                />
                            )}
                        </AnimatePresence>

                        {[...experiences].reverse().map((exp, index) => {
                            const isLeft = index % 2 === 0;
                            const isActive = selectedIndex === index;

                            return (
                                <motion.div
                                    key={`block-${animationKey}-${index}`}
                                    className={`relative flex items-center mb-24 w-full z-10 ${isLeft ? "justify-start" : "justify-end"}`}
                                    variants={animations.fadeInUp(0.2)}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                >
                                    <motion.div
                                        className="w-5 h-5 rounded-full absolute left-[calc(50%-10px)] top-1/2 transform -translate-x-1/2 cursor-pointer z-30"
                                        style={{ background: "linear-gradient(to right, #00BFFF, #20C997)" }}
                                        onClick={() => handleDotClick(index)}
                                        variants={animations.fadeInUp(1.2)}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                    />

                                    {index === 0 && isBlinkingActive && selectedIndex === null && (
                                        <motion.div
                                            className="absolute w-7 h-7 rounded-full border border-white left-1/2 top-[calc(50%-4px)] transform -translate-x-1/2 pointer-events-none z-20"
                                            animate={animations.blinkEffect}
                                        />
                                    )}

                                    <motion.div
                                        key={`fade-${animationKey}-${index}`}
                                        className={`rounded-lg shadow-lg w-fit p-4 ${isLeft ? "ml-[330px]" : "mr-[330px]"}`}
                                        variants={animations.fadeInX(isLeft, 0.4)}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                    >
                                        <p className={`text-2xl w-80 font-montserrat ${isLeft ? "text-left" : "text-right"}`}>
                                            {exp.month ? `${exp.month} ${exp.year}` : exp.year}
                                        </p>
                                        <div className={`flex flex-wrap gap-x-6 gap-y-4 mt-5 ${isLeft ? "justify-start" : "justify-end"}`}>
                                            {exp.technologies.map((tech, idx) => (
                                                <motion.div
                                                    key={`icon-${animationKey}-${index}-${idx}`}
                                                    className="flex flex-col items-center w-10 h-10"
                                                    variants={animations.fadeInX(isLeft, 0.6 + idx * 0.1)}
                                                    initial="initial"
                                                    animate="animate"
                                                    exit="exit"
                                                >
                                                    <img src={techIcons[tech.name]} alt={tech.name} className="w-full h-full object-contain" />
                                                    <p className="text-sm font-montserrat mt-2">{tech.name}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.p
                                                className={`absolute w-80 rounded-lg shadow-lg text-white text-sm font-montserrat p-4 mt-4 ${isLeft ? "right-[330px] text-right" : "left-[330px] text-left"}`}
                                                variants={animations.textAnimation(isLeft)}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                            >
                                                {exp.text}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfessionalExperienceContent;
