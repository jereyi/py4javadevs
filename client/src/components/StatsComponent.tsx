import { useContext } from "react";
import { CalendarDaysIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import { CasUserContext } from "../context/casUserContext";
import { nameToDetailsMap } from "../utils/constants";



const Stats = (props: { user: any }) => {

    const lessonsCompleted = props.user?.completedLessons.filter((lesson: String) => nameToDetailsMap.has(lesson)).length;

    return (
        <div className="flex justify-around max-h-[20%] bg-dim-gray border-black border-2">
            <div className="flex items-center text-white">
                <CalendarDaysIcon className="hidden md:block h-2/5 w-2/5"> </CalendarDaysIcon>
                <div>
                    <div> Date Joined  </div>
                    <div className="hidden lg:block font-cal text-3xl"> {props.user?.firstLogin.toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                    </div>
                    <div className="lg:hidden font-cal text-3xl"> {props.user?.firstLogin.toLocaleDateString("en-US", {
                        month: 'numeric',
                        day: 'numeric',
                    })} </div>
                </div>
            </div>
            <div className="flex items-center text-white">
                <ChartBarIcon className="hidden md:block h-2/5 w-2/5"> </ChartBarIcon>
                <div>
                    <div> Lessons Completed</div>
                    <div className="font-cal hidden lg:block text-3xl"> {`${lessonsCompleted}/${nameToDetailsMap.size} Lessons`} </div>
                    <div className="font-cal lg:hidden text-3xl"> {`${lessonsCompleted}/${nameToDetailsMap.size}`} </div>
                </div>
            </div>
        </div>);
};

export default Stats;