"use client"
import { addField } from "@/assets/commanInterface/ComonInterface";
import { Button } from "@/CommonComponent/UI/moving-border";
import { createField, getField } from "@/Redux/Slices/FieldSlice";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../Hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ExpandableCardDemo } from "../ManageExpenses/ExpandableCard/ExpandableCard";

export function FixedExpense() {
    const dispatch = useAppDispatch();
    const { data: session, status } = useSession();
    const router = useRouter();
    const [field, setField] = useState();
    useEffect(() => {
        if (status === "unauthenticated") {
            toast.error("To add fixed expense please login first!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            return
        }
        if (session?.user?.token === null) return

        if (status !== "loading") fetchField();

    }, [status])
    const fetchField = async () => {
        const fieldData = await dispatch(getField({ token: session?.user?.token || "", fieldType: "Primary" }));
        if (getField.fulfilled.match(fieldData)) {
            setField(fieldData.payload)
        }
    }

    const handleAddFixedExpense = async () => {

        const feild: addField = {
            fieldName: "Fixed expense",
            fieldType: "Primary",
            RecivedAmount: "",
            expiry: ""
        }
        const createdField = await dispatch(createField({ data: feild, token: session?.user?.token || "" }))

        router.push(`/fixedexpense/${createdField.payload}`)
    }
    return (
        <>
            <section className="flex w-full items-center justify-center min-h-screen relative">
                <div className="flex w-full flex-col max-w-5xl items-center justify-between">
                    <div className="text-white md:w-2/3 text-center">
                        <p className="uppercase text-sm tracking-wide text-sky-400 mb-2">
                            Smart Budgeting
                        </p>
                        <h3 className="font-semibold text-xl">
                            Manage Your Monthly Fixed Expenses Easily
                        </h3>
                        <p className="mt-4 text-gray-300 text-base md:text-lg">
                            Add recurring expenses like{" "}
                            <span className="font-bold text-white">
                                rent, utility bills
                            </span>
                            , and{" "}
                            <span className="font-bold text-white">subscriptions</span> to
                            keep track of your monthly commitments. Easily import them into
                            any <span className="font-bold text-white">Expense Pool</span>{" "}
                            while budgeting.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 flex justify-center md:justify-end h-[12rem]">
                        {field ? <ExpandableCardDemo field={field} fieldType={"Primary"} /> :
                            <Button containerClassName="w-64" onClick={handleAddFixedExpense}>Add Fixed Expense</Button>
                        }
                    </div>
                </div>
            </section>
        </>
    );
}
