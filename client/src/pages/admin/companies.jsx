import CompaniesTable from "@/components/admin/companies-table";
import Navbar from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { setSearchCompanyByText } from "@/redux/slice/companySlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAllCompanies();
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
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
            placeholder="Filter by name"
          />
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
