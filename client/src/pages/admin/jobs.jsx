import JobsTable from "@/components/admin/jobs-table";
import Navbar from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/slice/jobSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-fit"
            placeholder="Filter by name or role"
          />
          <Button onClick={() => navigate("/admin/job/create")}>New Job</Button>
        </div>
        <JobsTable />
      </div>
    </div>
  );
};

export default Jobs;
