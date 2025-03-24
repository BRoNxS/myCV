import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Download } from "lucide-react";
import certifications from "../json/certifications.json";
import angularImg from "../assets/certifications/angular.png";
import reactNativeImg from "../assets/certifications/react-native.png";
import frontEndImg from "../assets/certifications/frontend.png";
import cybersecurityImg from "../assets/certifications/cybersecurity.png";
import uiuxImg from "../assets/certifications/uiux.png";

const certificationsImages = {
    angular: angularImg,
    reactNative: reactNativeImg,
    frontEnd: frontEndImg,
    cybersecurity: cybersecurityImg,
    uiux: uiuxImg,
};

const CertificationsContent = () => {
    const [isSectionVisible, setSectionVisible] = useState(false);
    const [selectedCert, setSelectedCert] = useState(null);
    const directionRef = useRef(0);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setSectionVisible(entry.isIntersecting);
            if (entry.isIntersecting) {
                setSelectedCert(certifications[0]);
            } else {
                setSelectedCert(null);
            }
        }, { threshold: 0.1 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleCertClick = (cert) => {
        if (selectedCert && selectedCert.id === cert.id) return;

        let newDirection = 0;
        if (selectedCert !== null) {
            newDirection = selectedCert.id < cert.id ? 250 : -250;
        }

        directionRef.current = newDirection;
        setSelectedCert(cert);
    };

    return (
        <motion.div
            ref={sectionRef}
            id="certificationsContent"
            className="relative w-full h-[calc(100%+30px)] min-h-[600px] flex flex-col items-center justify-center px-6"
            initial="hidden"
            animate={isSectionVisible ? "visible" : "hidden"}
        >
            <AnimatePresence mode="wait">
                {isSectionVisible && (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl w-full"
                        initial={{opacity: 0}}
                        animate={{opacity: 1, transition: {staggerChildren: 0.2}}}
                        exit={{opacity: 0, transition: {duration: 0.3}}}
                    >
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                className="flex flex-col items-center p-6 rounded-2xl shadow-2xl w-full h-auto cursor-pointer"
                                initial={{opacity: 0, y: 0}}
                                animate={{opacity: 1, y: 0, transition: {delay: index * 0.2}}}
                                exit={{opacity: 0, y: -150, transition: {duration: 0.2}}}
                                whileHover={{scale: 1.03}}
                                transition={{duration: 0.2}}
                                onClick={() => handleCertClick(cert)}
                            >
                                <img
                                    src={certificationsImages[cert.imageKey]}
                                    alt={cert.title}
                                    className="w-full h-64 object-contain rounded-xl"
                                />
                                <p className="mt-5 text-m text-white font-montserrat">{cert.title}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: selectedCert ? 1 : 0}}
                exit={{opacity: 0}}
                className="w-full max-w-7xl my-6 relative flex items-center justify-center mt-20"
            >
                <div className="absolute inset-0 h-px bg-gradient-to-r from-[#00BFFF] to-[#20C997]"></div>

                {selectedCert && (
                    <div className="bg-black px-4 z-10 -translate-y-3 relative rounded-xl">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={`title-${selectedCert.id}`}
                                initial={{opacity: 0, y: 0}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: 0}}
                                transition={{duration: 0.2}}
                                className="text-white font-montserrat text-xl"
                            >
                                {selectedCert.title}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                )}
            </motion.div>


            <AnimatePresence mode="wait">
                {selectedCert && (
                    <motion.div
                        key={`cert-${selectedCert.id}`}
                        className="relative rounded-2xl shadow-lg max-w-5xl w-full text-center"
                        initial={{opacity: 0, x: directionRef.current}}
                        animate={{
                            opacity: 1,
                            x: 0,
                            transition: {duration: 0.5, ease: "easeOut"}
                        }}
                    >
                        <p className="text-white text-lg leading-relaxed font-montserrat">{selectedCert.description}</p>
                    </motion.div>
                )}
            </AnimatePresence>
            {selectedCert && (
                <div
                    className="relative mt-6 p-[1px] rounded-md bg-gradient-to-r from-[#00BFFF] to-[#20C997] w-fit transition-all duration-300">
                    <a
                        href={selectedCert.downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center text-white rounded-md bg-black p-2 transition-all duration-300 hover:bg-black/80"
                        title="Ver certificado"
                    >
                        <Download className="w-5 h-5"/>
                    </a>
                </div>


            )}
        </motion.div>
    );

};

export default CertificationsContent;
