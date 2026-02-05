import { useContext } from "react";
import { UserContext } from "../context/contextApi";
import { FaUserMd, FaCalendarCheck, FaEnvelope, FaHistory } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "../footer/Footer";
import { useState } from "react";
export function PatientDashboard() {
const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <>
    <Header/>
<Outlet/>
<button
  onClick={() => setShowHelpModal(true)}
  className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 flex items-center gap-2 z-40"
>
  💬 Help
</button>
{showHelpModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
      <h2 className="text-lg font-semibold text-slate-800 mb-1">
        Need help?
      </h2>
      <p className="text-sm text-slate-500 mb-5">
        Contact our support team anytime
      </p>

      {/* SUPPORT OPTIONS */}
      <div className="space-y-3">
        {/* CALL */}
        <a
          href="tel:+251900000000"
          className="flex items-center gap-3 p-3 border rounded-xl hover:bg-slate-50"
        >
          📞
          <div>
            <p className="font-medium text-slate-700">Call Support</p>
            <p className="text-xs text-slate-500">Fast help by phone</p>
          </div>
        </a>

        {/* WHATSAPP */}
        <a
          href="https://wa.me/251900000000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 border rounded-xl hover:bg-slate-50"
        >
          💬
          <div>
            <p className="font-medium text-slate-700">WhatsApp Chat</p>
            <p className="text-xs text-slate-500">Recommended</p>
          </div>
        </a>

        {/* EMAIL (OPTIONAL) */}
        <a
          href="mailto:support@yourapp.com"
          className="flex items-center gap-3 p-3 border rounded-xl hover:bg-slate-50"
        >
          ✉️
          <div>
            <p className="font-medium text-slate-700">Email Support</p>
            <p className="text-xs text-slate-500">Less urgent</p>
          </div>
        </a>
      </div>

      {/* ACTION */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => setShowHelpModal(false)}
          className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </>
  
  );
}

/* ================= STAT CARD ================= */

