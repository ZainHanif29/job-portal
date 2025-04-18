import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import logo from "/company-logo.png";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" size="icon" className="p-6">
          <Avatar>
            <AvatarImage src={job?.logo} />
            <AvatarFallback className="text-2xl text-blue-700">
              {job?.company?.name?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="secondary">
          {job?.position} Position
        </Badge>
        <Badge className="text-[#f83002] font-bold" variant="secondary">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="secondary">
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job._id}`)}
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default JobCard;
