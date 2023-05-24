import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import puppeteer from "puppeteer";

async function createJob(data: FormData) {
	"use server";
	const url = data.get("websiteUrl")?.valueOf();

	if (typeof url !== "string" || url.length === 0) {
		throw new Error("Invalid Website Url");
	}

	const browser = await puppeteer.launch({
		headless: true,
	});

	const page = await browser.newPage();
	await page.goto(url);

	const scrapedLinks = await page.evaluate(() => {
		const links = document.querySelectorAll("a");
		return Array.from(links).map((link) => link.href);
	});

	// convert the array into a string to be stored in the database
	const scrapedLinksStr = JSON.stringify(scrapedLinks);
	// console log the first 5 results

	await prisma.scraper.create({
		data: {
			websiteUrl: url,
			scrapedLinks: scrapedLinksStr,
			complete: false,
		},
	});
	redirect("/");
}

export default function Page() {
	return (
		<>
			<header className="flex justify-between items-center mb-4">
				<h1 className="text-2xl">New</h1>
			</header>
			<form action={createJob} className="flex gap-2 flex-col">
				<input
					type="text"
					name="websiteUrl"
					className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
					placeholder="websiteUrl"
				/>
				<div className="flex gap-1 justify-end">
					<Link
						href=".."
						className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">
						Cancel
					</Link>
					<button
						type="submit"
						className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">
						Create
					</button>
				</div>
			</form>
		</>
	);
}
