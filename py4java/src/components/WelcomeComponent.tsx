import React from "react";

const user: string = "Jessie";

const Welcome = () => {
    return (
    <div className="bg-dim-gray py-8 px-24 rounded-xl border-black border-2">
        <div>
            <div>
                <h1 className="text-3xl font-semibold font-cal text-white mb-5"> Welcome {user}! </h1>
                <h2 className="w-2/3 text-white mb-10"> Unlock the power of Python with our consise lessons and exercises tailored for Java developed. </h2>

                <button className="border-2 border-black z-10 text-lg rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] w-1/3 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0 max-w-full"> Start </button>
            </div>
        </div>

    </div>);
};

export default Welcome;