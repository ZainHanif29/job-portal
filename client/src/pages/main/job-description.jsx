import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { setSingleJob } from "@/redux/slice/jobSlice";
import store from "@/redux/store";
import { JOB_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const JobDescription = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const jobId = params.id;
  const isApplied =singleJob?.applications?.some((ID) => ID.applicant === user?.id) || false;
  // const isApplied = false;
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          console.log(res.data.job);
        }
      } catch (error) {
        console.error(error);
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="secondary">
              {singleJob?.position} Position
            </Badge>
            <Badge className="text-[#f83002] font-bold" variant="secondary">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="secondary">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={() => {
            console.log("Click");
          }}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 py-4">
        {singleJob?.description}
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experienceLevel} years
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total applicants:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
