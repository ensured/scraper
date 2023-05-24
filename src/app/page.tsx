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
	// add something to the database just so we have something

	return (
		<>
			<header className="flex justify-between items-center mb-4">
				<h1 className="text-2xl">Scrape Jobs</h1>
				<Link
					className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
					href="/scrape">
					New Job
				</Link>
			</header>
			<ul className="pl-4">
				{todos.reverse().map((todo) => (
					<ScrapeItem
						key={todo.id}
						{...todo}
						toggleTodo={toggleTodo}
					/>
				))}
			</ul>
		</>
	);
}
