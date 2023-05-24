"use client";
import React, { useEffect, useState } from "react";

type ScrapeItemProps = {
	id: string;
	websiteUrl: string;
	scrapedLinks: string | null;
	complete: boolean;
	toggleTodo: (id: string, complete: boolean) => void;
};

export function ScrapeItem({
	id,
	websiteUrl,
	scrapedLinks,
	complete,
	toggleTodo,
}: ScrapeItemProps) {
	const [textareaCols, setTextareaCols] = useState(window.innerWidth / 15);
	useEffect(() => {
		// Function to handle screen resize event
		const handleResize = () => {
			setTextareaCols(window.innerWidth / 15);
		};

		// Attach the event listener on component mount
		window.addEventListener("resize", handleResize);

		// Detach the event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return (
<<<<<<< HEAD
		<li className="flex gap-1 items-center justify-center flex-col">
=======
		<li className="flex gap-1 items-center justify-center flex-col m-4 ">
>>>>>>> 8e93fda89f080ff8d4721661151858e49b268272
			<input
				id={id}
				type="checkbox"
				className="cursor-pointer peer"
				defaultChecked={complete}
				onChange={(e) => toggleTodo(id, e.target.checked)}
			/>
			{/* convert the string back into an array and show the amount of items in the array */}

			<label
				htmlFor={id}
				className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500 text-green-700 font-bold">
				{websiteUrl}{" "}
				<span className="text-xs text-gray-500">
					{scrapedLinks.split(",").length} links
				</span>
			</label>

			<div className="bg-slate-900 rounded-lg p-4 text-slate-200">
				<textarea
					className="bg-transparent border border-slate-300 rounded px-2 py-1 outline-none focus-within:border-slate-100"
<<<<<<< HEAD
					rows={10}
					cols={textareaCols}
=======
					rows={5}
					cols={44}
>>>>>>> 8e93fda89f080ff8d4721661151858e49b268272
					value={scrapedLinks}
					readOnly
				/>
			</div>
		</li>
	);
}
