"use client";
import React, { useState } from "react";
import { Label } from "../../../CommonComponent/UI/Label";
import { Input } from "../../../CommonComponent/UI/Input";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { createField } from "@/Redux/Slices/FieldSlice";
import { addField } from "@/assets/commanInterface/ComonInterface";
import { useAppDispatch } from "../../../../Hooks";
import { ModalClose } from "@/CommonComponent/UI/animated-modal";

export function AddFieldForm() {
  const dispatch = useAppDispatch();
  const [field, setField] = useState<addField>({
    fieldName: "",
    RecivedAmount: "",
  });
  const [validate, setValidate] = useState(true);

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setField((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (field.fieldName === "") {
      setValidate(false);
    } else {
      setValidate(true);
      await dispatch(createField(field));
      setField({ fieldName: "",
        RecivedAmount: "",})
    }
  };

  console.log(validate);

  return (
    <div className="dark max-w-md w-full mx-auto rounded-none md:rounded-2xl shadow-input bg-transparent dark:bg-transparent">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Add New Field
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Add another field where you can manage your expenses
      </p>

      <form className="mt-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="fieldName">Field Name</Label>
          <Input
            id="fieldName"
            
            name="fieldName"
            placeholder="Field 1"
            type="text"
            value={field.fieldName ? field.fieldName : ""}
            onChange={(e) => handleOnChange(e)}
          />
        </LabelInputContainer>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="RecivedAmount"> Amount</Label>
            <Input
              id="RecivedAmount"
              placeholder="9999"
              name="RecivedAmount"
              value={field.RecivedAmount ? field.RecivedAmount : ""}
              type="number"
              onChange={(e) => handleOnChange(e)}
            />
          </LabelInputContainer>
        </div>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <ModalClose
          validate={validate}
          className="dark bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        >
          Add Field &rarr;
          <BottomGradient />
        </ModalClose>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="dark group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="dark group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default AddFieldForm;
