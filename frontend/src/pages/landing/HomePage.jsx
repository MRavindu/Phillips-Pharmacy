import React from "react";
import {
  FaBaby,
  FaBriefcaseMedical,
  FaCapsules,
  FaClock,
  FaCross,
  FaHeart,
  FaMoneyBill,
  FaMoneyBillAlt,
  FaPills,
  FaPrescriptionBottle,
  FaPrescriptionBottleAlt,
  FaPumpMedical,
  FaRegHeart,
  FaShieldAlt,
  FaTruckLoading,
  FaTruckMoving,
} from "react-icons/fa";

import ParticlesBackground from "../../components/ParticlesBackground";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col gap-10 bg-cyan-100 pb-20 relative overflow-hidden">        
        <ParticlesBackground />
        <div className="relative z-10">
          <div className="flex items-center justify-between px-25 gap-25">
            {/* Left side column */}
            <div className="flex flex-col gap-6 ">
              <h1 className="text-8xl font-bold text-gray-800">
                Your Health, <span className="text-cyan-500">Our Priority.</span>
              </h1>
              <p className="text-lg text-gray-600">
                Get authentic medicines, health supplements, and medical equipment
                delivered to your doorstep. Licensed pharmacy with 24/7 support.
              </p>
              <div className="flex gap-5">
                <button className="px-5 py-2 bg-cyan-800 text-white rounded-lg hover:bg-cyan-600 font-medium">
                  Shop Now
                </button>
                <button className="px-5 py-2 font-medium bg-white border border-cyan-600 text-neutral-600 rounded-lg hover:text-cyan-600">
                  Find Medicines
                </button>
              </div>
              <div className="flex gap-20">
                <div>
                  <p className="font-medium text-4xl text-yellow-500">10K+</p>
                  <p>Happy Customers</p>
                </div>
                <div>
                  <p className="font-medium text-4xl text-green-500">5000+</p>
                  <p>Quality Products</p>
                </div>
                <div>
                  <p className="font-medium text-4xl text-blue-500">24/7</p>
                  <p>Customer Support</p>
                </div>
              </div>
            </div>

            {/* Right side column */}
            <div className="max-w-xl py-20">
              <img
                src="/images/hero-pharmacist.jpg"
                alt="Pharmacist"
                className="w-full rounded-2xl drop-shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex px-25 gap-15 justify-center items-center">
          <div className="flex flex-col items-center justify-center bg-white py-15 px-10 rounded-2xl drop-shadow-xl text-center">
            <FaShieldAlt className="text-2xl text-cyan-700 mb-4" />
            <h4 className="font-medium text-2xl text-cyan-700 mb-8 text-center">
              Safty First
            </h4>
            <p className="text-neutral-500 text-center">
              All medicines are licensed and verified
            </p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white py-15 px-10 rounded-2xl drop-shadow-xl text-center">
            <FaTruckLoading className="text-2xl text-cyan-700 mb-4" />
            <h4 className="font-medium text-2xl text-cyan-700 mb-8 text-center">
              Fast Delivery
            </h4>
            <p className="text-neutral-500 text-center">
              Same day delivery in major cities
            </p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white py-15 px-10 rounded-2xl drop-shadow-xl text-center">
            <FaClock className="text-2xl text-cyan-700 mb-4" />
            <h4 className="font-medium text-2xl text-cyan-700 mb-8 text-center">
              24/7 Support
            </h4>
            <p className="text-neutral-500 text-center">
              Round the clock customer support
            </p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white py-15 px-10 rounded-2xl drop-shadow-xl text-center">
            <FaMoneyBillAlt className="text-2xl text-cyan-700 mb-4" />
            <h4 className="font-medium text-2xl text-cyan-700 mb-8 text-center">
              Best Prices
            </h4>
            <p className="text-neutral-500 text-center">
              Competitive prices with quality assurance
            </p>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section>
        <div className="flex flex-col my-5 px-25">
          {/* Header */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-medium mb-2 text-green-500">Shop by Category</h1>
            <p className="text-neutral-500 text-center text-sm">
              Browse our comprehensive range of medical products, medicines, and
              health essentials
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 my-6 bg-muted-foreground p-10 rounded-2xl">
            <div className="flex flex-col items-center justify-center bg-white py-15 px-10 rounded-2xl drop-shadow-xl text-center">
              <FaPrescriptionBottleAlt className="text-2xl text-cyan-700 mb-4" />
              <h3 className="font-medium text-lg text-cyan-700 mb-2">
                Medicines
              </h3>
              <p className="text-neutral-500 text-sm">
                Prescription & OTC medicines
              </p>
            </div>

            <div className="flex flex-col items-center justify-center bg-white py-15 px-10 rounded-2xl drop-shadow-xl text-center">
              <FaPills className="text-2xl text-cyan-700 mb-4" />
              <h3 className="font-medium text-lg text-cyan-700 mb-2">
                Vitamins
              </h3>
              <p className="text-neutral-500 text-sm">
                Health & wellness supplements
              </p>
            </div>

            <div className="flex flex-col items-center justify-center bg-white py-15 px-10 rounded-2xl drop-shadow-xl text-center">
              <FaPumpMedical className="text-2xl text-cyan-700 mb-4" />
              <h3 className="font-medium text-lg text-cyan-700 mb-2">
                Equipments
              </h3>
              <p className="text-neutral-500 text-sm">
                Professional medical devices
              </p>
            </div>

            <div className="flex flex-col items-center justify-center bg-white py-15 px-10 rounded-2xl drop-shadow-xl text-center">
              <FaBriefcaseMedical className="text-2xl text-cyan-700 mb-4" />
              <h3 className="font-medium text-lg text-cyan-700 mb-2">
                First Aid
              </h3>
              <p className="text-neutral-500 text-sm">Emergency & wound care</p>
            </div>

            <div className="flex flex-col items-center justify-center bg-white py-15 px-10 rounded-2xl drop-shadow-xl text-center">
              <FaHeart className="text-2xl text-cyan-700 mb-4" />
              <h3 className="font-medium text-lg text-cyan-700 mb-2">
                Personal Care
              </h3>
              <p className="text-neutral-500 text-sm">Daily health & hygiene</p>
            </div>

            <div className="flex flex-col items-center justify-center bg-white py-15 px-10 rounded-2xl drop-shadow-xl text-center">
              <FaBaby className="text-2xl text-cyan-700 mb-4" />
              <h3 className="font-medium text-lg text-cyan-700 mb-2">
                Baby Care
              </h3>
              <p className="text-neutral-500 text-sm">Infant health products</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

//   {/* Features Section */}
//   <section style={{ padding: '80px 50px', textAlign: 'center', backgroundColor: 'var(--bg-light)'}}>
//     <h2 style={{color: '--grey-shade'}}>Why <span style={{color: 'var(--primary-base)'}}>Choose Us?</span></h2>
//     <div style={{ display: 'flex', gap: '6%', marginTop: '7%', justifyContent: 'center'}}>
//       <div className="card">
//         <h4 style={{color: 'var(--tertiary-base)', margin: '15px'}}>Fast Delivery</h4>
//         <p style={{margin: '15px'}}>Get your prescriptions delivered<br />within 2 hours.</p>
//       </div>
//       <div className="card">
//         <h4 style={{color: 'var(--tertiary-base)', margin: '15px'}}>Expert Advice</h4>
//         <p style={{margin: '15px'}}>Consult with our certified<br />pharmacists anytime.</p>
//       </div>
//       <div className="card">
//         <h4 style={{color: 'var(--tertiary-base)', margin: '15px'}}>24/7 Support</h4>
//         <p style={{margin: '15px'}}>We are always here<br />to help with your medical needs.</p>
//       </div>
//     </div>
//   </section>
// </div>
