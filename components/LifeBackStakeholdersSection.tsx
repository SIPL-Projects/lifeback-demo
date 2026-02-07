"use client";

import { useEffect } from "react";

export default function LifeBackStakeholdersSection() {
  useEffect(() => {
    // Fix any layout issues
    document.body.style.overflowX = "hidden";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            LifeBack™ Stakeholders
          </h1>
          <p className="text-gray-600">
            LifeBack™ is specialty-agnostic. The ecosystem is organized around the care pathway.
          </p>
        </div>
      </div>

      {/* Simple Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Simple Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "1) Beneficiaries", points: ["Easy to use", "Privacy-conscious", "Caregiver support"] },
            { title: "2) Clinical Users", points: ["Fast assessments", "Decision support", "Better follow-up"] },
            { title: "3) Hospital Operators", points: ["Operational efficiency", "Quality audits", "Uptime & reporting"] },
            { title: "4) Buyers / Payers", points: ["ROI & reduced costs", "Risk management", "Scalable deployments"] },
            { title: "5) Compliance & Trust", points: ["Patient safety", "Data handling", "Ethical use"] },
            { title: "6) Evidence Partners", points: ["Validation quality", "Collaboration", "Secure infrastructure"] },
            { title: "7) Governance & Capital", points: ["Product direction", "Sustainable growth", "Transparent metrics"] },
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-sm text-blue-600 mb-4">What they care about → How LifeBack helps</p>
              <ul className="space-y-2">
                {item.points.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Simple Footer Section */}
        <div className="mt-12 bg-white rounded-lg shadow p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Specialty-agnostic flow</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Patients & Caregivers</h3>
              <p className="text-gray-600 text-sm">Engagement, adherence, and feedback</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Clinicians (All Specialties)</h3>
              <p className="text-gray-600 text-sm">Use signals + trends for care decisions</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">LifeBack Platform</h3>
              <p className="text-gray-600 text-sm">Screening → Diagnosis → Monitoring → Decision Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}