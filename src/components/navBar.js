import { FiUser, FiBriefcase, FiPhone, FiFile } from "react-icons/fi";
import { useState } from "react";
import logo from "../assets/logo.png";
import "../styles/global.css";

const NavBar = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav
            className="fixed bottom-14 left-14 z-10 flex flex-col items-center w-24 pt-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative flex flex-col items-center gap-5 w-full py-4">
                <FiUser
                    className={`text-xl text-white cursor-pointer transition-all duration-500 transform ${
                        isHovered ? "translate-y-[-10px] opacity-100" : "translate-y-[80px] opacity-0"
                    }`}
                    onClick={() => scrollToSection("aboutMeText")}
                />
                <FiBriefcase
                    className={`text-xl text-white cursor-pointer transition-all duration-500 transform ${
                        isHovered ? "translate-y-[-10px] opacity-100" : "translate-y-[80px] opacity-0"
                    }`}
                    onClick={() => scrollToSection("professionalExperienceText")}
                />
                <FiFile
                    className={`text-xl text-white cursor-pointer transition-all duration-500 transform ${
                        isHovered ? "translate-y-[-10px] opacity-100" : "translate-y-[80px] opacity-0"
                    }`}
                    onClick={() => scrollToSection("certificationsText")}
                />
                <FiPhone
                    className={`text-xl text-white cursor-pointer transition-all duration-500 transform ${
                        isHovered ? "translate-y-[-10px] opacity-100" : "translate-y-[80px] opacity-0"
                    }`}
                    onClick={() => scrollToSection("contactsText")}
                />
                <img
                    src={logo}
                    alt="Logo"
                    className="h-24 w-24 cursor-pointer transition-transform duration-700 ease-in-out"
                    style={{ transform: isHovered ? "rotate(-177deg)" : "rotate(3deg)" }}
                />
            </div>
        </nav>
    );
};

export default NavBar;