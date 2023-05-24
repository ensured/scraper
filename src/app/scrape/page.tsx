import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import puppeteer from "puppeteer";
import Switch from "@mui/material/Switch";

async function startScraping(data: FormData) {
	"use server";

	// check if the user wants to scrape images
	const scrapeImages = data.get("images")?.valueOf() === "images";
	// check if the user wants to scrape links
	const scrapeLinks = data.get("links")?.valueOf() === "links";

	if (!scrapeImages && !scrapeLinks) {
		throw new Error("Please select at least one option to scrape");
	}

	const browser = await puppeteer.launch({
		headless: true,
	});

	const page = await browser.newPage();
	const url = data.get("websiteUrl")?.valueOf();

	await page.goto(url);

	if (scrapeLinks) {
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
	}

	if (scrapeImages) {
		const scrapedImages = await page.evaluate(() => {
			const imgs = document.querySelectorAll("img");
			return Array.from(imgs).map((img) => img.src);
		});

		const scrapedImagesStr = JSON.stringify(scrapedImages);

		await prisma.scraper.create({
			data: {
				websiteUrl: url,
				scrapedLinks: scrapedImagesStr,
				complete: false,
			},
		});
	}

	browser.close();
	redirect("/");

	// const browser = await puppeteer.launch({
	// 	headless: false,
	// 	args: ["--window-size=1920,1080"],
	// });

	// const page = await browser.newPage();
	// const url = data.get("websiteUrl")?.valueOf();

	// await page.goto(url);
	// // get all of the images on the page
	// const imgSrcs = await page.evaluate(() => {
	// 	const imgs = document.querySelectorAll("img");
	// 	return Array.from(imgs).map((img) => img.src);
	// });
	// console.log(imgSrcs);
	// browser.close();

	// await prisma.scraper.create({
	// 	data: {
	// 		websiteUrl: url,
	// 		scrapedLinks: JSON.stringify(imgSrcs),
	// 		complete: true,
	// 	},
	// });

	redirect("/");
}

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
				<h1 className="text-2xl">Create a new scraping job</h1>
			</header>
			<form action={startScraping} className="flex gap-2 flex-col">
				<input
					type="url"
					name="websiteUrl"
					className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
					placeholder="websiteUrl"
				/>

				<div className="flex items-center gap-2">
					<input
						type="checkbox"
						id="links"
						name="links"
						value="links"
					/>
					<label htmlFor="links" className="text-slate-300">
						links
					</label>
					<input
						type="checkbox"
						id="images"
						name="images"
						value="images"
					/>
					<label htmlFor="images" className="text-slate-300">
						images
					</label>
				</div>

				<div className="flex gap-1 justify-end">
					<Link
						href=".."
						className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">
						Cancel
					</Link>
					<button
						type="submit"
						className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">
						Start
					</button>
				</div>
			</form>
		</>
	);
}
