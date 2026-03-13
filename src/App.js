import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ClientHome from "./pages/ClientHome";
import CraftsmanFeed from "./pages/CraftsmanFeed";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ArtisanProfile from "./pages/ArtisanProfile";
import Register from "./pages/Register";
import Pricing from "./pages/Pricing";
import Wallet from "./pages/Wallet";
import NewRequest from "./pages/NewRequest";
import Chat from "./pages/Chat";
import Notifications from "./pages/Notifications";
import LeaveReview from "./pages/LeaveReview";

function PrivateRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/client/home" element={
            <PrivateRoute role="client"><ClientHome /></PrivateRoute>
          } />
          <Route path="/craftsman/feed" element={
            <PrivateRoute role="artisan"><CraftsmanFeed /></PrivateRoute>
          } />
          
          <Route path="/artisan/:id" element={<ArtisanProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/craftsman/wallet" element={<Wallet />} />
          <Route path="/client/requests/new" element={<NewRequest />} />
<Route path="/chat/:id" element={<Chat />} />
<Route path="/notifications" element={<Notifications />} />
<Route path="/review/:id" element={
  <PrivateRoute role="client"><LeaveReview /></PrivateRoute>
} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}