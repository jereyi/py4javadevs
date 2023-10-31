import React from "react";
import { ClockIcon, ChartBarIcon } from "@heroicons/react/24/solid";

const user: string = "Jessie";
const timeSpent: string = "10 minutes, 5 seconds"
const lessonsCompleted: number = 7;

const Stats = () => {
    return (
    <div className="flex justify-around p-4 max-h-[20%] bg-dim-gray border-black border-2">
        <div className="flex items-center text-white"> 
        <ClockIcon className="h-2/5 w-2/5"> </ClockIcon> 
        <div>
            <div className="text-sm"> Time Spent Today</div>
            <div className="font-cal text-2xl"> {timeSpent} </div>
        </div>
        </div>
        <div className="flex items-center text-white"> 
        <ChartBarIcon className="h-2/5 w-2/5"> </ChartBarIcon> 
        <div>
            <div className="text-sm"> Lessons Completed</div>
            <div className="font-cal text-2xl"> {lessonsCompleted} Lessons </div>
        </div>
        </div>
    </div>);
};

export default Stats;