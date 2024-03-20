import type { PageServerLoad } from './$types';
import { titles } from '$lib/server/titles';
import { uniform } from '$lib/state';

export const load: PageServerLoad = () => {
	return {
		title: titles[uniform(titles.length)]
	};
};
