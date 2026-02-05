import { Card, CardContent} from "../components/Card.jsx";
import  Button  from "../components/Button.jsx";
import { XCircle, Calendar, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function AppointmentRejected() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="relative overflow-hidden rounded-2xl bg-slate-900/80 backdrop-blur shadow-2xl border border-slate-700">
          {/* Decorative 3D glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-rose-600/20 rounded-full blur-3xl" />

          <CardContent className="relative z-10 p-8 text-center">
            {/* 3D Icon */}
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: [ -10, 0, -6 ] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 shadow-[0_20px_40px_rgba(244,63,94,0.45)]"
            >
              <XCircle className="h-10 w-10 text-white drop-shadow-lg" />
            </motion.div>

            <h1 className="text-2xl font-semibold text-white mb-2">
              Appointment Rejected
            </h1>
            <p className="text-slate-400 text-sm mb-6">
              Unfortunately, your appointment request has been declined by the doctor.
              You can choose another time or book with a different specialist.
            </p>

            {/* Info Box */}
            <div className="mb-6 rounded-xl bg-slate-800/70 p-4 text-left shadow-inner">
              <div className="flex items-center gap-3 text-slate-300">
                <Calendar className="h-5 w-5 text-rose-400" />
                <span className="text-sm">Reason: Schedule unavailable</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button className="flex-1 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 shadow-lg hover:opacity-90">
                Book New Appointment
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-xl border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
