import { Card, CardContent } from "../components/Card";
import Button from "../components/Button";
import { Stethoscope, Star, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function DoctorProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white p-2">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-2">

        {/* Doctor Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="md:col-span-1"
        >
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl shadow-2xl">
            <CardContent className="p-3 flex flex-col items-center text-center">

              {/* Smaller 3D Avatar */}
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 shadow-[0_12px_30px_rgba(0,255,255,0.3)] flex items-center justify-center mb-2">
                <Stethoscope size={48} className="text-white drop-shadow-xl" />
              </div>

              <h2 className="text-lg md:text-xl font-bold">Dr. Ahmed Hassan</h2>
              <p className="text-cyan-300 text-xs md:text-sm">Cardiologist</p>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-1 md:mt-2 text-xs md:text-sm">
                <Star className="text-yellow-400" size={14} />
                <span className="font-semibold">4.9</span>
                <span className="text-gray-300">(210 reviews)</span>
              </div>

              {/* Edit Button */}
              <Button className="mt-2 md:mt-3 w-full rounded-xl bg-cyan-500 hover:bg-cyan-600 shadow text-xs md:text-sm">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="md:col-span-2"
        >
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl shadow-2xl">
            <CardContent className="p-2 md:p-3">

              {/* About */}
              <h3 className="text-base md:text-lg font-semibold mb-1">About Doctor</h3>
              <p className="text-gray-200 text-xs md:text-sm leading-snug">
                Experienced cardiologist with over 12 years of clinical practice.
                Specialized in heart failure management, preventive cardiology,
                and modern diagnostic techniques.
              </p>

              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl text-xs md:text-sm">
                  <MapPin className="text-cyan-400" />
                  Addis Ababa, Ethiopia
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl text-xs md:text-sm">
                  <Clock className="text-cyan-400" />
                  Mon – Fri, 9AM – 5PM
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-2 md:mt-3">
                <h3 className="text-base md:text-lg font-semibold mb-1">Quick Actions</h3>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  <Button  className="rounded-xl bg-indigo-500 hover:bg-indigo-600 
                  text-xs md:text-sm shadow">
                   <Link to="/docter/Appointments">View Appointments</Link> 
                  </Button>
                  <Button   variant="outline" className="rounded-xl 
                  border-white/30 text-white text-xs 
                  md:text-sm hover:bg-white/10">
                    <Link to="/docter/Availability" >   Manage Availability   </Link>
                  
                  </Button>
                  <Button variant="outline" className="rounded-xl 
                  border-white/30 text-white text-xs md:text-sm
                   hover:bg-white/10">
                    Settings
                  </Button>
                </div>
              </div>

            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
