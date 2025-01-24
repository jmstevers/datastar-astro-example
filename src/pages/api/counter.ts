import type { APIRoute } from "astro";
import { ServerSentEventGenerator } from "@datastar/abstractServerSentEventGenerator";
import { sseHeaders } from "@datastar/types";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Counter from "@components/counter.astro";

export const prerender = false;
const container = await AstroContainer.create();

let counter = 0;

export const POST: APIRoute = async () => {
	const fragment = await container.renderToString(Counter, {
		props: { count: ++counter },
	});

	return new Response(
		ServerSentEventGenerator.prototype.mergeFragments(fragment).join(""),
		{ headers: sseHeaders },
	);
};

export const GET: APIRoute = async () => {
	const fragment = await container.renderToString(Counter, {
		props: { count: counter },
	});

	return new Response(
		ServerSentEventGenerator.prototype.mergeFragments(fragment).join(""),
		{ headers: sseHeaders },
	);
};
