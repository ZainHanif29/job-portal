import CategoryCarousel from "@/components/category-carousel";
import HeroSection from "@/components/hero-section";
import LatestJobs from "@/components/latest-jobs";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import store from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    } else if (user?.role === "student") {
      useGetAllJobs();
    }
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        <Footer />
      </div>
    </>
  );
};

export default Home;
