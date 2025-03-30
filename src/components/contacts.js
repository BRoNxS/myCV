import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import {
    FiUser,
    FiMail,
    FiMessageSquare,
    FiPhone,
    FiDownload,
} from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// EmailJS configs
const PUBLIC_KEY = "Fm4CiN7G-6rOIWqQh";
const SERVICE_ID = "bruno_santos";
const TEMPLATE_ID = "template_zbxwdle";

const ContactsContent = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [focusedField, setFocusedField] = useState(null);
    const [status, setStatus] = useState(null);
    const [errors, setErrors] = useState({ name: "", email: "", message: "" });

    useEffect(() => {
        emailjs.init(PUBLIC_KEY);
    }, []);

    useEffect(() => {
        if (Object.values(errors).some((err) => err !== "")) {
            const timeout = setTimeout(() => {
                setErrors({ name: "", email: "", message: "" });
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [errors]);

    useEffect(() => {
        if (status) {
            const timeout = setTimeout(() => setStatus(null), 5000);
            return () => clearTimeout(timeout);
        }
    }, [status]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleFocus = (field) => setFocusedField(field);
    const handleBlur = () => setFocusedField(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(null);

        const newErrors = {
            name: formData.name.trim() === "" ? "Name is required." : "",
            email: formData.email.trim() === "" ? "Email is required." : "",
            message: formData.message.trim() === "" ? "Message is required." : "",
        };
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error !== "");
        if (hasErrors) {
            setStatus("incomplete");
            return;
        }

        emailjs
            .send(SERVICE_ID, TEMPLATE_ID, {
                name: formData.name,
                email: formData.email,
                message: formData.message,
            })
            .then(() => {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
                setErrors({});
            })
            .catch((err) => {
                console.error("Erro ao enviar email:", err);
                setStatus("error");
            });
    };

    return (
        <div
            id="contactsContent"
            className="relative w-full flex flex-col items-center justify-center min-h-screen font-montserrat bg-black px-4 sm:px-6 md:px-12 py-10"
        >
            <div className="w-full max-w-5xl flex flex-col md:flex-row gap-10">
                {/* Formulário */}
                <form onSubmit={handleSubmit} className="relative w-full md:w-2/3 shadow-xl p-4 sm:p-6">
                    <div className="flex flex-col md:flex-row w-full gap-6 md:gap-10">
                        <div className="w-full md:w-1/2 flex flex-col gap-4">
                            <div className="relative flex flex-col min-h-[80px]">
                                <div className="flex items-center h-14 border-b border-gray-500 focus-within:border-white">
                                    <FiUser
                                        className={`mr-2 ${focusedField === "name" ? "text-white" : "text-gray-400"}`}
                                    />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus("name")}
                                        onBlur={handleBlur}
                                        placeholder="Your name"
                                        className="w-full bg-transparent text-white outline-none placeholder-gray-500 h-full text-sm sm:text-base"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="absolute text-red-500 text-sm mt-1 top-[58px]">{errors.name}</p>
                                )}
                            </div>

                            <div className="relative flex flex-col min-h-[80px]">
                                <div className="flex items-center h-14 border-b border-gray-500 focus-within:border-white">
                                    <FiMail
                                        className={`mr-2 ${focusedField === "email" ? "text-white" : "text-gray-400"}`}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus("email")}
                                        onBlur={handleBlur}
                                        placeholder="Your email"
                                        className="w-full bg-transparent text-white outline-none placeholder-gray-500 h-full text-sm sm:text-base"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="absolute text-red-500 text-sm mt-1 top-[58px]">{errors.email}</p>
                                )}
                            </div>
                        </div>

                        {/* Mensagem */}
                        <div className="relative flex flex-col min-h-[100px] w-full md:w-1/2">
                            <div className="flex items-start h-[150px] border-b border-gray-500 focus-within:border-white pt-4">
                                <FiMessageSquare
                                    className={`mr-2 mt-1 ${focusedField === "message" ? "text-white" : "text-gray-400"}`}
                                />
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus("message")}
                                    onBlur={handleBlur}
                                    placeholder="Your message"
                                    rows="4"
                                    className="w-full bg-transparent text-white outline-none placeholder-gray-500 h-full text-sm sm:text-base resize-none"
                                />
                            </div>
                            {errors.message && (
                                <p className="absolute text-red-500 text-sm mt-1 top-[155px]">{errors.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Status */}
                    {status === "success" && (
                        <p className="text-green-400 text-sm mt-6 text-center">Message sent successfully!</p>
                    )}
                    {status === "error" && (
                        <p className="text-red-500 text-sm mt-6 text-center">
                            Failed to send message. Please call me or email: bruno.santos.career@gmail.com
                        </p>
                    )}

                    {/* Botão Enviar */}
                    <div className="relative mt-12 p-[1px] rounded-md bg-gradient-to-r from-[#00BFFF] to-[#20C997] w-fit mx-auto sm:mx-0 sm:ml-auto">
                        <button
                            type="submit"
                            className="relative text-white bg-black rounded-md px-6 py-3 hover:bg-black/80 transition duration-300 ease-in-out text-sm sm:text-base"
                        >
                            Send Message
                        </button>
                    </div>
                </form>

                {/* Linha horizontal visível apenas em dispositivos pequenos */}
                <div className="block md:hidden h-px my-2 bg-gradient-to-r from-[#00BFFF] to-[#20C997] w-[90%] mx-auto"/>

                {/* Linha vertical visível apenas em dispositivos médios e maiores */}
                <div className="hidden md:block w-px bg-gradient-to-b from-[#00BFFF] to-[#20C997]" />

                {/* Contact Info + Socials */}
                <div className="w-full md:w-1/3 p-0 sm:p-0 rounded-2xl flex flex-col justify-center items-center text-center min-h-[200px]">
                    <div className="flex-1 flex flex-col justify-center items-center gap-4">
                        <div className="flex items-center gap-2">
                            <FiPhone className="text-white text-xl" />
                            <h3 className="text-base sm:text-lg text-white">Call me:</h3>
                        </div>
                        <p className="text-base sm:text-lg text-white underline-offset-2 hover:underline cursor-pointer">
                            <a href="tel:+351918432080">+351 918432080</a>
                        </p>

                        {/* Redes sociais com estilo de botão */}
                        <div className="mt-6 flex items-center gap-4">
                            {/* GitHub */}
                            <a
                                href="https://github.com/Brun0Sant0s"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-[1px] rounded-md bg-gradient-to-r from-[#00BFFF] to-[#20C997] transition duration-300"
                            >
                                <div className="flex items-center justify-center bg-black rounded-md p-2 hover:bg-black/80 transition duration-300">
                                    <FaGithub className="text-white w-5 h-5" />
                                </div>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/in/bruno-santos-a8560221a/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-[1px] rounded-md bg-gradient-to-r from-[#00BFFF] to-[#20C997] transition duration-300"
                            >
                                <div className="flex items-center justify-center bg-black rounded-md p-2 hover:bg-black/80 transition duration-300">
                                    <FaLinkedin className="text-white w-5 h-5" />
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="mt-10 p-[1px] rounded-md bg-gradient-to-r from-[#00BFFF] to-[#20C997] w-fit text-sm">
                        <a
                            href={`${process.env.PUBLIC_URL}/documents/CV_BRUNO_EN.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative text-white bg-black rounded-md px-6 py-3 flex items-center gap-2 hover:bg-black/80 transition duration-300 ease-in-out text-sm sm:text-base"
                        >
                            <FiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                            Download CV
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactsContent;
