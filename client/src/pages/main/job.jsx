import FilterCard from "@/components/filter-card";
import JobCard from "@/components/job-card";
import Navbar from "@/components/shared/navbar";
import React from "react";

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];
const Job = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {jobArray.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {jobArray.map((item, index) => (
                  <div>
                    <JobCard key={index} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Job;
