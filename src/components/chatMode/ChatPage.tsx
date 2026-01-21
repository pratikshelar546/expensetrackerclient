"use client"
import React, { useState, useRef, useEffect } from 'react'
import { useAppDispatch } from '../../../Hooks'
import { addExpense, getAllExpenses, updateExpense, deleteExpenses } from '@/Redux/Slices/ExpensesSlice'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { tableRow, expenseFormData } from '@/assets/commanInterface/ComonInterface'
import { getFieldById } from '@/Redux/Slices/FieldSlice'
import { RxDotsVertical } from "react-icons/rx";
import DynamicModal from '@/CommonComponent/DynamicModal'
import AddNewExpense from '@/components/ManageExpenses/AddNewExpense'
import { useRouter } from 'next/navigation'

const MessageOptions = ({
  onDelete,
  onUpdate
}: {
  onDelete: () => void,
  onUpdate: () => void,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative ml-1">
      <button
        className="flex items-center justify-center w-6 h-6 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-500 focus:outline-none"
        tabIndex={0}
        onClick={() => setOpen((open) => !open)}
      >
        <span className="sr-only">Open message options</span>
        <RxDotsVertical className="w-6 h-6 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none" />
      </button>
      {open && (
        <div
          className="z-[10] absolute right-0 mt-1 min-w-[110px] bg-white border border-neutral-200 shadow-lg rounded-xl text-xs py-1 transition"
          onClick={() => setOpen(false)}
        >
          <button
            className="w-full hover:bg-red-50 px-4 py-2 text-left text-red-700 font-medium rounded-t-xl"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="w-full hover:bg-blue-50 px-4 py-2 text-left text-blue-700 font-medium rounded-b-xl"
            onClick={onUpdate}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

const ChatPage = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { data: session, status } = useSession();
  const token = session?.user?.token || undefined;
  const myId = session?.user?.id;
  const [expenses, setExpenses] = useState<tableRow[]>([])
  const [input, setInput] = useState('')
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [expenseToUpdate, setExpenseToUpdate] = useState<tableRow | null>(null)
  const [updateFormData, setUpdateFormData] = useState<expenseFormData>({
    desc: "",
    date: null,
    category: "",
    price: NaN,
  })
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

  const switchToTableView = () => {
    router.push(`/expofield/${id}`)
  }

  // Scroll to bottom when expenses change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [expenses]);

  // Fetch all expenses
  const fetchAllExpenses = async () => {
    try {
      const expense = await dispatch(getFieldById({ id: id, token: token }));
      if (getFieldById.fulfilled.match(expense)) {
        setExpenses(expense.payload.field.expenses);
      }
    } catch (error) {
      toast.error("Failed to fetch expenses", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleAddExpense = async () => {
    const inputData = input.trim().split(' ');
    if (inputData.length < 3) {
      toast.warning("Please use: category description amount", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    const formData = {
      category: inputData[0],
      desc: inputData.slice(1, inputData.length - 1).join(' '),
      price: parseFloat(inputData[inputData.length - 1]),
      date: new Date(),
    }
    const res = await dispatch(
      addExpense({
        data: formData,
        id: id,
        token: token,
      })
    );
    if (addExpense.fulfilled.match(res)) {
      toast.success(res.payload.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      fetchAllExpenses()
    } else {
      toast.error((res.payload as { message: string }).message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    setInput('')
  };

  // Handle deleting an expense
  const handleDeleteExpense = async (expenseId: string) => {
    try {
      const res = await dispatch(deleteExpenses(expenseId));
      if (deleteExpenses.fulfilled.match(res)) {
        fetchAllExpenses();
        toast.success('Expense deleted', {
          position: "top-right",
          autoClose: 1200,
        });
      } else {
        toast.error('Failed to delete expense', {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (err: any) {
      toast.error('Failed to delete expense', {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Begin 'edit' mode for an expense - open modal
  const handleBeginEdit = (expense: tableRow) => {    
    setExpenseToUpdate(expense);
    setUpdateFormData({
      desc: expense.desc || "",
      category: expense.category || "",
      price: expense.price || NaN,
      date: expense.date ? new Date(expense.date) : null,
    });
    setUpdateModalOpen(true);
  };

  // When updating, dispatch updateExpense
  const handleUpdateExpense = async () => {
    if (!expenseToUpdate?._id) return;
    
    const res = await dispatch(
      updateExpense({
        data: updateFormData,
        id: expenseToUpdate._id as string,
      })
    );
    
    if (updateExpense.fulfilled.match(res)) {
      toast.success('Expense updated', {
        position: "top-right",
        autoClose: 1800,
      });
      fetchAllExpenses();
      setUpdateModalOpen(false);
      setExpenseToUpdate(null);
      setUpdateFormData({
        desc: "",
        date: null,
        category: "",
        price: NaN,
      });
    } else {
      toast.error('Update failed', {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddExpense()
  }

  useEffect(() => {
    if (status === "authenticated" || status === "unauthenticated") {
      fetchAllExpenses()
    }
    // eslint-disable-next-line
  }, [status])

  return (
    <>
      {updateModalOpen && (
        <DynamicModal
          title="Update Expense"
          open={updateModalOpen}
          setOpen={setUpdateModalOpen}
          component={
            <AddNewExpense formData={updateFormData} setFormData={setUpdateFormData} />
          }
          btnTitle="Update Expense"
          btnAction={handleUpdateExpense}
        />
      )}
      <section className="w-full min-h-screen flex flex-col px-2 md:px-4 items-center justify-between bg-[#18181b] pt-20">
        <div className="w-full max-w-3xl flex-1 flex flex-col p-2 md:p-4 overflow-y-auto">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-full flex justify-end mb-4">
              <button
                onClick={switchToTableView}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 rounded-xl transition-all duration-300 border border-blue-500/30"
              >
                <span className="text-sm font-medium">📊 Table View</span>
              </button>
            </div>
            <p className="text-gray-400 mb-4 text-sm md:text-base">This is your Expense Tracker. Add your expense below in the format: <span className="font-semibold text-white">category description amount</span>
              <br /> Example: <span className="text-green-400">Food pizza 200</span>
            </p>
          </div>
          <div className="flex-1 w-full flex flex-col space-y-2 overflow-y-auto pb-6">
            {expenses && expenses?.length === 0 ? (
              <div className="self-center text-gray-500">No expenses yet. Add your first expense below!</div>
            ) : (
              expenses && expenses?.map(exp => {
                // @ts-ignore
                const isMine = exp.userId === myId 
                return (
                  <div
                    key={exp._id}
                    className={`flex flex-col items-${isMine ? 'end' : 'start'} w-full group`}
                  >
                    <span
                      className={`text-xs mb-1 font-medium ${isMine ? "text-[#528379]" : "text-[#5683c7]"} px-2`}
                    >
                      {exp?.userName || "unknown user"}
                    </span>
                    <div
                      className={`
                        relative
                        flex
                        flex-col
                        ${isMine ? "items-end" : "items-start"}
                        w-fit
                        max-w-[75%]
                      `}
                    >
                      <div
                        className={`
                          px-4 py-2
                          text-base
                          shadow
                          ${isMine ? "bg-[#dcf8c6] text-black" : "bg-white text-black"}
                          ${isMine
                            ? "rounded-bl-2xl rounded-tl-2xl rounded-br-md rounded-tr-2xl"
                            : "rounded-br-2xl rounded-tr-2xl rounded-bl-md rounded-tl-2xl"
                          }
                          mb-1
                          break-words
                          transition
                          border
                          border-neutral-200
                          relative
                          ${isMine ? "pr-10" : ""}
                        `}
                        style={{
                          wordBreak: "break-word"
                        }}
                      >
                        {isMine && (
                          <div 
                            className="absolute top-1 right-1 z-20 opacity-80 group-hover:opacity-100 transition-opacity"
                            style={{
                              // slightly offset and brighten the background for the icon button
                              pointerEvents: "auto", // so clicks are received
                            }}
                          >
                            <div className="hover:shadow-lg p-0.5 flex items-center justify-center border bg-transparent">
                              <MessageOptions
                                onDelete={() => handleDeleteExpense(exp._id)}
                                onUpdate={() => handleBeginEdit(exp)}
                              />
                            </div>
                          </div>
                        )}
                        <span className="font-bold">{exp.category} </span>
                        <span className="text-sm">{exp.desc}</span>
                        <div className="mt-1 text-xs text-right font-semibold text-green-800">
                          ₹{(typeof exp.price === 'number' && !isNaN(exp.price)) ? exp.price.toFixed(2) : '0.00'}
                        </div>
                      </div>
                      <span className={`text-[10px] text-gray-400 px-2`}>
                        {(exp.date ? new Date(exp.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "")}
                      </span>
                    </div>
                  </div>
                )
              })
            )}
            <div className='testt' ref={messagesEndRef} />
          </div>
        </div>
        {/* Chat input at bottom */}
        <div className="w-full max-w-3xl p-2 md:p-4 bg-[#24242a] border-t border-neutral-800 flex items-center md:gap-2 gap-1 mb-4 rounded-2xl">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Category description amount"
            className="flex-1 rounded-full px-1 md:px-4 py-1 md:py-2 outline-none bg-neutral-800 text-white shadow"
            autoFocus
          />
          <button
            className="ml-2 px-4 md:px-6 py-1 md:py-2 bg-[#25d366] hover:bg-[#24bb5b] text-white rounded-full font-semibold shadow transition"
            onClick={handleAddExpense}
          >
            Send
          </button>
        </div>
      </section>
      <style>{`
        /* Hide default scrollbar and make iOS-like thin scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(120,120,120,.2);
          border-radius: 4px;
        }
      `}</style>
    </>
  )
}

export default ChatPage