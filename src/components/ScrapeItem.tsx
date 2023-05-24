"use client";

type ScrapeItemProps = {
	id: string;
	websiteUrl: string;
	scrapedLinks: string;
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
	return (
		<li className="flex gap-1 items-center justify-center flex-col m-4 ">
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

			<div className="block">
				<textarea
					className="bg-transparent border border-slate-300 rounded px-2 py-1 outline-none focus-within:border-slate-100"
					rows={5}
					cols={44}
					value={scrapedLinks}
					readOnly
				/>
			</div>
		</li>
	);
}
