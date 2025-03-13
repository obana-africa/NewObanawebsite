import React from "react";

const Seperator = () => {
	return (
		<div className="relative bg-[#DCFBF9] border-b-2 border-primary w-[150px] sm:w-[336px] h-[4px] sm:h-[8px] ">
			<div
				className="absolute w-full  rounded-[5px]"
				style={{ height: "2px", top: "3px" }}
			></div>
			<div
				className="absolute  rounded-[5px] left-1/2 -translate-x-1/2"
				style={{ width: "40px", height: "8px", top: "0" }}
			></div>
		</div>
	);
};

export default Seperator;
