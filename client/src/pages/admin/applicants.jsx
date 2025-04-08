import ApplicantsTable from "@/components/admin/applicants-table";
import Navbar from "@/components/shared/navbar";
import { setApplicants } from "@/redux/slice/applicationSlice";
import store from "@/redux/store";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setApplicants(res.data.job));
          // console.log(res.data.job);
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
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.applications?.length}
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
