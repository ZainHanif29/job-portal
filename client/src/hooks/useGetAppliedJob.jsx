import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import { setAllAppliedJobs } from "@/redux/slice/jobSlice";

const useGetAppliedJob = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
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
    fetchAllJobs();
  }, []);
};

export default useGetAppliedJob;
