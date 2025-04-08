import { setAllJobs } from "@/redux/slice/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";

const useGetAllJobs = () => {
  const { user } = useSelector((store) => store.auth);
  const { searchQuery } = useSelector((store) => store.job);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${searchQuery}`,
          {
            withCredentials: true,
          }
        );
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
    if (user?.role === "student") {
      fetchAllJobs();
    }
  }, []);
};

export default useGetAllJobs;
