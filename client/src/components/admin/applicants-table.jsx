import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";

const shortListingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const statusHandler = async (id, status) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
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
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants.applications?.map((item) => {
              return (
                <TableRow key={item?._id}>
                  <TableCell>{item.applicant.fullName}</TableCell>
                  <TableCell>{item.applicant.email}</TableCell>
                  <TableCell>{item.applicant.phoneNumber}</TableCell>
                  {item.applicant.profile.resume ? (
                    <TableCell className="text-blue-600 italic underline cursor-pointer">
                      <a
                        href={item.applicant.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.applicant.profile.resumeOriginalName}
                      </a>
                    </TableCell>
                  ) : (
                    <TableCell className="cursor-pointer text-red-500 font-bold">
                      N/A
                    </TableCell>
                  )}

                  <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32 cursor-pointer">
                        {shortListingStatus.map((status, index) => {
                          return (
                            <div
                              onClick={() => statusHandler(item?._id, status)}
                              key={index}
                              className="my-2"
                            >
                              {status}
                            </div>
                          );
                        })}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;

// <TableRow>
//   <TableCell>name</TableCell>
//   <TableCell>Email</TableCell>
//   <TableCell>Contact</TableCell>
//   <TableCell>Resume</TableCell>
//   <TableCell>Date</TableCell>
//   <TableCell className="text-right">
//     <Popover>
//       <PopoverTrigger>
//         <MoreHorizontal />
//       </PopoverTrigger>
//       <PopoverContent className="w-32 cursor-pointer">
//         {shortListingStatus.map((status, index) => {
//           return (
//             <div key={index} className="my-2">
//               {status}
//             </div>
//           );
//         })}
//       </PopoverContent>
//     </Popover>
//   </TableCell>
// </TableRow>
