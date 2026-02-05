import React from 'react'

    const notifications = [
  {
    id: 1,
    type: "confirmed",
    title: "Appointment Confirmed",
    message: "Your appointment with Dr. Ahmed is confirmed.",
    time: "10 minutes ago",
    icon: "/3d-check.png",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    type: "reminder",
    title: "Appointment Reminder",
    message: "You have an appointment tomorrow at 10:30 AM.",
    time: "1 hour ago",
    icon: "/3d-calendar.png",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    type: "alert",
    title: "Schedule Update",
    message: "Your doctor changed the appointment time.",
    time: "Yesterday",
    icon: "/3d-alert.png",
    color: "bg-yellow-100 text-yellow-600",
  },
];

  export default function Notifications() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Notifications
      </h1>

      {/* Notification List */}
      <div className="space-y-4">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-4 bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
          >
            {/* 3D Icon */}
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.color}`}
            >
              <img
                src={item.icon}
                alt="icon"
                className="w-8 h-8"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {item.message}
              </p>
              <span className="text-xs text-gray-400">
                {item.time}
              </span>
            </div>

            {/* Action */}
            <button className="text-sm text-blue-600 hover:underline">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

