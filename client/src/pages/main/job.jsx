import FilterCard from "@/components/filter-card";
import JobCard from "@/components/job-card";
import Navbar from "@/components/shared/navbar";
import React, { useEffect, useState } from "react";
import store from "@/redux/store";
import { useSelector } from "react-redux";

const Job = () => {
  const { allJobs, searchQuery } = useSelector((store) => store.job);
  const [filterJob, setFilterJob] = useState(allJobs);
  useEffect(() => {
    if (searchQuery) {
      const filteredJob = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilterJob(filteredJob);
    } else {
      setFilterJob(allJobs);
    }
  }, [allJobs, searchQuery]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJob.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJob.map((job) => (
                  // <div>
                  <JobCard key={job?._id} job={job} />
                  // </div>
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
