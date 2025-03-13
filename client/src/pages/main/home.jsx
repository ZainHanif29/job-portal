import CategoryCarousel from "@/components/category-carousel";
import HeroSection from "@/components/hero-section";
import LatestJobs from "@/components/latest-jobs";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import React from "react";

const Home = () => {
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
