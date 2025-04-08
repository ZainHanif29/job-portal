import React from "react";
import LatestJobCard from "./latest-job-card";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetAllJobs from "@/hooks/useGetAllJobs";
const LatestJobs = () => {
  useGetAllJobs();

  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Opening
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs <= 0 ? (
          <div>Job Not Found!</div>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobCard key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
