import { motion } from "framer-motion";
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
    const [animationKey, setAnimationKey] = useState(0);
    const [certsAnimated, setCertsAnimated] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            const visible = entry.isIntersecting;
            setSectionVisible(visible);

            if (visible) {
                setSelectedCert((prev) => prev || certifications[0]);
                setAnimationKey((prev) => prev + 1);
                setCertsAnimated(false);
            }
        }, { threshold: 0.2 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleCertClick = (cert) => {
        if (selectedCert && selectedCert.id === cert.id) return;
        setSelectedCert(cert);
    };

    return (
        <div
            ref={sectionRef}
            id="certificationsContent"
            className="relative w-full min-h-[1100px] flex flex-col items-center justify-center px-4 sm:px-6 md:px-10"
        >
            <motion.div
                key={`certs-${animationKey}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isSectionVisible ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className={`w-full flex flex-col items-center transition-opacity duration-500 ${
                    isSectionVisible ? "pointer-events-auto" : "pointer-events-none"
                }`}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl w-full">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={`${animationKey}-${cert.id}`}
                            className="flex flex-col items-center p-4 sm:p-5 md:p-6 rounded-2xl  w-full h-auto cursor-pointer"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.4 }}
                            onAnimationComplete={() => {
                                if (index === certifications.length - 1) {
                                    setCertsAnimated(true);
                                }
                            }}
                            onClick={() => handleCertClick(cert)}
                        >
                            <img
                                src={certificationsImages[cert.imageKey]}
                                alt={cert.title}
                                className="w-full h-40 sm:h-52 md:h-60 lg:h-64 object-contain rounded-xl"
                            />
                            <p className="mt-4 text-sm sm:text-base md:text-lg text-white font-montserrat text-center">
                                {cert.title}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="w-full max-w-7xl my-6 relative flex items-center justify-center mt-20 px-4 min-h-[64px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: certsAnimated ? 1 : 0, y: certsAnimated ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="absolute inset-0 h-px bg-gradient-to-r from-[#00BFFF] to-[#20C997]" />
                    <div className="bg-black px-3 py-1 z-10 -translate-y-3 relative rounded-xl min-h-[40px] flex items-center justify-center">
                        <span className="text-white font-montserrat text-base sm:text-lg md:text-xl">
                            {selectedCert?.title || "placeholder"}
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    key={`desc-${selectedCert?.id || "placeholder"}`}
                    className="relative rounded-2xl shadow-lg max-w-5xl w-full text-center px-4 min-h-[100px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: certsAnimated ? 1 : 0, y: certsAnimated ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <p className="text-white text-base sm:text-lg leading-relaxed font-montserrat">
                        {selectedCert?.description || "placeholder"}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: certsAnimated ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="relative mt-6 p-[1px] rounded-md bg-gradient-to-r from-[#00BFFF] to-[#20C997] w-fit min-h-[24px]"
                >
                    <a
                        href={selectedCert ? `${process.env.PUBLIC_URL}${selectedCert.downloadLink}` : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center text-white rounded-md bg-black p-2 sm:p-2.5 transition-all duration-300 ${
                            certsAnimated ? "hover:bg-black/80" : "opacity-0 pointer-events-none"
                        }`}
                        title="Ver certificado"
                    >
                        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CertificationsContent;
