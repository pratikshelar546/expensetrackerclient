import React from 'react'

const HowITWorks = () => {
    const howItWorksSteps = [
        {
            stepTitle: "Create Your Account",
            description: "Sign up using your Google account or email. This gives you access to your personal dashboard where all your expenses are managed securely.",
            link: "/signup"
        },
        {
            stepTitle: "Create or Join an Expense Pool",
            description: "Click on 'Add Expense' or go to the 'Expense Pool' tab. Expense pools let you group related expenses like monthly budgets, trips, or events.",
            link: "/expense-pool"
        },
        {
            stepTitle: "Add Fixed Expenses (Optional)",
            description: "Save time by adding recurring expenses like rent, food, or savings as fixed expenses. Use the floating button in your pool to quickly merge them each month.",
            link: "/fixed-expense"
        },
        {
            stepTitle: "Track Daily Expenses",
            description: "Manually add your daily spendings with category tags and optional receipt uploads. Stay aware of your daily financial habits.",
            link: "/daily-expense"
        },
        {
            stepTitle: "Plan Monthly Budget",
            description: "Set spending limits for each category and track your budget performance over the month. Adjust as needed to stay on track.",
            link: "/monthly-budget"
        },
        {
            stepTitle: "Automate Recurring Expenses",
            description: "Enable recurring expenses to auto-add common monthly costs. Get reminders and edit them when things change.",
            link: "/recurring-expense"
        }
    ];

    return (
        <section className=' wrapper text-neutral-300 text-center min-h-screen'>
            <div className='flex justify-center items-center w-full flex-col'>
                <h2 className='title'>Manage Your Expenses in {howItWorksSteps?.length} Simple Steps</h2>
                <div className='grid grid-cols-1 sm:grid-cols-3 w-full gap-6 md:gap-16 mt-10'>
                    {
                        howItWorksSteps.map((data, index) => (
                            <div key={index} className='text-white p-5 bg-zinc-950 shadow-cyan-950 shadow-lg '>
                                <h1 className='text-sm md:text-base lg:text-lg font-medium'>{data.stepTitle}</h1>
                                <h4 className='text-neutral-400 mt-4 text-sm font-normal relative'>{data.description}</h4>
                            </div>
                        ))
                    }

                </div>
            </div>
        </section>
    )
}

export default HowITWorks