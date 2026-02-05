import { motion } from "framer-motion";
import { Card, CardContent } from "../components/Card";
import Button from "../components/Button";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Edit3,
  Calendar,
  Star,
  Package,
  Award
} from "lucide-react";

export default function UserProfilePage() {
  return (
    <div className="
      min-h-screen
      bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950
      flex justify-center
      px-0 py-0
      md:px-0 md:py-4
    ">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-5xl"
      >
        {/* MAIN CARD */}
        <Card className="
          rounded-none
          md:rounded-3xl
          bg-white
          md:bg-white/90
          md:backdrop-blur
          border-0
          md:border md:border-black/5
          shadow-none
          md:shadow-2xl
        ">
          <CardContent className="
            p-0
            md:p-2
            grid grid-cols-1
            lg:grid-cols-3
            gap-0
            md:gap-6
          ">

            {/* ================= LEFT / TOP PROFILE ================= */}
            <motion.div
              className="
                bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600
                text-white
                px-6 py-10
                md:p-4
                flex flex-col items-center
                gap-3
                rounded-none
                md:rounded-3xl
              "
            >
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                <User size={42} />
              </div>

              {/* Name */}
              <div className="text-center">
                <h2 className="text-xl font-semibold">Ousman Ahmed</h2>
                <p className="text-sm text-white/85">Premium Member</p>

                <span className="inline-flex mt-2 px-4 py-1 rounded-full bg-white/20 text-xs">
                  Verified Account
                </span>
              </div>

              {/* Meta */}
              <div className="text-sm text-white/80 text-center space-y-1">
                <p>📅 Member since 2024</p>
              </div>

              {/* CTA */}
              <Button
                size="md"
                variant="ghost"
                className="w-full text-white hover:bg-white/20"
              >
                <Edit3 size={10} className="mr-2" />
                Edit Profile
              </Button>
            </motion.div>

            {/* ================= RIGHT / BOTTOM CONTENT ================= */}
            <div className="lg:col-span-2 space-y-0 md:space-y-6">

              {/* PROFILE DETAILS */}
              <Card className="
                rounded-none
                md:rounded-2xl
                bg-slate-100
                border-0
                md:ring-1 md:ring-black/5
              ">
                <CardContent className="p-0 md:p-5">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">
                    Profile Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-4">
                    <InfoItem icon={<Mail size={16} />} label="Email" value="ousman@email.com" />
                    <InfoItem icon={<Phone size={16} />} label="Phone" value="+251 900 000" />
                    <InfoItem icon={<MapPin size={16} />} label="Location" value="Addis Ababa" />
                    <InfoItem icon={<ShieldCheck size={16} />} label="Status" value="Verified" />
                  </div>
                </CardContent>
              </Card>

              {/* USAGE SUMMARY */}
              <Card className="
                rounded-none
                md:rounded-2xl
                bg-slate-100
                border-0
                md:ring-1 md:ring-black/5
              ">
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">
                    Usage Summary
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <StatCard icon={<Package size={18} />} title="Orders" value="128" />
                    <StatCard icon={<Calendar size={18} />} title="Bookings" value="42" />
                    <StatCard icon={<Star size={18} />} title="Reviews" value="19" />
                    <StatCard icon={<Award size={18} />} title="Points" value="1.2k" />
                  </div>
                </CardContent>
              </Card>

            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function InfoItem({ icon, label, value }) {
  return (
    <div className="
      flex items-center gap-0 md:gap-4
      p-0 sm:p-4
      rounded-xl
      bg-white
      border border-slate-200
    ">
      <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-medium text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="
        rounded-xl
        p-4
        bg-white
        border border-indigo-200
        text-center
      "
    >
      <div className="mx-auto mb-2 text-indigo-600">{icon}</div>
      <p className="text-xs text-slate-500">{title}</p>
      <p className="text-lg font-semibold text-indigo-700">{value}</p>
    </motion.div>
  );
}
