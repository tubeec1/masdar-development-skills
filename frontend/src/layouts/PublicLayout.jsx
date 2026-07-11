import React from "react";
import { Outlet } from "react-router-dom";
import PublicNav from "../components/public/PublicNav";
import Footer from "../components/public/Footer";

const PublicLayout = () => {
  return (
    <div>
      <PublicNav />
      <main className="pt-18">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default PublicLayout;
