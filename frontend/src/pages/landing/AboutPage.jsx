import React from "react";
import ParticlesBackground from "../../components/ParticlesBackground";

const AboutPage = () => {
  return (
    <div>
      {/* Introduction Section */}
      <section className="relative bg-gray-100 py-[10%] px-[5%] text-center overflow-hidden">
        {/* <ParticlesBackground /> */}
        <div className="relative z-10">
          <h2 className="text-gray-800 text-8xl font-bold mb-5">
            Dedicated
            <span className="text-cyan-500"> to Your</span>
            <br />
            <span className="text-green-500">Well-being</span>
          </h2>
          <p className="max-w-[800px] mx-auto my-5 text-gray-600 leading-relaxed">
            Since 1998, Phillips Pharmacy has been a cornerstone of the community.
            We started with a simple mission: to provide accessible, affordable,
            and high-quality healthcare products to every family.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-[50px] flex gap-10 flex-wrap bg-cyan-900">
        <div className="flex-1 min-w-[300px] p-8 bg-white rounded-xl shadow-lg text-center">
          <h5 className="text-cyan-800 text-4xl font-bold mb-3">
            Our <span className="text-amber-500">Mission</span>
          </h5>
          <p className="text-gray-600">
            To improve the healthy lifestyles of Sri Lankan Citizen by providing
            professional pharmaceutical care and personalized health solutions.
          </p>
        </div>
        <div className="flex-1 min-w-[300px] p-8 bg-white rounded-xl shadow-lg text-center">
          <h5 className="text-cyan-800 text-4xl font-bold mb-3">
            Our <span className="text-amber-500">Vision</span>
          </h5>
          <p className="text-gray-600">
            To be the most trusted healthcare provider in the region, Highly
            Qualified Pharmacy Service known for innovation and excellence in
            Patient Care.
          </p>
        </div>
      </section>

      {/* Meet Our Pharmacists */}
      <section className="py-20 px-[50px] relative overflow-hidden">
        <ParticlesBackground />
        <div className="relative z-10">
          <h3 className="text-center text-4xl font-bold mb-16 text-gray-800">
            Meet Our
            <br />
            <span className="text-amber-500">Professional Team</span>
          </h3>
          
          {/* Chief Pharmacist */}
          <div className="flex justify-center flex-wrap mb-20">
            <div className="text-center w-[400px]">
              <div className="w-[250px] h-[250px] rounded-full overflow-hidden mx-auto mb-4 border-[5px] border-emerald-600">
                <img 
                  src="/images/pharmacist1.jpeg" 
                  alt="Chief Pharmacist" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h6 className="text-cyan-700 text-2xl font-bold">James Phillips</h6>
              <p className="text-amber-600 font-bold mb-2">
                Chief Pharmacist
              </p>
              <p className="text-sm text-gray-500">
                20+ years of experience in clinical pharmacy.
              </p>
            </div>
          </div>

          {/* Other Pharmacists */}
          <div className="flex justify-center gap-[5%] flex-wrap">
            {/* Pharmacist 2 */}
            <div className="text-center w-[250px] mb-8">
              <div className="w-[180px] h-[180px] rounded-full overflow-hidden mx-auto mb-4 border-[5px] border-emerald-600">
                <img 
                  src="/images/pharmacist2.jpeg" 
                  alt="Senior Pharmacist" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h6 className="text-cyan-700 text-2xl font-bold ">Reshan Kooray</h6>
              <p className="text-amber-600 font-bold mb-2">
                Senior Pharmacist
              </p>
              <p className="text-sm text-gray-500">
                Expert in medication management and safety.
              </p>
            </div>

            {/* Pharmacist 3 */}
            <div className="text-center w-[250px] mb-8">
              <div className="w-[180px] h-[180px] rounded-full overflow-hidden mx-auto mb-4 border-[5px] border-emerald-600">
                <img 
                  src="/images/pharmacist3.jpeg" 
                  alt="Senior Pharmacist" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h6 className="text-cyan-700 text-2xl font-bold">Nelumi Perera</h6>
              <p className="text-amber-600 font-bold mb-2">
                Senior Pharmacist
              </p>
              <p className="text-sm text-gray-500">
                Expert in medication management and safety.
              </p>
            </div>

            {/* Pharmacist 4 */}
            <div className="text-center w-[250px] mb-8">
              <div className="w-[180px] h-[180px] rounded-full overflow-hidden mx-auto mb-4 border-[5px] border-emerald-600">
                <img 
                  src="/images/pharmacist4.jpeg" 
                  alt="Senior Pharmacist" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h6 className="text-cyan-700 text-2xl font-bold">Alan Fernando</h6>
              <p className="text-amber-600 font-bold mb-2">
                Senior Pharmacist
              </p>
              <p className="text-sm text-gray-500">
                Expert in medication management and safety.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;