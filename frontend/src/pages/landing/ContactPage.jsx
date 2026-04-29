import React, { useState } from "react";
import ParticlesBackground from "../../components/ParticlesBackground";


const ContactPage = () => {
  const [status, setStatus] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    setStatus(
      "Thank you! Your message has been sent. We will get back to you soon."
    );
  };

  return (
    <section className="bg-gray-100 relative overflow-hidden">
        <ParticlesBackground />

      <div className="py-20 px-[50px] max-w-[1200px] mx-auto relative z-10">
        {/* Heading */}
        <h2 className="text-center mb-[7%] text-gray-800 text-8xl font-bold">
          Contact <span className="text-cyan-500">Us</span>
        </h2>

        {/* Two-column layout */}
        <div className="flex gap-[10%]">
          {/* Left column - Contact form */}
          <div className="flex-1 bg-gray-100 rounded-[10px] p-8">
            <h5 className="mt-8 mb-2 text-2xl font-medium text-gray-800">
              Get In <span className="text-green-500">Touch</span>
            </h5>
            <p className="mb-[5%] text-gray-600">
              Have a question about your prescription or our services? Drop us a
              message.
            </p>

            <form
              onSubmit={handleSendMessage}
              className="flex flex-col gap-4"
            >
              {/* Name field */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  placeholder="Alan Parish"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="alan.parish@gmail.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  How can we help you?
                </label>
                <textarea
                  placeholder="May I know your work hours?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition h-[150px] resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-48 bg-cyan-700 hover:bg-cyan-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 mt-2"
              >
                Send Message
              </button>
            </form>

            {/* Status message */}
            {status && (
              <p className="mt-5 text-green-600 font-medium">{status}</p>
            )}
          </div>

          {/* Right column - Location & Map */}
          <div className="flex-1 bg-gray-100 rounded-[10px] p-8 flex flex-col">
            <h5 className="mt-[6%] mb-[3%] text-2xl font-semibold text-gray-800">
              Our <span className="text-green-500">Locations</span>
            </h5>
            <p className="text-gray-700 mb-2">
              <span className="text-amber-500 font-semibold">Main Branch:</span> No 45, Galle Road, Colombo 03
            </p>
            <p className="text-gray-700 mb-[5%]">
              <span className="text-amber-500 font-semibold">Opening Hours:</span> 24/7 Service
            </p>

            {/* Map container */}
            <div className="w-full h-80 rounded-[10px] overflow-hidden mt-auto">
              <iframe
                title="Pharmacy Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.715862281761!2d79.9168989758489!3d6.804378575641825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae24ff780e34c45%3A0x3f29957eea6b86e4!2sMEDIHELP%20Hospitals%20-%20Piliyandala!5e0!3m2!1sen!2slk!4v1773914309497!5m2!1sen!2slk"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;