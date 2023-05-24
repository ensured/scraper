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
		<li className="flex gap-1 items-center justify-center flex-col">
			<input
				id={id}
				type="checkbox"
				className="cursor-pointer peer"
				defaultChecked={complete}
				onChange={(e) => toggleTodo(id, e.target.checked)}
			/>
			<label
				htmlFor={id}
				className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500 text-green-700 font-bold">
				{websiteUrl}
			</label>

			<div className="bg-slate-900 rounded-lg p-4 text-slate-200">
				<textarea
					className="bg-transparent border border-slate-300 rounded px-2 py-1 outline-none focus-within:border-slate-100"
					rows={10}
					cols={textareaCols}
					value={scrapedLinks}
					readOnly
				/>
			</div>
		</li>
	);
}
