import { useContext } from "react";
import { CalendarDaysIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import { CasUserContext } from "../context/casUserContext";
import { nameToDetailsMap } from "../utils/constants";



const Stats = () => {
    const { user } = useContext(CasUserContext)!;

    const lessonsCompleted = user?.completedLessons.filter((lesson: String) => nameToDetailsMap.has(lesson)).length;

    return (
    <div className="flex justify-around max-h-[20%] bg-dim-gray border-black border-2">
        <div className="flex items-center text-white"> 
        <CalendarDaysIcon className="h-2/5 w-2/5"> </CalendarDaysIcon> 
        <div>
            <div> Date Joined  </div>
            <div className="font-cal text-3xl"> {user?.lastLogin.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })} </div>
        </div>
        </div>
        <div className="flex items-center text-white"> 
        <ChartBarIcon className="h-2/5 w-2/5"> </ChartBarIcon> 
        <div>
            <div> Lessons Completed</div>
            <div className="font-cal text-3xl"> {lessonsCompleted === 1 ? "1 Lesson" : `${lessonsCompleted} Lessons`} </div>
        </div>
        </div>
    </div>);
};

export default Stats;