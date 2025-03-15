import { motion } from "framer-motion";
import profilePic from "../assets/profilePic.jpg";

const ContactsContent = ({ controls }) => {
    return (
        <div id="contactsContent" className="relative w-full flex flex-col items-center">
            <motion.img
                src={profilePic}
                alt="Profissional experience Picture"
                className="w-[300px] h-[300px] rounded-full object-cover"
                animate={controls.imageContacts}
                initial={{ opacity: 0 }}
            />
            <p className="mt-5 text-lg text-gray-300 max-w-lg text-center">
                A passionate Computer Engineering student...
            </p>
        </div>
    );
};

export default ContactsContent;
