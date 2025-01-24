import type { APIRoute } from "astro";
import { ServerSentEventGenerator } from "@datastar/serverSentEventGenerator";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Counter from "@components/counter.astro";

export const prerender = false;
const container = await AstroContainer.create();

let counter = 0;

export const POST: APIRoute = async () => {
	const fragment = await container.renderToString(Counter, {
		props: { count: ++counter },
	});

	return ServerSentEventGenerator.stream((stream) => {
		stream.mergeFragments(fragment);
	});
};

export const GET: APIRoute = async () => {
	const fragment = await container.renderToString(Counter, {
		props: { count: counter },
	});

	return ServerSentEventGenerator.stream((stream) => {
		stream.mergeFragments(fragment);
	});
};
