import React, { useState } from "react";
import { Mail, Phone, Linkedin, Github, MapPin } from "lucide-react";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = { name, email, message };

    try {
      const response = await fetch("https://content-backend-r494.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      await response.json();
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error: any) {
      console.error("❌ Error:", error);
      setStatus("error");
      setErrorMsg(error.message || "Something went wrong");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="mt-14 max-w-6xl mx-auto px-4 min-h-screen  ">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        Contact Us
      </h2>

      <div className="grid md:grid-cols-2 gap-2 bg-white rounded-2xl  shadow-lg p-10 sm:gap-4 border border-gray-200 ">
        {/* Left Column - User Details */}
        <div className="space-y-5 mt-4 flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Get in Touch</h3>
          <div className="flex items-center space-x-3 text-gray-700">
            <a
              href="mailto:singhanshuman8182@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <Mail className="w-5 h-5 text-indigo-600" />
              <span>singhanshuman8182@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <Phone className="w-5 h-5 text-indigo-600" />
            <span>+91 8182002268</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <Linkedin className="w-5 h-5 text-indigo-600" />
            <a
              href="https://linkedin.com/in/ansingh14"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <Github className="w-5 h-5 text-indigo-600" />
            <a
              href="https://github.com/14anshuman"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Github
            </a>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <a
              href="https://maps.app.goo.gl/f5a5uJaB6pioWtPr5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <MapPin className="w-5 h-5 text-indigo-600" />
              <span>Kanpur Nagar, India</span>
            </a>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="flex flex-col mt-4">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              rows={4}
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full py-2 rounded-xl text-white font-medium transition ${
                status === "loading"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90"
              }`}
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {/* Status message with reserved space */}
            <p className="mt-2 text-center text-sm min-h-[1.25rem] transition-all">
              {status === "success" && <span className="text-green-600 font-semibold text-xl">Message sent successfully!</span>}
              {status === "error" && <span className="text-red-600 font-medium">{errorMsg}</span>}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
