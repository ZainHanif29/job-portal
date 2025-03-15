import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";

const JobDescription = () => {
  const isApplied = true;
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">MERN Stack Developer</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="secondary">
              12 Position
            </Badge>
            <Badge className="text-[#f83002] font-bold" variant="secondary">
              Part time
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="secondary">
              24 LPA
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
      <h1 className="border-b-2 border-b-gray-300 py-4">Job Description</h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:
          <span className="pl-4 font-normal text-gray-800">
            MERN Stack Developer
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-normal text-gray-800">Karachi</span>
        </h1>
        <h1 className="font-bold my-1">
          Description:
          <span className="pl-4 font-normal text-gray-800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, nam.
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:
          <span className="pl-4 font-normal text-gray-800">2 years</span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:
          <span className="pl-4 font-normal text-gray-800">12LPA</span>
        </h1>
        <h1 className="font-bold my-1">
          Total applicants:
          <span className="pl-4 font-normal text-gray-800">4</span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:
          <span className="pl-4 font-normal text-gray-800">15-03-2025</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
