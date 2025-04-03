import { setAllJobs } from "@/redux/slice/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
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

export default useGetAllJobs;
