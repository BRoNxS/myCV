import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import NavBar from "./components/navBar";
import AboutMeContent from "./components/aboutMe";
import ProfessionalExperienceContent from "./components/profissionalExperience";
import ContactsContent from "./components/contacts";
import CertificationsContent from "./components/certifications";

const Section = ({ id, children, className }) => (
    <div
        id={id}
        className={`relative w-full flex flex-col items-center justify-start text-center text-white ${className}`}
    >
        {children}
    </div>
);

const App = () => {
    const controls = {
        aboutMeLeft: useAnimation(),
        aboutMeRight: useAnimation(),
        aboutMeContent: useAnimation(),

        professionalExperienceLeft: useAnimation(),
        professionalExperienceRight: useAnimation(),
        professionalExperienceContent:useAnimation(),

        certificationsLeft: useAnimation(),
        certificationsRight: useAnimation(),
        certificationsContent: useAnimation(),

        contactsLeft: useAnimation(),
        contactsRight: useAnimation(),
        contactsContent: useAnimation(),
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const elements = {
                aboutMeText: document.getElementById("aboutMeText"),
                aboutMeContent: document.getElementById("aboutMeContent"),
                professionalExperienceText: document.getElementById("professionalExperienceText"),
                professionalExperienceContent: document.getElementById("professionalExperienceContent"),
                contactsText: document.getElementById("contactsText"),
                contactsContent: document.getElementById("contactsContent"),
                certificationsText: document.getElementById("certificationsText"),
                certificationsContent: document.getElementById("certificationsContent")
            };

            Object.keys(elements).forEach((key) => {
                switch (key) {
                    case "aboutMeText":
                        if (elements.aboutMeText) {
                            const progressAboutMe = Math.min(scrollY / viewportHeight, 1);
                            controls.aboutMeLeft.start({ x: `${-progressAboutMe * 100}vw`, transition: { duration: 0, ease: "easeInOut" } });
                            controls.aboutMeRight.start({ x: `${progressAboutMe * 100}vw`, transition: { duration: 0, ease: "easeInOut" } });
                        }
                        break;

                    case "aboutMeContent":
                        if (elements.aboutMeContent) {
                            const progressAboutMeContent = Math.min(scrollY / (viewportHeight/2), 1);
                            controls.aboutMeContent.start({ opacity: progressAboutMeContent, transition: { duration: 0, ease: "easeInOut" } });
                        }
                        break;

                    case "professionalExperienceText":
                        if (elements.professionalExperienceText) {
                            const sectionTopProfessionalExperience = elements.professionalExperienceText.offsetTop;
                            const sectionHeightProfessionalExperience = elements.professionalExperienceText.offsetHeight;
                            const progressProfessionalExperience = Math.max(0, Math.min((scrollY - sectionTopProfessionalExperience + viewportHeight) / sectionHeightProfessionalExperience, 1));
                            controls.professionalExperienceLeft.start({ x: `${(1 - progressProfessionalExperience) * -100}vw`, transition: { duration: 0, ease: "easeInOut" } });
                            controls.professionalExperienceRight.start({ x: `${(1 - progressProfessionalExperience) * 100}vw`, transition: { duration: 0, ease: "easeInOut" } });
                        }
                        break;

                    case "professionalExperienceContent":
                        if (elements.professionalExperienceContent) {
                            const exitProgressProfessionalExperienceText = Math.max(0, Math.min((scrollY - elements.professionalExperienceContent.offsetTop + viewportHeight) / elements.professionalExperienceContent.offsetHeight, 1));
                            const exitProgressProfessionalExperienceContent = Math.max(0, Math.min(((scrollY - elements.professionalExperienceContent.offsetTop + viewportHeight)) / elements.professionalExperienceContent.offsetHeight, 1));
                            if (exitProgressProfessionalExperienceText > 0) {
                                controls.professionalExperienceContent.start({ opacity: exitProgressProfessionalExperienceContent, transition: { duration: 0, ease: "easeInOut" } });
                                controls.professionalExperienceRight.start({ x: `${-exitProgressProfessionalExperienceText * 100}vw`, transition: { duration: 0, ease: "easeInOut" } });
                                controls.professionalExperienceLeft.start({ x: `${exitProgressProfessionalExperienceText * 100}vw`, transition: { duration: 0, ease: "easeInOut" } });
                            }
                        }
                        break;

                    case "certificationsText":
                        if (elements.certificationsText) {
                            const progressCertifications = Math.max(0, Math.min((scrollY - elements.certificationsText.offsetTop + viewportHeight) / elements.certificationsText.offsetHeight, 1));
                            controls.certificationsRight.start({ x: `${(1 - progressCertifications) * -100}vw`, transition: { duration: 0, ease: "easeInOut" } });
                            controls.certificationsLeft.start({ x: `${(1 - progressCertifications) * 100}vw`, transition: { duration: 0, ease: "easeInOut" } });
                        }
                        break;

                    case "certificationsContent":
                        if (elements.certificationsContent) {
                            const exitProgressCertificationsText = Math.max(0, Math.min((scrollY - elements.certificationsContent.offsetTop + viewportHeight) / elements.certificationsContent.offsetHeight, 1));
                            const exitProgressCertificationsContent = Math.max(0, Math.min(((scrollY - elements.certificationsContent.offsetTop + viewportHeight)/2) / elements.certificationsContent.offsetHeight, 1));
                            if (exitProgressCertificationsText > 0) {
                                controls.certificationsContent.start({ opacity: exitProgressCertificationsContent, transition: { duration: 0, ease: "easeOut" } });
                                controls.certificationsLeft.start({ x: `${-exitProgressCertificationsText * 100}vw`, transition: { duration: 0, ease: "easeInOut" } });
                                controls.certificationsRight.start({ x: `${exitProgressCertificationsText * 100}vw`, transition: { duration: 0, ease: "easeInOut" } });
                            }
                        }
                        break;


                    case "contactsText":
                        if (elements.contactsText) {
                            const progressContacts = Math.max(0, Math.min((scrollY - elements.contactsText.offsetTop + viewportHeight) / elements.contactsText.offsetHeight, 1));
                            controls.contactsLeft.start({ x: `${(1 - progressContacts) * -100}vw`, transition: { duration: 0, ease: "easeInOut" } });
                            controls.contactsRight.start({ x: `${(1 - progressContacts) * 100}vw`, transition: { duration: 0, ease: "easeInOut" } });
                        }
                        break;

                    case "contactsContent":
                        if (elements.contactsContent) {
                            const exitProgressContactsText = Math.max(0, Math.min((scrollY - elements.contactsContent.offsetTop + viewportHeight) / elements.contactsContent.offsetHeight, 1));
                            const exitProgressContactsContent = Math.max(0, Math.min(((scrollY - elements.contactsContent.offsetTop + viewportHeight)) / elements.contactsContent.offsetHeight, 1));
                            if (exitProgressContactsText > 0) {
                                controls.contactsContent.start({ opacity: exitProgressContactsContent, transition: { duration: 0, ease: "easeOut" } });
                                controls.contactsRight.start({ x: `${-exitProgressContactsText * 100}vw`, transition: { duration: 0, ease: "easeInOut" } });
                                controls.contactsLeft.start({ x: `${exitProgressContactsText * 100}vw`, transition: { duration: 0, ease: "easeInOut" } });
                            }
                        }
                        break;
                }
            });

        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [controls]);

    return (
        <div className="bg-black overflow-x-hidden">
            <NavBar className="fixed bottom-5 left-5"/>

            {/*About Me*/}
            <Section id="aboutMeText" className="h-screen flex flex-col justify-center">
                <motion.div
                    className="glow-text  flex flex-col items-center text-4xl md:text-6xl lg:text-7xl xl:text-[6rem] 2xl:text-[8rem] font-syncopate">
                    <motion.span animate={controls.aboutMeLeft} initial={{x: 0, opacity: 1}}>About</motion.span>
                    <motion.span animate={controls.aboutMeRight} initial={{x: 0, opacity: 1}}>Me</motion.span>
                </motion.div>
            </Section>
            <AboutMeContent controls={controls}/>
            {/*About Me*/}
            {/*-----------------------------------------------------------------------------------------------------------------------------------*/}
            {/*Profissional Experience*/}
            <Section id="professionalExperienceText" className="h-screen flex flex-col justify-center">
                <motion.div
                    className="glow-text  flex flex-col items-center text-4xl md:text-6xl lg:text-7xl xl:text-[6rem] 2xl:text-[8rem] font-syncopate">
                    <motion.span animate={controls.professionalExperienceLeft} initial={{x: "-100vw", opacity: 1}}>Professional
                    </motion.span>
                    <motion.span animate={controls.professionalExperienceRight} initial={{x: "100vw", opacity: 1}}>Experience
                    </motion.span>
                </motion.div>
            </Section>
            <ProfessionalExperienceContent controls={controls}/>
            {/*Professional Experience*/}
            {/*-----------------------------------------------------------------------------------------------------------------------------------*/}
            {/*Certifications*/}
            <Section id="certificationsText" className="h-screen flex flex-col justify-center">
                <motion.div
                    className="glow-text  flex flex-col items-center text-4xl md:text-6xl lg:text-7xl xl:text-[6rem] 2xl:text-[8rem] font-syncopate">
                    <motion.span animate={controls.certificationsLeft} initial={{x: "-100vw", opacity: 1}}>My
                    </motion.span>
                    <motion.span animate={controls.certificationsRight}
                                 initial={{x: "100vw", opacity: 1}}>Certifications
                    </motion.span>
                </motion.div>
            </Section>
            <CertificationsContent controls={controls}/>
            {/*Certifications*/}
            {/*-----------------------------------------------------------------------------------------------------------------------------------*/}
            {/*Contacts*/}
            <Section id="contactsText" className="h-screen flex flex-col justify-center">
                <motion.div
                    className="glow-text  flex flex-col items-center text-4xl md:text-6xl lg:text-7xl xl:text-[6rem] 2xl:text-[8rem] font-syncopate">
                    <motion.span animate={controls.contactsLeft} initial={{x: "-100vw", opacity: 1}}>My</motion.span>
                    <motion.span animate={controls.contactsRight} initial={{x: "100vw", opacity: 1}}>Contacts
                    </motion.span>
                </motion.div>
            </Section>
            <ContactsContent controls={controls}/>
            {/*Contacts*/}
        </div>
    );
};

export default App;