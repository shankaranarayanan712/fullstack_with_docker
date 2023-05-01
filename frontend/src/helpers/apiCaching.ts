/** @format */

import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';

interface CacheConfig {
	key: string;
	expirationTime: number;
	data: any;
}

interface Cache {
	[key: string]: CacheConfig;
}

interface ApiCache {
	get: (url: string, shouldUseCache: boolean) => Promise<any>;
	clear: () => void;
}
export default function useApiCache(): ApiCache {
	const [cache, setCache] = useState<Cache>({});

	const getCacheKey = (req: AxiosRequestConfig<any>): string => {
		return req.url + JSON.stringify(req.params);
	};

	const get = async (url: string, shouldUseCatch: boolean) => {
		const cacheKey = getCacheKey({ url });
		if (shouldUseCatch) {
			if (
				cache[cacheKey] &&
				cache[cacheKey].expirationTime > new Date().getTime()
			) {
				console.log(`Getting data from cache for ${url}`);
				return cache[cacheKey].data;
			}
		}

		console.log(`Fetching fresh data for ${url}`);
		const response = await axios.get(url);

		setCache({
			...cache,
			[cacheKey]: {
				key: cacheKey,
				expirationTime: new Date().getTime() + 10000,
				data: response.data,
			},
		});

		return response.data;
	};

	const clear = () => {
		setCache({});
	};

	return { get, clear };
}
