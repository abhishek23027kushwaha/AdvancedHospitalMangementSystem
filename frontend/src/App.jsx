import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Toaster } from "react-hot-toast";
import './App.css'


// ── User Pages ──
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Services from "./pages/Services"
import Appointments from "./pages/Appointments"
import MyAppointments from "./pages/MyAppointments"
import MyServices from "./pages/MyServices"
import Contact from "./pages/Contact"
import AllDoctors from "./pages/AllDoctors"
import DoctorAdmin from "./pages/DoctorAdmin"
import DoctorLogin from "./pages/DoctorLogin"
import ServiceBooking from "./pages/ServiceBooking"
import AboutUs from "./pages/AboutUs"
import VideoConsult from "./pages/consult/VideoConsult"
import LabTest from "./pages/LabTest/LabTest"
import Surgeries from "./pages/Surgeries/Surgeries"

// ── Shared Components ──
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

// ── Admin Panel ──
import AdminLayout from "./components/admin/AdminLayout"
import AdminDashboard from "./pages/admin/Dashboard"
import AddDoctor from "./pages/admin/AddDoctor"
import ListDoctors from "./pages/admin/ListDoctors"
import AdminAppointments from "./pages/admin/Appointments"
import ServiceDashboard from "./pages/admin/ServiceDashboard"
import AddService from "./pages/admin/AddService"
import ListServices from "./pages/admin/ListServices"
import ServiceAppointments from "./pages/admin/ServiceAppointments"
import AdminContacts from "./pages/admin/contacts"
import AdminLogin from "./pages/admin/AdminLogin"

/* ── User layout: Navbar + Footer ── */
const UserLayout = () => (
  <>
    <Navbar />
    <div className="pt-24 bg-[#F8FAFC] min-h-screen">
      <Outlet />
    </div>
    <Footer />
  </>
)

/* ── Doctor Admin layout ── */
const DoctorAdminLayout = () => (
  <div className="min-h-screen bg-[#F8FAFC]">
    <Outlet />
  </div>
)

/* ── Role-specific redirect logic ── */
const RedirectUserIfAuth = ({ children }) => {
  const { isAuthenticated, user } = useSelector(state => state.user);
  if (isAuthenticated && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

const RedirectDoctorIfAuth = ({ children }) => {
  const { isAuthenticated: isDoctorAuth } = useSelector(state => state.doctor);
  if (isDoctorAuth) {
    return <Navigate to="/doctor-admin" replace />;
  }
  return children;
};

const RedirectAdminIfAuth = ({ children }) => {
  const { isAuthenticated, user } = useSelector(state => state.user);
  if (isAuthenticated && user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
      {/* ── Auth Routes (no Navbar/Footer) ── */}
      <Route path="/login" element={<RedirectUserIfAuth><Login /></RedirectUserIfAuth>} />
      <Route path="/signup" element={<RedirectUserIfAuth><SignUp /></RedirectUserIfAuth>} />
      <Route path="/doctor/login" element={<RedirectDoctorIfAuth><DoctorLogin /></RedirectDoctorIfAuth>} />
      <Route path="/admin/login" element={<RedirectAdminIfAuth><AdminLogin /></RedirectAdminIfAuth>} />

      {/* ── User Routes ── */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/doctors" element={<AllDoctors />} />
        <Route path="/services" element={<Services />} />
        <Route path="/surgeries" element={<Surgeries />} />
        <Route path="/consult" element={<VideoConsult />} />
        <Route path="/labtest" element={<LabTest />} />
        <Route path="/book-appointment/:doctorId?" element={<Appointments />} />
        <Route path="/book-service/:serviceId" element={<ServiceBooking />} />
        <Route path="/appointments" element={<MyAppointments />} />
        <Route path="/my-services" element={<MyServices />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ── Doctor Admin Routes ── */}
      <Route element={<DoctorAdminLayout />}>
        <Route path="/doctor-admin/*" element={<DoctorAdmin />} />
      </Route>

      {/* ── Admin Panel Routes ── */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="add-doctor" element={<AddDoctor />} />
        <Route path="list-doctors" element={<ListDoctors />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="service-dashboard" element={<ServiceDashboard />} />
        <Route path="add-service" element={<AddService />} />
        <Route path="list-services" element={<ListServices />} />
        <Route path="service-appointments" element={<ServiceAppointments />} />
        <Route path="contacts" element={<AdminContacts />} />
      </Route>

      {/* ── 404 Redirect ── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  )
}

export default App
