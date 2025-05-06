import React from 'react'
import { AnimatedTooltip } from './UI/AnimatedTool-tip'
import { FooterTootTip } from './FooterToolTip';

const Footer = () => {

    return (
        <>
            <footer className="relative w-full h-64 items-center justify-center bg-black text-white flex flex-col">
                {/* Bottom radial gradient */}

                <div className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none block bg-[radial-gradient(80%_80%_at_50%_100%,_rgba(20,157,188,0.4)_0%,_transparent_100%)]" />
                {/* Footer Text */}
                <div className='flex  flex-col gap-6'>
                    <FooterTootTip />
                    <h2 className="text-sm md:text-lg lg:text-xl font-semibold text-center">
                        Made by{" "}
                        <a
                            href="https://pratik-shelar.netlify.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-500"
                        >
                            Pratik Shelar
                        </a>
                    </h2>

                </div>
            </footer>

        </>
    )
}

export default Footer