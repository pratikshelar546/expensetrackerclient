"use client";
import React from "react";
import { AnimatedTooltip } from "./UI/AnimatedTool-tip";
import { Github, Linkedin, Twitter } from "lucide-react";
const people = [
    {
        id: 1,
        name: "github/pratikshelar546",
        SocialIcon: "https://images.seeklogo.com/logo-png/50/1/github-icon-logo-png_seeklogo-503247.png",
        link:"https://github.com/pratikshelar546"
    },
    {
        id: 2,
        name: "X/PratikShelar03",
        SocialIcon: "https://i.pinimg.com/736x/c8/d3/d4/c8d3d4d12a8ea35b58e35de9ec820a22.jpg",
        link:"https://x.com/PratikShelar03"

    },
    {
        id: 3,
        name: "Linkedin/pratikshelar987",
        SocialIcon: "https://blog.waalaxy.com/wp-content/uploads/2021/01/25.jpg",
        link:"https://www.linkedin.com/in/pratikshelar987/"

    },
    {
        id:4,
        name:"Portfolio/pratik-shelar",
        SocialIcon:"https://i.pinimg.com/736x/e3/4c/2b/e34c2b6aa845b321404416fa6fecefc6.jpg",
        link:"https://pratik-shelar.netlify.app/"

    }

];

export function FooterTootTip() {
    return (
        <div className="flex flex-row items-center justify-center  w-full">
            <AnimatedTooltip items={people} />
        </div>
    );
}
