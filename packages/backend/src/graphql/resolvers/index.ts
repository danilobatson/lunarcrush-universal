import {
	LunarCrushConfig,
	createLunarCrushClient,
} from '../../services/lunarcrush';

// Utility function to safely extract error messages
const getErrorMessage = (error: unknown): string => {
	if (error instanceof Error) {
		return getErrorMessage(error);
	}
	return String(error);
};

// Create resolvers factory function with EXACT API endpoint mapping
export const createResolvers = (lunarCrushConfig: LunarCrushConfig) => {
	const client = createLunarCrushClient(lunarCrushConfig);

	return {
		Query: {
			health: () =>
				'GraphQL server is running with ALL LunarCrush endpoints! 🚀',

			// ===== TOPICS RESOLVERS (EXACT FROM API DOCS) =====

			getTopicsList: async () => {
				try {
					return await client.getTopicsList();
				} catch (error) {
					console.error('Error fetching topics list:', error);
					throw new Error(
						`Failed to fetch topics list: ${getErrorMessage(error)}`
					);
				}
			},

			getTopic: async (_: any, { topic }: { topic: string }) => {
				try {
					return await client.getTopic(topic);
				} catch (error) {
					console.error('Error fetching topic:', error);
					throw new Error(
						`Failed to fetch topic ${topic}: ${getErrorMessage(error)}`
					);
				}
			},

			getTopicWhatsup: async (_: any, { topic }: { topic: string }) => {
				try {
					return await client.getTopicWhatsup(topic);
				} catch (error) {
					console.error('Error fetching topic whatsup:', error);
					throw new Error(
						`Failed to fetch whatsup for topic ${topic}: ${getErrorMessage(error)}`
					);
				}
			},

			getTopicTimeSeries: async (
				_: any,
				{
					topic,
					bucket,
					interval,
					start,
					end,
				}: {
					topic: string;
					bucket?: string;
					interval?: string;
					start?: string;
					end?: string;
				}
			) => {
				try {
					return await client.getTopicTimeSeries(
						topic,
						bucket,
						interval,
						start,
						end
					);
				} catch (error) {
					console.error('Error fetching topic time series:', error);
					throw new Error(
						`Failed to fetch time series for topic ${topic}: ${getErrorMessage(error)}`
					);
				}
			},

			getTopicTimeSeriesV2: async (
				_: any,
				{
					topic,
					bucket,
				}: {
					topic: string;
					bucket?: string;
				}
			) => {
				try {
					return await client.getTopicTimeSeriesV2(topic, bucket);
				} catch (error) {
					console.error('Error fetching topic time series v2:', error);
					throw new Error(
						`Failed to fetch time series v2 for topic ${topic}: ${getErrorMessage(error)}`
					);
				}
			},

			getTopicPosts: async (
				_: any,
				{
					topic,
					start,
					end,
				}: {
					topic: string;
					start?: string;
					end?: string;
				}
			) => {
				try {
					return await client.getTopicPosts(topic, start, end);
				} catch (error) {
					console.error('Error fetching topic posts:', error);
					throw new Error(
						`Failed to fetch posts for topic ${topic}: ${getErrorMessage(error)}`
					);
				}
			},

			getTopicNews: async (_: any, { topic }: { topic: string }) => {
				try {
					return await client.getTopicNews(topic);
				} catch (error) {
					console.error('Error fetching topic news:', error);
					throw new Error(
						`Failed to fetch news for topic ${topic}: ${getErrorMessage(error)}`
					);
				}
			},

			getTopicCreators: async (_: any, { topic }: { topic: string }) => {
				try {
					return await client.getTopicCreators(topic);
				} catch (error) {
					console.error('Error fetching topic creators:', error);
					throw new Error(
						`Failed to fetch creators for topic ${topic}: ${getErrorMessage(error)}`
					);
				}
			},

			// ===== CATEGORIES RESOLVERS (EXACT FROM API DOCS) =====

			getCategoriesList: async () => {
				try {
					return await client.getCategoriesList();
				} catch (error) {
					console.error('Error fetching categories list:', error);
					throw new Error(
						`Failed to fetch categories list: ${getErrorMessage(error)}`
					);
				}
			},

			getCategory: async (_: any, { category }: { category: string }) => {
				try {
					return await client.getCategory(category);
				} catch (error) {
					console.error('Error fetching category:', error);
					throw new Error(
						`Failed to fetch category ${category}: ${getErrorMessage(error)}`
					);
				}
			},

			getCategoryTopics: async (_: any, { category }: { category: string }) => {
				try {
					return await client.getCategoryTopics(category);
				} catch (error) {
					console.error('Error fetching category topics:', error);
					throw new Error(
						`Failed to fetch topics for category ${category}: ${getErrorMessage(error)}`
					);
				}
			},

			getCategoryTimeSeries: async (
				_: any,
				{
					category,
					bucket,
					interval,
					start,
					end,
				}: {
					category: string;
					bucket?: string;
					interval?: string;
					start?: string;
					end?: string;
				}
			) => {
				try {
					return await client.getCategoryTimeSeries(
						category,
						bucket,
						interval,
						start,
						end
					);
				} catch (error) {
					console.error('Error fetching category time series:', error);
					throw new Error(
						`Failed to fetch time series for category ${category}: ${getErrorMessage(error)}`
					);
				}
			},

			getCategoryPosts: async (
				_: any,
				{
					category,
					start,
					end,
				}: {
					category: string;
					start?: string;
					end?: string;
				}
			) => {
				try {
					return await client.getCategoryPosts(category, start, end);
				} catch (error) {
					console.error('Error fetching category posts:', error);
					throw new Error(
						`Failed to fetch posts for category ${category}: ${getErrorMessage(error)}`
					);
				}
			},

			getCategoryNews: async (_: any, { category }: { category: string }) => {
				try {
					return await client.getCategoryNews(category);
				} catch (error) {
					console.error('Error fetching category news:', error);
					throw new Error(
						`Failed to fetch news for category ${category}: ${getErrorMessage(error)}`
					);
				}
			},

			getCategoryCreators: async (
				_: any,
				{ category }: { category: string }
			) => {
				try {
					return await client.getCategoryCreators(category);
				} catch (error) {
					console.error('Error fetching category creators:', error);
					throw new Error(
						`Failed to fetch creators for category ${category}: ${getErrorMessage(error)}`
					);
				}
			},

			// ===== CREATORS RESOLVERS (EXACT FROM API DOCS) =====

			getCreatorsList: async () => {
				try {
					return await client.getCreatorsList();
				} catch (error) {
					console.error('Error fetching creators list:', error);
					throw new Error(
						`Failed to fetch creators list: ${getErrorMessage(error)}`
					);
				}
			},

			getCreator: async (
				_: any,
				{
					network,
					id,
				}: {
					network: string;
					id: string;
				}
			) => {
				try {
					return await client.getCreator(network, id);
				} catch (error) {
					console.error('Error fetching creator:', error);
					throw new Error(
						`Failed to fetch creator ${network}/${id}: ${getErrorMessage(error)}`
					);
				}
			},

			getCreatorTimeSeries: async (
				_: any,
				{
					network,
					id,
					bucket,
					interval,
					start,
					end,
				}: {
					network: string;
					id: string;
					bucket?: string;
					interval?: string;
					start?: string;
					end?: string;
				}
			) => {
				try {
					return await client.getCreatorTimeSeries(
						network,
						id,
						bucket,
						interval,
						start,
						end
					);
				} catch (error) {
					console.error('Error fetching creator time series:', error);
					throw new Error(
						`Failed to fetch time series for creator ${network}/${id}: ${getErrorMessage(error)}`
					);
				}
			},

			getCreatorPosts: async (
				_: any,
				{
					network,
					id,
					start,
					end,
				}: {
					network: string;
					id: string;
					start?: string;
					end?: string;
				}
			) => {
				try {
					return await client.getCreatorPosts(network, id, start, end);
				} catch (error) {
					console.error('Error fetching creator posts:', error);
					throw new Error(
						`Failed to fetch posts for creator ${network}/${id}: ${getErrorMessage(error)}`
					);
				}
			},

			// ===== POSTS RESOLVERS (EXACT FROM API DOCS) =====

			getPostDetails: async (
				_: any,
				{
					postType,
					postId,
				}: {
					postType: string;
					postId: string;
				}
			) => {
				try {
					return await client.getPostDetails(postType, postId);
				} catch (error) {
					console.error('Error fetching post details:', error);
					throw new Error(
						`Failed to fetch post ${postType}/${postId}: ${getErrorMessage(error)}`
					);
				}
			},

			getPostTimeSeries: async (
				_: any,
				{
					postType,
					postId,
				}: {
					postType: string;
					postId: string;
				}
			) => {
				try {
					return await client.getPostTimeSeries(postType, postId);
				} catch (error) {
					console.error('Error fetching post time series:', error);
					throw new Error(
						`Failed to fetch time series for post ${postType}/${postId}: ${getErrorMessage(error)}`
					);
				}
			},

			// ===== COINS RESOLVERS (EXACT FROM API DOCS) =====

			getCoinsList: async (
				_: any,
				{
					sort,
					filter,
					limit,
					desc,
					page,
				}: {
					sort?: string;
					filter?: string;
					limit?: number;
					desc?: string;
					page?: number;
				}
			) => {
				try {
					return await client.getCoinsList(sort, filter, limit, desc, page);
				} catch (error) {
					console.error('Error fetching coins list:', error);
					throw new Error(
						`Failed to fetch coins list: ${getErrorMessage(error)}`
					);
				}
			},

			getCoinsListV2: async (
				_: any,
				{
					sort,
					filter,
					limit,
					desc,
					page,
				}: {
					sort?: string;
					filter?: string;
					limit?: number;
					desc?: string;
					page?: number;
				}
			) => {
				try {
					return await client.getCoinsListV2(sort, filter, limit, desc, page);
				} catch (error) {
					console.error('Error fetching coins list v2:', error);
					throw new Error(
						`Failed to fetch coins list v2: ${getErrorMessage(error)}`
					);
				}
			},

			getCoin: async (_: any, { coin }: { coin: string }) => {
				try {
					return await client.getCoin(coin);
				} catch (error) {
					console.error('Error fetching coin:', error);
					throw new Error(
						`Failed to fetch coin ${coin}: ${getErrorMessage(error)}`
					);
				}
			},

			getCoinTimeSeries: async (
				_: any,
				{
					coin,
					bucket,
					interval,
					start,
					end,
				}: {
					coin: string;
					bucket?: string;
					interval?: string;
					start?: string;
					end?: string;
				}
			) => {
				try {
					return await client.getCoinTimeSeries(
						coin,
						bucket,
						interval,
						start,
						end
					);
				} catch (error) {
					console.error('Error fetching coin time series:', error);
					throw new Error(
						`Failed to fetch time series for coin ${coin}: ${getErrorMessage(error)}`
					);
				}
			},

			getCoinMeta: async (_: any, { coin }: { coin: string }) => {
				try {
					return await client.getCoinMeta(coin);
				} catch (error) {
					console.error('Error fetching coin metadata:', error);
					throw new Error(
						`Failed to fetch metadata for coin ${coin}: ${getErrorMessage(error)}`
					);
				}
			},

			// ===== STOCKS RESOLVERS (EXACT FROM API DOCS) =====

			getStocksList: async (
				_: any,
				{
					sort,
					limit,
					desc,
					page,
				}: {
					sort?: string;
					limit?: number;
					desc?: string;
					page?: number;
				}
			) => {
				try {
					return await client.getStocksList(sort, limit, desc, page);
				} catch (error) {
					console.error('Error fetching stocks list:', error);
					throw new Error(
						`Failed to fetch stocks list: ${getErrorMessage(error)}`
					);
				}
			},

			getStocksListV2: async (
				_: any,
				{
					sort,
					limit,
					desc,
					page,
				}: {
					sort?: string;
					limit?: number;
					desc?: string;
					page?: number;
				}
			) => {
				try {
					return await client.getStocksListV2(sort, limit, desc, page);
				} catch (error) {
					console.error('Error fetching stocks list v2:', error);
					throw new Error(
						`Failed to fetch stocks list v2: ${getErrorMessage(error)}`
					);
				}
			},

			getStock: async (_: any, { stock }: { stock: string }) => {
				try {
					return await client.getStock(stock);
				} catch (error) {
					console.error('Error fetching stock:', error);
					throw new Error(
						`Failed to fetch stock ${stock}: ${getErrorMessage(error)}`
					);
				}
			},

			getStockTimeSeries: async (
				_: any,
				{
					stock,
					bucket,
					interval,
					start,
					end,
				}: {
					stock: string;
					bucket?: string;
					interval?: string;
					start?: string;
					end?: string;
				}
			) => {
				try {
					return await client.getStockTimeSeries(
						stock,
						bucket,
						interval,
						start,
						end
					);
				} catch (error) {
					console.error('Error fetching stock time series:', error);
					throw new Error(
						`Failed to fetch time series for stock ${stock}: ${getErrorMessage(error)}`
					);
				}
			},

			// ===== NFTS RESOLVERS (EXACT FROM API DOCS) =====

			getNftsList: async (
				_: any,
				{
					sort,
					limit,
					desc,
					page,
				}: {
					sort?: string;
					limit?: number;
					desc?: string;
					page?: number;
				}
			) => {
				try {
					return await client.getNftsList(sort, limit, desc, page);
				} catch (error) {
					console.error('Error fetching NFTs list:', error);
					throw new Error(
						`Failed to fetch NFTs list: ${getErrorMessage(error)}`
					);
				}
			},

			getNftsListV2: async (
				_: any,
				{
					sort,
					limit,
					desc,
					page,
				}: {
					sort?: string;
					limit?: number;
					desc?: string;
					page?: number;
				}
			) => {
				try {
					return await client.getNftsListV2(sort, limit, desc, page);
				} catch (error) {
					console.error('Error fetching NFTs list v2:', error);
					throw new Error(
						`Failed to fetch NFTs list v2: ${getErrorMessage(error)}`
					);
				}
			},

			getNft: async (_: any, { nft }: { nft: string }) => {
				try {
					return await client.getNft(nft);
				} catch (error) {
					console.error('Error fetching NFT:', error);
					throw new Error(
						`Failed to fetch NFT ${nft}: ${getErrorMessage(error)}`
					);
				}
			},

			getNftTimeSeries: async (
				_: any,
				{
					nft,
					bucket,
					interval,
					start,
					end,
				}: {
					nft: string;
					bucket?: string;
					interval?: string;
					start?: string;
					end?: string;
				}
			) => {
				try {
					return await client.getNftTimeSeries(
						nft,
						bucket,
						interval,
						start,
						end
					);
				} catch (error) {
					console.error('Error fetching NFT time series:', error);
					throw new Error(
						`Failed to fetch time series for NFT ${nft}: ${getErrorMessage(error)}`
					);
				}
			},

			getNftTimeSeriesV1: async (_: any, { nft }: { nft: string }) => {
				try {
					return await client.getNftTimeSeriesV1(nft);
				} catch (error) {
					console.error('Error fetching NFT time series v1:', error);
					throw new Error(
						`Failed to fetch time series v1 for NFT ${nft}: ${getErrorMessage(error)}`
					);
				}
			},

			// ===== SYSTEM RESOLVERS (EXACT FROM API DOCS) =====

			getSystemChanges: async () => {
				try {
					return await client.getSystemChanges();
				} catch (error) {
					console.error('Error fetching system changes:', error);
					throw new Error(
						`Failed to fetch system changes: ${getErrorMessage(error)}`
					);
				}
			},

			// ===== SEARCHES RESOLVERS (EXACT FROM API DOCS) =====

			getSearchesList: async () => {
				try {
					return await client.getSearchesList();
				} catch (error) {
					console.error('Error fetching searches list:', error);
					throw new Error(
						`Failed to fetch searches list: ${getErrorMessage(error)}`
					);
				}
			},

			getSearch: async (_: any, { slug }: { slug: string }) => {
				try {
					return await client.getSearch(slug);
				} catch (error) {
					console.error('Error fetching search:', error);
					throw new Error(
						`Failed to fetch search ${slug}: ${getErrorMessage(error)}`
					);
				}
			},

			searchPosts: async (
				_: any,
				{
					term,
					searchJson,
				}: {
					term?: string;
					searchJson?: string;
				}
			) => {
				try {
					return await client.searchPosts(term, searchJson);
				} catch (error) {
					console.error('Error searching posts:', error);
					throw new Error(`Failed to search posts: ${getErrorMessage(error)}`);
				}
			},
		},

		// ===== FUTURE: SUBSCRIPTION RESOLVERS =====
		Subscription: {
			// Placeholder for real-time features matching API endpoints
			topicUpdates: {
				subscribe: () => {
					// TODO: Implement WebSocket subscription for real-time topic updates
					throw new Error('Real-time topic subscriptions not implemented yet');
				},
			},

			cryptoUpdates: {
				subscribe: () => {
					// TODO: Implement WebSocket subscription for real-time crypto updates
					throw new Error('Real-time crypto subscriptions not implemented yet');
				},
			},

			creatorUpdates: {
				subscribe: () => {
					// TODO: Implement WebSocket subscription for real-time creator updates
					throw new Error(
						'Real-time creator subscriptions not implemented yet'
					);
				},
			},
		},
	};
};
