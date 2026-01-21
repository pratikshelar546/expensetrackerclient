"use client";
import React, { useState } from "react";
import DynamicModal from "./DynamicModal";
import { useAppDispatch } from "../../Hooks";
import { addMember } from "@/Redux/Slices/requestSlice";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Input } from "./UI/Input";
import { Label } from "./UI/Label";
import { LabelInputContainer } from "@/components/ManageExpenses/ExpenseFields/AddFieldForm";

const AddMemberModal = ({
  openModal,
  setOpenModal,
  fieldId,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  fieldId: string;
}) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const { data: session } = useSession();


  const handleAddMember = async() => {
    try {
      const response = await dispatch(addMember({ email, fieldId, token: session?.user?.token as string }));
      if (addMember.fulfilled.match(response)) {
        toast.success("Member added successfully");
        setOpenModal(false);
      }
      if (addMember.rejected.match(response)) {
        toast.error(response.payload as string);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  }
  return (
    <>
      <DynamicModal
        open={openModal}
        setOpen={setOpenModal}
        title="Add Member"
        component={  
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", minWidth: 220 }}>
         <LabelInputContainer className="mb-4">
            <Label htmlFor="email" className="text-white">Members Email</Label>
            <Input
            className="text-black"
              id="email"
              name="email"
              placeholder="member@xyz.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>
        </div>
        }
        btnAction={() => {
          handleAddMember();
        }}
        btnTitle="Add"
      />
    </>
  );
};

export default AddMemberModal;
