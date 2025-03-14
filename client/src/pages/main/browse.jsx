import JobCard from "@/components/job-card";
import Navbar from "@/components/shared/navbar";
import React from "react";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-12">
        <h1 className="font-bold text-xl my-10">
          Search Results ({randomJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-5">
          {randomJobs.map((item, index) => (
            <JobCard />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
