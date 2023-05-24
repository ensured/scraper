import { ScrapeItem } from "@/components/ScrapeItem";
import { prisma } from "@/db";
import Link from "next/link";

async function getTodos() {
	return prisma.scraper.findMany({ orderBy: { id: "desc" } });
}

async function toggleTodo(id: string, complete: boolean) {
	"use server";
	await prisma.scraper.update({ where: { id }, data: { complete } });
}

export default async function Home() {
	const todos = await getTodos();

	return (
		<>
			<header className="flex justify-between items-center mb-4">
<<<<<<< HEAD
				<h1 className="text-2xl">Website Scraper</h1>
=======
				<h1 className="text-2xl">Scrape Jobs</h1>
>>>>>>> 8e93fda89f080ff8d4721661151858e49b268272
				<Link
					className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
					href="/scrape">
					New Job
				</Link>
			</header>
<<<<<<< HEAD
			<ul className="flex flex-col gap-8">
				{todos.map((todo) => (
=======
			<ul className="pl-4">
				{todos.reverse().map((todo) => (
>>>>>>> 8e93fda89f080ff8d4721661151858e49b268272
					<ScrapeItem
						key={todo.id}
						id={todo.id}
						complete={todo.complete}
						websiteUrl={todo.websiteUrl}
						scrapedLinks={todo.scrapedLinks}
						toggleTodo={toggleTodo}
					/>
				))}
			</ul>
		</>
	);
}
