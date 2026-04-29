import React from "react";
import { FaFileMedical, FaSyringe, FaTruckMoving, FaChalkboardTeacher, FaWifi, FaGift } from "react-icons/fa";
import ParticlesBackground from "../../components/ParticlesBackground";


const ServicesPage = () => {
  const services = [
    {
      title: "Prescription Refills",
      desc: "Bring the prescription your doctor provided, and get your refills processed in minutes.",
      icon: <FaFileMedical size={40} className="text-amber-500" />,
    },
    {
      title: "Vaccinations",
      desc: "Schedule your flu shots or travel vaccines with our certified pharmacists.",
      icon: <FaSyringe size={40} className="text-amber-500" />,
    },
    {
      title: "Health Consultations",
      desc: "Private one-on-one consultations to discuss your medication and wellness.",
      icon: <FaChalkboardTeacher size={40} className="text-amber-500" />,
    },
    {
      title: "Online Orders",
      desc: "Easily upload your prescription and get your refills processed in minutes.",
      icon: <FaWifi size={40} className="text-amber-500" />,
    },
    {
      title: "Home Delivery",
      desc: "Now we offer island-wide Free delivery for orders above Rs. 5000. Fast and secure.",
      icon: <FaTruckMoving size={40} className="text-amber-500" />,
    },
    {
      title: "Loyalty Offers",
      desc: "Become one of our loyalty customer community and get opportunity to earn promotional and seasonal loyalty rewards.",
      icon: <FaGift size={40} className="text-amber-500" />,
    },
  ];

  return (
    <section className="pb-20 px-[50px] bg-gray-100 relative overflow-hidden">
      
      <ParticlesBackground />

      {/* Section Header */}
      <div className="relative z-10">
        <div className="text-center mb-16 py-[10%] px-[5%]">
          <h2 className="text-gray-800 text-8xl font-bold mb-3">
            All Available <span className="text-cyan-500">Services</span>
          </h2>
          <h2 className="text-green-500 text-8xl font-bold mb-4">
            Just for You!
          </h2>
          <p className="text-gray-500">Comprehensive healthcare solutions tailored for you.</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[30px] max-w-[1200px] mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col p-10 bg-white rounded-[15px] text-center items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.05)] 
                        transition-transform duration-300 ease-in-out hover:-translate-y-2.5"
            >
              <div className="mb-5">{service.icon}</div>
              <h6 className="text-cyan-800 text-xl font-bold mb-4">{service.title}</h6>
              <p className="text-gray-600 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;