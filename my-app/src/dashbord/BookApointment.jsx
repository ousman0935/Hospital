import React, { useState } from "react";
import {
  faXmark,
  faHospital,
  faUserDoctor,
  faCalendarDays,
  faClock,
  faStethoscope,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BookApointment = ({ onClose }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState(1);
  const [dark, setDark] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedHospital, setselectedHospital] = useState(null);
  const [selectedProblem, setselectedProblem] = useState(null);



  const pains = [
    { id: 1, name: "Headache", specialty: "Neurology" },
    { id: 2, name: "Tooth Pain", specialty: "Dentistry" },
    { id: 3, name: "Skin Allergy", specialty: "Dermatology" },
  ];

  const hospitals = [
    { id: 1, name: "City Hospital" },
    { id: 2, name: "Health Care Center" },
  ];

  const doctors = [
    { id: 1, name: "Dr. Ahmed Ali", specialty: "Dentistry", avatar: "🦷" },
    { id: 2, name: "Dr. Sara Hassan", specialty: "Neurology", avatar: "🧠" },
    { id: 3, name: "Dr. Lina Omar", specialty: "Dermatology", avatar: "🧴" },
  ];

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <div className="relative max-w-2xl mx-auto p-4">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 
          rounded-full bg-white dark:bg-gray-800 text-red-500 shadow-xl hover:rotate-90 transition"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        {/* Dark Mode */}
        <button
          onClick={() => setDark(!dark)}
          className="absolute top-4 left-4 w-10 h-10 
          rounded-full bg-white dark:bg-gray-800 text-red-600 shadow-xl"
        >
          <FontAwesomeIcon icon={dark ? faSun : faMoon} />
        </button>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Book Appointment
        </h1>

        {/* Progress */}
        <StepProgress step={step} />

        {/* Card */}
        <div className="mt-4 bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 space-y-6">

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <Field  icon={faStethoscope} label="What is your problem?">
                <select className="input-3d"
                 onChange={(e)=>setselectedProblem(e.target.value)}>
                  <option>Select problem</option>
                  {pains.map(p => (
                    <option key={p.id}
                    >{p.name}</option>
                  ))}
                </select>
              </Field>

              <Field icon={faHospital} label="Choose Hospital">
                <select className="input-3d" 
                onChange={(e)=>setselectedHospital(e.target.value)} >
                  <option>Select hospital</option>
                  {hospitals.map(h => (
                    <option key={h.id} value={h.id}
                    >
                      
                      {h.name}</option>
                  ))}
                </select>
              </Field>

              <PrimaryButton  disabled={!selectedHospital || !selectedProblem} onClick={() => setStep(2)} 
              >
                Next</PrimaryButton>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <p className="text-sm text-blue-600 font-medium">
                💡 Recommended Doctors
              </p>

              <div className="grid grid-cols-1  sm:grid-cols-3 gap-4" >
                {doctors.map(d => (
                  <DoctorCard
                    key={d.id}
                    doctor={d}
                    active={selectedDoctor?.id === d.id}
                    onClick={() => setSelectedDoctor(d)}
                  />
                ))}
              </div>

              <PrimaryButton onClick={() => setStep(3)} 
              disabled={!selectedDoctor}>
                Continue
              </PrimaryButton>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <Field icon={faCalendarDays} label="Appointment Date">
                <input type="date" className="input-3d" />
              </Field>

              <Field icon={faClock} label="Time Slot">
<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                  <TimeButton
                        active={selectedTime === "10:30"}
      onClick={() => setSelectedTime("10:30")}

                  >10:30</TimeButton>
                  <TimeButton
                        active={selectedTime === "12:00"}
      onClick={() => setSelectedTime("12:00")}

                  >12:00</TimeButton>
                  <TimeButton
                        active={selectedTime === "14:30"}
      onClick={() => setSelectedTime("14:30")}

                  >14:30</TimeButton>
                </div>
              </Field>

              <PrimaryButton>Confirm Appointment</PrimaryButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* COMPONENTS */

const StepProgress = ({ step }) => (
  <div className="flex justify-center gap-3 mb-4">
    {[1, 2, 3].map(s => (
      <div
        key={s}
        className={`w-8 h-2 rounded-full transition ${
          step >= s ? "bg-blue-600" : "bg-blue-200"
        }`}
      />
    ))}
  </div>
);

const Field = ({ icon, label, children }) => (
  <div>
    <label className="flex items-center gap-2 text-sm font-medium mb-1">
      <FontAwesomeIcon icon={icon} className="text-blue-500" />
      {label}
    </label>
    {children}
  </div>
);

const DoctorCard = ({ doctor, active, onClick }) => (
  <div
    onClick={onClick}
    className={`
      cursor-pointer rounded-2xl p-4 text-center
      shadow-md transition-all duration-200
      hover:-translate-y-1 hover:shadow-xl
      border-2 /* Added border for definition */
      ${
        active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-900 dark:text-gray-100"
      }
    `}
  >
    <div className="text-4xl mb-2">{doctor.avatar}</div>
    <p className="font-bold">{doctor.name}</p>
    <p className={`text-sm ${active ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}>
      {doctor.specialty}
    </p>
  </div>
);
const TimeButton = ({ children, active, onClick}) => (

  <button onClick={onClick} type="button"
    className={`px-4 py-2 rounded-xl shadow-md transition ${
      active ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
    }`}
  >
    {children}
  </button>
);

const PrimaryButton = ({ children, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="
      w-full bg-gradient-to-r from-blue-600 to-cyan-500
      text-white py-3 rounded-2xl font-semibold
      shadow-xl hover:shadow-2xl
      disabled:opacity-50
      transition
    "
  >
    {children}
  </button>
);

export default BookApointment;
