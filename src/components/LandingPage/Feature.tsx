import { Grid } from "@/CommonComponent/UI/Feature";
import React from "react";
import { FaDailymotion } from "react-icons/fa";
import * as motion from "framer-motion/client";
import { Label } from "@radix-ui/react-label";
import { Chip } from "@mui/material";
const Feature = () => {

const features = [
   {
    title:"Daily Expense Management",
    description:"Easily track and categorize your daily expenses. Add receipts, set budgets, and stay on top of your spending habits.",
    logo:FaDailymotion,
    upcoming:false
   },
   {
    title:"Monthly Expense Planning",
    description:"Plan and track your monthly expenses with customizable categories. Set monthly budgets and receive insights on your spending patterns.",
    logo:FaDailymotion,
    upcoming:false

   },
   {
    title:"Recurring Expense Automation",
    description:"Set up recurring expenses that automatically carry forward each month. Get email notifications and make adjustments as needed.",
    logo:FaDailymotion,
    upcoming:false

   },{
    title:"Team Collaboration",
    description:"Work together with family or colleagues. Create parent-child relationships for expense tracking with customizable access controls.",
    logo:FaDailymotion,
    upcoming:true
   },
   {
    title:"Balance Sheet Generation",
    description:"Create events or projects and automatically generate balance sheets when they're complete. Perfect for tracking project finances.",
    logo:FaDailymotion,
    upcoming:true
   },
   {
    title:"AI-Powered Receipt Scanning",
    description:"Let our AI read your receipts and automatically add expenses to your account. Save time and reduce manual data entry.",
    logo:FaDailymotion,
    upcoming:true
   },
   
]
  return (
    <motion.div 
    variants={{
      hidden: { opacity: 0, y: 75 },
      visible: { opacity: 1, y: 0 }
    }}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="pt-20 lg:pt-40 pb-10 flex flex-col justify-center items-center"
    >
      <motion.h1 
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-white text-center font-semibold text-3xl mb-4"
      >
        Powerful Features for Complete Financial Control
      </motion.h1>
      <motion.h3 
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-neutral-600 text-center max-w-3xl font-normal text-xl mb-8"
      >
        ExpensWise comes packed with everything you need to manage your expenses efficiently.
      </motion.h3>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-8 max-w-7xl mx-auto"
      >
      {
        features.map((feat, i) => (
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 50 },
              visible: { opacity: 1, scale: 1, y: 0 }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 * i }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            key={feat.title}
            className="relative bg-gradient-to-b from-neutral-900 to-neutral-950 p-6 rounded-3xl overflow-hidden"
          >
            <Grid size={20} />
            <div className="flex w-full justify-between items-center">

            <p className="text-base font-bold text-white relative z-20">
              {feat.title}
            </p>
           { feat.upcoming &&<Chip label="Upcoming" color="primary" variant="outlined" />}
            </div>
            <p className="text-neutral-400 mt-4 text-base font-normal relative z-20">
              {feat.description}
            </p>
          </motion.div>
        ))
      }
      </motion.div>
    </motion.div>
  );
};

export default Feature;
