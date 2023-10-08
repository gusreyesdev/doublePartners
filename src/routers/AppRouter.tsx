import { Navigate, Route, Routes } from "react-router-dom";

import { Dashboard, UserDetails } from '../components/screens'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/details/:login" element={<UserDetails />} />
      
      <Route path="/*" element={<Navigate to="/dashboard" />} />

    </Routes>
  );
};
