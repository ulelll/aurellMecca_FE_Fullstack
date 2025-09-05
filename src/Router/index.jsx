import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../Pages/Dashboard";
import Users from "../Pages/Users";
import Products from "../Pages/Products";
import Sales from "../Pages/Sales";
import Login from "../Pages/Login";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="sales" element={<Sales />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}