import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHospital, FaUserMd, FaClipboardList, FaTimes, FaPlus } from 'react-icons/fa';

const menuItems = {
  overview: [
    { label: 'Overview', icon: <FaClipboardList />, path: '/admin' },
  ],
  management: [
    { label: 'Hospitals', icon: <FaHospital />, path: '/admin/hospitals' },
    { label: 'Doctors', icon: <FaUserMd />, path: '/admin/docters' },
    { label: 'Appointments', icon: <FaClipboardList />, path: '/admin/appointments' },
    { label: 'Rejected', icon: <FaTimes />, path: '/admin/rejected' },
  ],
  actions: [
    { label: 'Add Hospital', icon: <FaPlus />, path: '/admin/addHospital' },
  ],
};

const Sidebar = ({
  totalDoctors = 0,
  totalHospitals = 0,
  totalAppointments = 2,
  collapsed,
  setCollapsed,
}) => {
  return (
    <div
      className={`
        ${collapsed ? 'w-16' : 'w-48'}
        bg-slate-50 h-full border-r shadow-md
        flex flex-col transition-all duration-300
      `}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-2 m-2 rounded-md bg-white shadow text-slate-700 hover:bg-blue-50"
      >
        {collapsed ? '➡' : '⬅'}
      </button>

      {/* Menu */}
      <nav className="flex-1 flex flex-col gap-4 p-2 overflow-y-auto">

        {/* Overview */}
        <div>
          {!collapsed && (
            <p className="text-xs text-slate-500 uppercase px-2 mb-1">
              Overview
            </p>
          )}
          {menuItems.overview.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md hover:bg-white/50 transition-all text-sm
                ${isActive ? 'bg-white shadow font-semibold' : ''}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </div>

        {/* Management */}
        <div>
          {!collapsed && (
            <p className="text-xs text-slate-500 uppercase px-2 mb-1">
              Management
            </p>
          )}
          {menuItems.management.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md hover:bg-white/50 transition-all text-sm
                ${isActive ? 'bg-white shadow font-semibold' : ''}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div>
          {!collapsed && (
            <p className="text-xs text-slate-500 uppercase px-2 mb-1">
              Actions
            </p>
          )}
          {menuItems.actions.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md hover:bg-white/50 transition-all text-sm
                ${isActive ? 'bg-white shadow font-semibold' : ''}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </div>

      </nav>

      {/* Totals */}
      {!collapsed && (
        <div className="p-1 text-sm border-t">
          <h3 className="text-slate-600 text-xs">Totals</h3>
          <p className="font-bold text-sm mt-1">
            {totalAppointments} Appointments
          </p>
          <p>
            {totalDoctors} Doctors • {totalHospitals} Hospitals
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
