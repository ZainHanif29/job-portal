import Navbar from "@/components/shared/navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import logo from "/company-logo.png";
import { Button } from "@/components/ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import AppliedJobTable from "@/components/applied-job-table";

const skills = ["HTML", "CSS", "JAVASCRIPT", "REACT"];
const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={logo} alt="profile-img" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos,
                enim.
              </p>
              <div>
                <div className="flex items-center gap-3 my-2">
                  <Mail /> <span>demo01@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 my-2">
                  <Contact /> <span>0311-1234567</span>
                </div>
              </div>
            </div>
          </div>
          <Button className="" variant="outline">
            <Pen />
          </Button>
        </div>
        <hr className="my-5" />
        {/*  */}
        <div className="my-5 flex items-center gap-5">
          <Label className="text-3xl font-bold">Skills:</Label>
          <div className="flex items-center gap-1">
            {skills.length !== 0 ? (
              skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>
        <div className="my-5 flex items-center gap-5">
          <Label className="text-3xl font-bold">Resume:</Label>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            className=" text-blue-500 text-2xl font-bold cursor-pointer hover:underline"
          >
            Youtube
          </a>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
    </div>
  );
};

export default Profile;
