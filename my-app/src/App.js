import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Registration from './Registration.jsx';
import Login from './Login.jsx';
import Home from './home/Home.jsx';
import AppPreview from './dashbord/P_dDashbord.jsx'
import Home2 from './home/Home2.jsx';
import ApointmentView from './adminDashbord/ApointmentView.jsx';
import Footer from './footer/Footer.js';
import Header from './header/Header.jsx';
import Users from './user/User.jsx';
import UserEditPage from './user/editUser.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingPage from './Booking/BookingPage.jsx';
import { PatientDashboard } from './dashbord/PatientDashbord.jsx';
import { DoctorDashboard } from './dashbord/docterDashbord.jsx';
import AdminDashboard from './adminDashbord/adminDashbord.jsx';
import DoctorProfileAdmin from './adminDashbord/DocterProfile.jsx';
import { HospitalsList } from './adminDashbord/HospitalsList.jsx';
import { DoctorsByHospital } from './adminDashbord/DoctersByHospital.jsx';
import AdminOverview from './adminDashbord/AdminOverview.jsx';
import { AddHospital } from './adminDashbord/AddHopital.jsx';
import RejectedView from './adminDashbord/RejectedView.jsx';
import DocterProfile from './adminDashbord/DocterProfile.jsx';
import AdminHospitalProfile from './adminDashbord/AdminHospitalProfile.jsx';

function AppWrapper() {
  const location = useLocation();

  // List of paths where you DON'T want to show the header
  const hideHeaderPaths = ['/app','/admin'];

  const showHeader = !hideHeaderPaths.some(path =>
  location.pathname.startsWith(path)
);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/users' element={<Users />} />
        <Route path='/newUser' element={<Registration />} />
        <Route path='/home' element={<Home />} />
        <Route path='/docter' element={<DoctorDashboard />} />
        <Route path='/user' element={<PatientDashboard />} />
        <Route path='/app' element={<AppPreview />} />
         <Route path='admin/docter/:id' element={<DoctorProfileAdmin />} />
        <Route path='/edituser/:id' element={<UserEditPage />} />
        <Route path='/booking' element={<BookingPage />} />
        <Route path='/admin' element={<AdminDashboard/>} >
          <Route index  element={<AdminOverview/>}/>
          <Route path='hospitals' element={<HospitalsList/>}/>
          <Route path='docters' element={<DoctorsByHospital/>}/>
          <Route path='addHospital' element={<AddHospital/>}/>
          <Route path='appointments' element={<ApointmentView/>}/>
          <Route path='rejected' element={<RejectedView/>}/>
          <Route path='docterProfile/:id' element={<DocterProfile/>}/>
          <Route path='hospitalProfile' element={<AdminHospitalProfile/>}/>


        </Route>

      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App min-h-screen">
      <ToastContainer />
      <BrowserRouter>
        <AppWrapper />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
