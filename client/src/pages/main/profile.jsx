import Navbar from "@/components/shared/navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";
import logo from "/company-logo.png";
import { Button } from "@/components/ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import AppliedJobTable from "@/components/applied-job-table";
import UpdateProfileDialog from "@/components/update-profile-dialog";
import { useSelector } from "react-redux";
import store from "@/redux/store";

const skills = ["HTML", "CSS", "JAVASCRIPT", "REACT"];
const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
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
              <h1 className="font-medium text-xl">{user?.fullName}</h1>
              <p>{user?.bio}</p>
              <div>
                <div className="flex items-center gap-3 my-2">
                  <Mail /> <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 my-2">
                  <Contact /> <span>{user?.phoneNumber}</span>
                </div>
              </div>
            </div>
          </div>
          <Button variant="outline" onClick={() => setOpen(true)}>
            <Pen />
          </Button>
        </div>
        <hr className="my-5" />
        {/*  */}
        <div className="my-5 flex items-center gap-5">
          <Label className="text-3xl font-bold">Skills:</Label>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>
        <div className="my-5 flex items-center gap-5">
          <Label className="text-3xl font-bold">Resume:</Label>
          <a
            href={user?.profile?.resume}
            target="_blank"
            className=" text-blue-500 text-2xl font-bold cursor-pointer hover:underline"
          >
            {user?.profile?.resumeOriginalName || "N/A"}
          </a>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
