### Topics List

https://lunarcrush.com/api4/public/topics/list/v1

Get a list of trending social topics.

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/topics/list/v1
```



Example response:

```json
{
  "data": [
    {
      "topic": "youtube",
      "title": "YouTube",
      "topic_rank": 1,
      "topic_rank_1h_previous": 1,
      "topic_rank_24h_previous": 1,
      "num_contributors": 385038,
      "num_posts": 767001,
      "interactions_24h": 3136501345
    }
  ]
}
```

Schema:

+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **title**: The case sensitive title of the topic or category
+ **topic_rank**: LunarCrush metric for ranking a social topic relative to all other social topics
+ **topic_rank_1h_previous**: The topic rank from 1 hour ago
+ **topic_rank_24h_previous**: The topic rank from 24 hours ago
+ **num_contributors**: The number of unique social contributors to the topic
+ **num_posts**: Total number of posts with interactions on this topic in the last 24 hours
+ **interactions_24h**: Number of interactions in the last 24 hours




---

### Topic Whatsup

https://lunarcrush.com/api4/public/topic/:topic/whatsup/v1

Generate an AI summary of the hottest news and social posts for a specific topic

input parameters:

+ **topic**: _Provide the topic to get a summary for. A topic must be all lower case and can only include letters, numbers, spaces, # and $._ **required**

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/topic/bitcoin/whatsup/v1
```



Example response:

```json
{
  "config": {
    "topic": "bitcoin",
    "generated": 1750604539
  },
  "summary": "Geopolitical tensions between the US and Iran are escalating, with a recent US airstrike on Iran's nuclear facility, causing concerns of a potential conflict that could impact global markets. Meanwhile, major players in the Bitcoin market, such as Michael Saylor, are continuing to invest in and promote the cryptocurrency. Bitcoin's daily transactions have also reached a new record high, despite some market volatility."
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data




---

### Topic Time Series v2

https://lunarcrush.com/api4/public/topic/:topic/time-series/v2

Get historical time series data for a social topic

input parameters:

+ **topic**: _Provide the topic to get details for. A topic must be all lower case and can only include letters, numbers, spaces, # and $._ **required**
+ **bucket**: _Leave blank (default) for the most week aggregated by hour, specify hour for full historical data available in hourly aggregation, specify day for full historical data available in daily aggregation._

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/topic/bitcoin/time-series/v2
```



Example response:

```json
{
  "config": {
    "topic": "bitcoin",
    "id": "bitcoin",
    "name": "Bitcoin",
    "symbol": "BTC",
    "interval": "1w",
    "start": 1749945600,
    "end": 1750611778,
    "bucket": "hour",
    "metrics": [],
    "generated": 1750604578
  },
  "data": [
    {
      "time": 1749945600,
      "contributors_active": 13585,
      "contributors_created": 546,
      "interactions": 3041957,
      "posts_active": 25526,
      "posts_created": 845,
      "sentiment": 78,
      "spam": 318,
      "alt_rank": 202,
      "circulating_supply": 19878000,
      "close": 105518,
      "galaxy_score": 63,
      "high": 105518,
      "low": 105518,
      "market_cap": 2097459568061,
      "market_dominance": 64.1536,
      "open": 105518,
      "social_dominance": 19.2543,
      "volume_24h": 36078485406
    }
  ]
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **id**: LunarCrush internal ID for the asset
+ **name**: The full name of the asset
+ **symbol**: The symbol for the asset
+ **interval**: Typically used for specifying time intervals like 1w = 1 week, 1m = 1 month etc
+ **start**: Start/from unix timestamp (in seconds)
+ **end**: End/to unix timestamp (in seconds)
+ **bucket**: Data is generally bucketed into hours or days
+ **metrics**: Comma separated list of metrics to include or that are included
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **time**: A unix timestamp (in seconds)
+ **contributors_active**: number of unique social accounts with posts that have interactions
+ **contributors_created**: number of unique social accounts that created new posts
+ **interactions**: number of all publicly measurable interactions on a social post (views, likes, comments, thumbs up, upvote, share etc)
+ **posts_active**: number of unique social posts with interactions
+ **posts_created**: number of unique social posts created
+ **sentiment**: % of posts (weighted by interactions) that are positive. 100% means all posts are positive, 50% is half positive and half negative, and 0% is all negative posts.
+ **spam**: The number of posts created that are considered spam
+ **alt_rank**: A proprietary score based on how an asset is performing relative to all other assets supported
+ **circulating_supply**: Circulating Supply is the total number of coins or tokens that are actively available for trade and are being used in the market and in general public
+ **close**: Close price for the time period
+ **galaxy_score**: A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
+ **high**: Higest price fo rthe time period
+ **low**: Lowest price for the time period
+ **market_cap**: Total dollar market value of all circulating supply or outstanding shares
+ **market_dominance**: The percent of the total market cap that this asset represents
+ **open**: Open price for the time period
+ **social_dominance**: The percent of the total social volume that this topic represents
+ **volume_24h**: Volume in USD for 24 hours up to this data point




---

### Topic Time Series

https://lunarcrush.com/api4/public/topic/:topic/time-series/v1

Get historical time series data for a social topic

input parameters:

+ **topic**: _Provide the topic to get details for. A topic must be all lower case and can only include letters, numbers, spaces, # and $._ **required**
+ **bucket**: _bucket time series data into hours or days. default is hours._
+ **interval**: _Use interval to specify the start and end time automatically for convenience. If "start" or "end" parameters are provided this parameter is ignored._
+ **start**: _The start time (unix timestamp) to go back to._
+ **end**: _The end time (unix timestamp) to stop at._

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/topic/bitcoin/time-series/v1
```



Example response:

```json
{
  "config": {
    "topic": "bitcoin",
    "id": "bitcoin",
    "name": "Bitcoin",
    "symbol": "BTC",
    "interval": "1w",
    "start": 1749945600,
    "end": 1750611778,
    "bucket": "hour",
    "metrics": [],
    "generated": 1750604578
  },
  "data": [
    {
      "time": 1749945600,
      "contributors_active": 13585,
      "contributors_created": 546,
      "interactions": 3041957,
      "posts_active": 25526,
      "posts_created": 845,
      "sentiment": 78,
      "spam": 318,
      "alt_rank": 202,
      "circulating_supply": 19878000,
      "close": 105518,
      "galaxy_score": 63,
      "high": 105518,
      "low": 105518,
      "market_cap": 2097459568061,
      "market_dominance": 64.1536,
      "open": 105518,
      "social_dominance": 19.2543,
      "volume_24h": 36078485406
    }
  ]
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **id**: LunarCrush internal ID for the asset
+ **name**: The full name of the asset
+ **symbol**: The symbol for the asset
+ **interval**: Typically used for specifying time intervals like 1w = 1 week, 1m = 1 month etc
+ **start**: Start/from unix timestamp (in seconds)
+ **end**: End/to unix timestamp (in seconds)
+ **bucket**: Data is generally bucketed into hours or days
+ **metrics**: Comma separated list of metrics to include or that are included
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **time**: A unix timestamp (in seconds)
+ **contributors_active**: number of unique social accounts with posts that have interactions
+ **contributors_created**: number of unique social accounts that created new posts
+ **interactions**: number of all publicly measurable interactions on a social post (views, likes, comments, thumbs up, upvote, share etc)
+ **posts_active**: number of unique social posts with interactions
+ **posts_created**: number of unique social posts created
+ **sentiment**: % of posts (weighted by interactions) that are positive. 100% means all posts are positive, 50% is half positive and half negative, and 0% is all negative posts.
+ **spam**: The number of posts created that are considered spam
+ **alt_rank**: A proprietary score based on how an asset is performing relative to all other assets supported
+ **circulating_supply**: Circulating Supply is the total number of coins or tokens that are actively available for trade and are being used in the market and in general public
+ **close**: Close price for the time period
+ **galaxy_score**: A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
+ **high**: Higest price fo rthe time period
+ **low**: Lowest price for the time period
+ **market_cap**: Total dollar market value of all circulating supply or outstanding shares
+ **market_dominance**: The percent of the total market cap that this asset represents
+ **open**: Open price for the time period
+ **social_dominance**: The percent of the total social volume that this topic represents
+ **volume_24h**: Volume in USD for 24 hours up to this data point




---

### Topic Posts

https://lunarcrush.com/api4/public/topic/:topic/posts/v1

Get the top posts for a social topic. If start time is provided the result will be the top posts by interactions for the time range. If start is not provided it will be the most recent top posts by interactions from the last 24 hours.

input parameters:

+ **topic**: _Provide the topic to get details for. A topic must be all lower case and can only include letters, numbers, spaces, # and $._ **required**
+ **start**: _The start time (unix timestamp) to start at. Will be rounded to the beginning of the day. If the end parameter is not provided it will just be the top posts for this day._
+ **end**: _(Optional) The end time (unix timestamp) to stop at. Will be rounded to the end of the day._

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/topic/bitcoin/posts/v1
```



Example response:

```json
{
  "config": {
    "topic": "bitcoin",
    "type": "topic",
    "id": "bitcoin",
    "name": "Bitcoin",
    "symbol": "BTC",
    "generated": 1750604578
  },
  "data": [
    {
      "id": "1936795529641381994",
      "post_type": "tweet",
      "post_title": "🚨🇮🇷 AYATOLLAH: BACKING DOWN WON’T STOP U.S. DEMANDS\n\nIn a 2015 speech ahead of the nuclear deal talks, Iran’s Supreme Leader warned that U.S. pressure on Iran would not end even if Tehran made concessions on its nuclear program:\n\n“If you back down on the nuclear issue, will your problem with the U.S. be over?\n\nNo, sir.\n\nThen comes the missile issue: ‘Why do you have missiles?’\n\nIf they become discouraged about the missile issue, then comes the resistance issue: ‘Why do you support Hezbollah, Hamas and Palestine?’\n\nIf you resolve that and back down, then comes the human rights issue.\n\nIf you settle the human rights issue and say, ‘Alright, we’ll act according to your standards on human rights,’ then comes the issue of religion’s involvement in the government.\n\nThey won’t leave you alone.”\n\nThoughts?\n\nSource: History Unchained",
      "post_link": "https://x.com/MarioNawfal/status/1936795529641381994",
      "post_image": "https://pbs.twimg.com/amplify_video_thumb/1936795336762093568/img/6GHCy9ATIGk12gDx.jpg",
      "post_created": 1750603012,
      "post_sentiment": 3.05,
      "creator_id": "twitter::1319287761048723458",
      "creator_name": "MarioNawfal",
      "creator_display_name": "Mario Nawfal",
      "creator_followers": 2274269,
      "creator_avatar": "https://pbs.twimg.com/profile_images/1670905743619268609/pYItlWat_200x200.jpg",
      "interactions_24h": 85530,
      "interactions_total": 85523
    }
  ]
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **type**: Type of item or social network of item e.g. tweet, youtube-video, tiktok, x, youtube, category, topic, creator/influencer
+ **id**: Unique id of the social post
+ **name**: The full name of the asset
+ **symbol**: The symbol for the asset
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **post_type**: The type of social post
+ **post_title**: The title text of the social post
+ **post_link**: The URL to view the social post on the social network
+ **post_image**: The URL to the primary image for the post if available
+ **post_created**: The unix timestamp of our best indication of when the post was created
+ **post_sentiment**: The sentiment of the post is a score between 1 and 5 with 1 being very negative, 3 being neutral, and 5 being very positive. A score of 3.5 is considered slightly positive.
+ **creator_id**: The [network]::[unique_id] for the influencer
+ **creator_name**: The unique screen name for the influencer
+ **creator_display_name**: The chosen display name for the influencer if available
+ **creator_followers**: number of followers the account has
+ **creator_avatar**: The URL to the avatar for the creator
+ **interactions_24h**: Number of interactions in the last 24 hours
+ **interactions_total**: Number of total interactions




---

### Topic News

https://lunarcrush.com/api4/public/topic/:topic/news/v1

Get the top news posts for a social topic. Top news is determined by the metrics related to the social posts that mention the news posts.

input parameters:

+ **topic**: _Provide the topic to get details for. A topic must be all lower case and can only include letters, numbers, spaces, # and $._ **required**

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/topic/bitcoin/news/v1
```



Example response:

```json
{
  "config": {
    "topic": "bitcoin",
    "type": "topic",
    "id": "bitcoin",
    "name": "Bitcoin",
    "symbol": "BTC",
    "generated": 1750604579
  },
  "data": [
    {
      "id": "cryptoslate.com-866082279",
      "post_type": "news",
      "post_title": "Oil markets tense amid U.S. airstrikes on Iran, while Bitcoin price holds steady",
      "post_link": "https://cryptoslate.com/oil-markets-tense-amid-u-s-airstrikes-on-iran-while-bitcoin-price-holds-steady/",
      "post_image": "https://cryptoslate.com/wp-content/uploads/2025/06/bitcoin-iran-oil.jpg",
      "post_created": 1750597873,
      "post_sentiment": 2.9,
      "creator_id": "twitter::893284234042855424",
      "creator_name": "CryptoSlate",
      "creator_display_name": "CryptoSlate",
      "creator_followers": 65250,
      "creator_avatar": "https://pbs.twimg.com/profile_images/918797950821720064/s_rTndi0_200x200.jpg",
      "interactions_24h": 773,
      "interactions_total": 773
    }
  ]
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **type**: Type of item or social network of item e.g. tweet, youtube-video, tiktok, x, youtube, category, topic, creator/influencer
+ **id**: LunarCrush internal ID for the asset
+ **name**: The full name of the asset
+ **symbol**: The symbol for the asset
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **post_type**: The type of social post
+ **post_title**: The title text of the social post
+ **post_link**: The URL to view the social post on the social network
+ **post_image**: The URL to the primary image for the post if available
+ **post_created**: The unix timestamp of our best indication of when the post was created
+ **post_sentiment**: The sentiment of the post is a score between 1 and 5 with 1 being very negative, 3 being neutral, and 5 being very positive. A score of 3.5 is considered slightly positive.
+ **creator_id**: The [network]::[unique_id] for the influencer
+ **creator_name**: The unique screen name for the influencer
+ **creator_display_name**: The chosen display name for the influencer if available
+ **creator_followers**: number of followers the account has
+ **creator_avatar**: The URL to the avatar for the creator
+ **interactions_24h**: Number of interactions in the last 24 hours
+ **interactions_total**: Number of total interactions




---

### Topic Creators

https://lunarcrush.com/api4/public/topic/:topic/creators/v1

Get the top creators for a social topic

input parameters:

+ **topic**: _Provide the topic to get details for. A topic must be all lower case and can only include letters, numbers, spaces, # and $._ **required**

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/topic/bitcoin/creators/v1
```



Example response:

```json
{
  "data": [
    {
      "creator_id": "twitter::1387497871751196672",
      "creator_name": "WatcherGuru",
      "creator_avatar": "https://pbs.twimg.com/profile_images/1641221212578754562/DfiC0KW2_200x200.png",
      "creator_followers": 3225820,
      "creator_rank": 1,
      "interactions_24h": 2363691
    }
  ]
}
```

Schema:

+ **creator_id**: The [network]::[unique_id] for the influencer
+ **creator_name**: The unique screen name for the influencer
+ **creator_avatar**: The URL to the avatar for the creator
+ **creator_followers**: number of followers the account has
+ **creator_rank**: ranking based on all posts in the last 24 hours that have interactions
+ **interactions_24h**: Number of interactions in the last 24 hours




---

### Category

https://lunarcrush.com/api4/public/category/:category/v1

Get summary information for a social category

input parameters:

+ **category**: _Provide the category to get details for. A category must be all lower case and can only include letters, numbers, and spaces. A category is the aggregation of all posts for all topics within the category._ **required**

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/category/musicians/v1
```



Example response:

```json
{
  "data": {
    "topic": "_musicians",
    "title": "Musicians",
    "related_topics": [
      "aerosmith"
    ],
    "types_count": {
      "youtube-video": 185513,
      "tweet": 268945,
      "news": 739,
      "tiktok-video": 77852,
      "reddit-post": 16045
    },
    "types_interactions": {
      "youtube-video": 1166179496,
      "tweet": 193744498,
      "news": 840832,
      "tiktok-video": 372208383,
      "reddit-post": 1506103
    },
    "types_sentiment": {
      "youtube-video": 66,
      "tweet": 69,
      "news": 84,
      "tiktok-video": 70,
      "reddit-post": 72
    },
    "types_sentiment_detail": {
      "youtube-video": {
        "positive": 321462182,
        "neutral": 689855117,
        "negative": 154862197
      },
      "tweet": {
        "positive": 72538239,
        "neutral": 90570560,
        "negative": 30635699
      },
      "news": {
        "positive": 576066,
        "neutral": 206411,
        "negative": 58355
      },
      "tiktok-video": {
        "positive": 109010951,
        "neutral": 218319482,
        "negative": 44877950
      },
      "reddit-post": {
        "positive": 479944,
        "neutral": 713858,
        "negative": 312301
      }
    },
    "interactions_24h": 1734479312,
    "num_contributors": 299706,
    "num_posts": 549094,
    "trend": "down"
  }
}
```

Schema:

+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **title**: The case sensitive title of the topic or category
+ **related_topics**: an array of related topics
+ **types_count**: An object with the counts of the total number of unique posts getting interactions from each social network in the last 24 hours
+ **types_interactions**: An object with the counts of the total number of interactions on each post from each social network in the last 24 hours
+ **types_sentiment**: An object with the sentiment score broken down by each supported social network. 0% is all posts negative, 100% is all posts positive. 50% is equal positive and negative posts. Each post is weighted by interactions.
+ **types_sentiment_detail**: An object with the breakdown of positive, neutral, and negative posts by 24h interactions for each social network
+ **interactions_24h**: Number of interactions in the last 24 hours
+ **num_contributors**: The number of unique social contributors to the topic
+ **num_posts**: Total number of posts with interactions on this topic in the last 24 hours
+ **trend**: One of up, down or flat to represent the general trend in interactions




---

### Category Topics

https://lunarcrush.com/api4/public/category/:category/topics/v1

Get the top topics for a social category

input parameters:

+ **category**: _Provide the topic to get details for. A topic must be all lower case and can only include letters, numbers, spaces, # and $._ **required**

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/category/musicians/topics/v1
```



Example response:

```json
{
  "data": [
    {
      "topic": 3038,
      "title": "Aerosmith",
      "topic_rank": 1920,
      "topic_rank_1h_previous": 1974,
      "topic_rank_24h_previous": 2119,
      "num_contributors": 1300,
      "social_dominance": 0.16494894119461234,
      "num_posts": 1752,
      "interactions_24h": 3429842
    }
  ]
}
```

Schema:

+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **title**: The case sensitive title of the topic or category
+ **topic_rank**: LunarCrush metric for ranking a social topic relative to all other social topics
+ **topic_rank_1h_previous**: The topic rank from 1 hour ago
+ **topic_rank_24h_previous**: The topic rank from 24 hours ago
+ **num_contributors**: The number of unique social contributors to the topic
+ **social_dominance**: The percent of the total social volume that this topic represents
+ **num_posts**: Total number of posts with interactions on this topic in the last 24 hours
+ **interactions_24h**: Number of interactions in the last 24 hours




---

### Category Time Series

https://lunarcrush.com/api4/public/category/:category/time-series/v1

Get historical time series data for a social category

input parameters:

+ **category**: _Provide the category to get details for. A category must be all lower case and can only include letters, numbers, and spaces._ **required**
+ **bucket**: _bucket time series data into hours or days. default is hours._
+ **interval**: _Use interval to specify the start and end time automatically for convenience. If "start" or "end" parameters are provided this parameter is ignored._
+ **start**: _The start time (unix timestamp) to go back to._
+ **end**: _The end time (unix timestamp) to stop at._

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/category/cryptocurrencies/time-series/v1
```



Example response:

```json
{
  "config": {
    "category": "cryptocurrencies",
    "topic": "_cryptocurrencies",
    "type": "topic",
    "id": "_cryptocurrencies",
    "interval": "1w",
    "start": 1749945600,
    "end": 1750611779,
    "bucket": "hour",
    "metrics": [],
    "remote_api": "danode2-13",
    "generated": 1750604579
  },
  "data": [
    {
      "time": 1749945600,
      "contributors_active": 61252,
      "contributors_created": 2996,
      "interactions": 9654967,
      "posts_active": 132573,
      "posts_created": 4431,
      "sentiment": 79,
      "spam": 776
    }
  ]
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **category**: LunarCrush social category. Can only includes letters, numbers and spaces
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **type**: Type of item or social network of item e.g. tweet, youtube-video, tiktok, x, youtube, category, topic, creator/influencer
+ **id**: LunarCrush internal ID for the asset
+ **interval**: Typically used for specifying time intervals like 1w = 1 week, 1m = 1 month etc
+ **start**: Start/from unix timestamp (in seconds)
+ **end**: End/to unix timestamp (in seconds)
+ **bucket**: Data is generally bucketed into hours or days
+ **metrics**: Comma separated list of metrics to include or that are included
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **time**: A unix timestamp (in seconds)
+ **contributors_active**: number of unique social accounts with posts that have interactions
+ **contributors_created**: number of unique social accounts that created new posts
+ **interactions**: number of all publicly measurable interactions on a social post (views, likes, comments, thumbs up, upvote, share etc)
+ **posts_active**: number of unique social posts with interactions
+ **posts_created**: number of unique social posts created
+ **sentiment**: % of posts (weighted by interactions) that are positive. 100% means all posts are positive, 50% is half positive and half negative, and 0% is all negative posts.
+ **spam**: The number of posts created that are considered spam




---

### Category Posts

https://lunarcrush.com/api4/public/category/:category/posts/v1

Get the top posts for a social topic. If start time is provided the result will be the top posts by interactions for the time range. If start is not provided it will be the most recent top posts by interactions from the last 24 hours.

input parameters:

+ **category**: _Provide the category to get details for. A category must be all lower case and can only include letters, numbers, and spaces._ **required**
+ **start**: _The start time (unix timestamp) to start at. Will be rounded to the beginning of the day. If the end parameter is not provided it will just be the top posts for this day._
+ **end**: _(Optional) The end time (unix timestamp) to stop at. Will be rounded to the end of the day._

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/category/cryptocurrencies/posts/v1
```



Example response:

```json
{
  "config": {
    "category": "cryptocurrencies",
    "type": "topic",
    "id": "_cryptocurrencies",
    "topic": "_cryptocurrencies",
    "generated": 1750604579
  },
  "data": [
    {
      "id": "1936792768409411886",
      "post_type": "tweet",
      "post_title": "Sorry Jim, but the worst-case scenario was never a nuclear launch.\n\nIt’s the Ayatollah activating jihad cells across CONUS, triggering  a massive prolonged U.S. boots-on-the-ground response that alienates more allies and drains our already thin stockpiles giving China the green light on WW3.\n\nRemote? Yes. But it’s still on the table.",
      "post_link": "https://x.com/johnkonrad/status/1936792768409411886",
      "post_image": null,
      "post_created": 1750602354,
      "post_sentiment": 2.79,
      "creator_id": "twitter::5900252",
      "creator_name": "johnkonrad",
      "creator_display_name": "John Ʌ Konrad V",
      "creator_followers": 73111,
      "creator_avatar": "https://pbs.twimg.com/profile_images/1791225086025850880/hHSyL7d4_200x200.jpg",
      "interactions_24h": 69735,
      "interactions_total": 69735
    }
  ]
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **category**: LunarCrush social category. Can only includes letters, numbers and spaces
+ **type**: Type of item or social network of item e.g. tweet, youtube-video, tiktok, x, youtube, category, topic, creator/influencer
+ **id**: Unique id of the social post
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **post_type**: The type of social post
+ **post_title**: The title text of the social post
+ **post_link**: The URL to view the social post on the social network
+ **post_image**: The URL to the primary image for the post if available
+ **post_created**: The unix timestamp of our best indication of when the post was created
+ **post_sentiment**: The sentiment of the post is a score between 1 and 5 with 1 being very negative, 3 being neutral, and 5 being very positive. A score of 3.5 is considered slightly positive.
+ **creator_id**: The [network]::[unique_id] for the influencer
+ **creator_name**: The unique screen name for the influencer
+ **creator_display_name**: The chosen display name for the influencer if available
+ **creator_followers**: number of followers the account has
+ **creator_avatar**: The URL to the avatar for the creator
+ **interactions_24h**: Number of interactions in the last 24 hours
+ **interactions_total**: Number of total interactions




---

### Category News

https://lunarcrush.com/api4/public/category/:category/news/v1

Get the top news posts for a category. Top news is determined by the metrics related to the social posts that mention the news posts.

input parameters:

+ **category**: _Provide the category to get details for. A category must be all lower case and can only include letters, numbers, and spaces._ **required**

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/category/cryptocurrencies/news/v1
```



Example response:

```json
{
  "config": {
    "category": "cryptocurrencies",
    "type": "topic",
    "id": "_cryptocurrencies",
    "topic": "_cryptocurrencies",
    "generated": 1750604579
  },
  "data": [
    {
      "id": "cryptoslate.com-866082279",
      "post_type": "news",
      "post_title": "Oil markets tense amid U.S. airstrikes on Iran, while Bitcoin price holds steady",
      "post_link": "https://cryptoslate.com/oil-markets-tense-amid-u-s-airstrikes-on-iran-while-bitcoin-price-holds-steady/",
      "post_image": "https://cryptoslate.com/wp-content/uploads/2025/06/bitcoin-iran-oil.jpg",
      "post_created": 1750597873,
      "post_sentiment": 2.9,
      "creator_id": "twitter::893284234042855424",
      "creator_name": "CryptoSlate",
      "creator_display_name": "CryptoSlate",
      "creator_followers": 65250,
      "creator_avatar": "https://pbs.twimg.com/profile_images/918797950821720064/s_rTndi0_200x200.jpg",
      "interactions_24h": 773,
      "interactions_total": 773
    }
  ]
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **category**: LunarCrush social category. Can only includes letters, numbers and spaces
+ **type**: Type of item or social network of item e.g. tweet, youtube-video, tiktok, x, youtube, category, topic, creator/influencer
+ **id**: LunarCrush internal ID for the asset
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **post_type**: The type of social post
+ **post_title**: The title text of the social post
+ **post_link**: The URL to view the social post on the social network
+ **post_image**: The URL to the primary image for the post if available
+ **post_created**: The unix timestamp of our best indication of when the post was created
+ **post_sentiment**: The sentiment of the post is a score between 1 and 5 with 1 being very negative, 3 being neutral, and 5 being very positive. A score of 3.5 is considered slightly positive.
+ **creator_id**: The [network]::[unique_id] for the influencer
+ **creator_name**: The unique screen name for the influencer
+ **creator_display_name**: The chosen display name for the influencer if available
+ **creator_followers**: number of followers the account has
+ **creator_avatar**: The URL to the avatar for the creator
+ **interactions_24h**: Number of interactions in the last 24 hours
+ **interactions_total**: Number of total interactions




---

### Category Creators

https://lunarcrush.com/api4/public/category/:category/creators/v1

Get the top creators for a social category

input parameters:

+ **category**: _Provide the category to get details for. A category must be all lower case and can only include letters, numbers, and spaces._ **required**

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/category/musicians/creators/v1
```



Example response:

```json
{
  "data": [
    {
      "creator_id": "youtube::UCVvlTmyH1b4Pyf2LSRUn43w",
      "creator_name": "popupfacts1m",
      "creator_avatar": "https://yt3.ggpht.com/HFqoOSzx6aTYsggcSrI3WY_srDkKV3MDaxz8rT-Tc4bLsxi1Qx8iZ8qWJ4mGeIh5fuJSqwPx0zc=s88-c-k-c0x00ffffff-no-rj",
      "creator_followers": 4090000,
      "creator_rank": 1,
      "interactions_24h": 29049088
    }
  ]
}
```

Schema:

+ **creator_id**: The [network]::[unique_id] for the influencer
+ **creator_name**: The unique screen name for the influencer
+ **creator_avatar**: The URL to the avatar for the creator
+ **creator_followers**: number of followers the account has
+ **creator_rank**: ranking based on all posts in the last 24 hours that have interactions
+ **interactions_24h**: Number of interactions in the last 24 hours




---

### Categories List

https://lunarcrush.com/api4/public/categories/list/v1

Get a list of trending social categories.

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/categories/list/v1
```



Example response:

```json
{
  "data": [
    {
      "category": "mlb",
      "title": "MLB",
      "category_rank": 22,
      "category_rank_1h_previous": 21,
      "category_rank_24h_previous": 17,
      "num_contributors": 17562,
      "social_dominance": 0.2575968309936907,
      "num_posts": 45698,
      "interactions_24h": 96195328
    }
  ]
}
```

Schema:

+ **category**: LunarCrush social category. Can only includes letters, numbers and spaces
+ **title**: The case sensitive title of the topic or category
+ **category_rank**: LunarCrush metric for ranking a social topic relative to all other social topics
+ **category_rank_1h_previous**: The topic rank from 1 hour ago
+ **category_rank_24h_previous**: The topic rank from 24 hours ago
+ **num_contributors**: The number of unique social contributors to the topic
+ **social_dominance**: The percent of the total social volume that this topic represents
+ **num_posts**: Total number of posts with interactions on this topic in the last 24 hours
+ **interactions_24h**: Number of interactions in the last 24 hours




---

### Creators List

https://lunarcrush.com/api4/public/creators/list/v1

Get a list of trending social creators over all of social based on interactions. To get lists of creators by category or topic see the topics and categories endpoints.

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/creators/list/v1
```



Example response:

```json
{
  "data": [
    {
      "creator_name": "FoxNews",
      "creator_display_name": "Fox News",
      "creator_id": "1367531",
      "creator_network": "twitter",
      "creator_avatar": "https://pbs.twimg.com/profile_images/1591278197844414464/O6Fp0hFB_200x200.jpg",
      "creator_followers": 26630472,
      "creator_posts": 2163,
      "creator_rank": 1,
      "interactions_24h": 677288136
    }
  ]
}
```

Schema:

+ **creator_name**: The unique screen name for the influencer
+ **creator_display_name**: The chosen display name for the influencer if available
+ **creator_id**: The [network]::[unique_id] for the influencer
+ **creator_network**: The social network for the post or influencer. We still refer to x as twitter out of developer preference.
+ **creator_avatar**: The URL to the avatar for the creator
+ **creator_followers**: number of followers the account has
+ **creator_posts**: total number of posts with interactions in the last 24 hours
+ **creator_rank**: ranking based on all posts in the last 24 hours that have interactions
+ **interactions_24h**: Number of interactions in the last 24 hours




---

### Creator

https://lunarcrush.com/api4/public/creator/:network/:id/v1

Get detail information on a specific creator

input parameters:

+ **network**: _Provide the network for the creator. One of twitter, youtube, instagram, reddit, or tiktok_ **required**
+ **id**: _Provide the unique ID or screen name of the creator_ **required**

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/creator/twitter/elonmusk/v1
```



Example response:

```json
{
  "data": {
    "creator_id": "twitter::44196397",
    "creator_name": "elonmusk",
    "creator_display_name": "Elon Musk",
    "creator_avatar": "https://pbs.twimg.com/profile_images/1936002956333080576/kqqe2iWO_200x200.jpg",
    "creator_followers": 221116247,
    "creator_rank": "5",
    "interactions_24h": 123371528,
    "topic_influence": [
      {
        "topic": "elon musk",
        "count": 247,
        "percent": 3.85,
        "rank": 1
      }
    ]
  }
}
```

Schema:

+ **creator_id**: The [network]::[unique_id] for the influencer
+ **creator_name**: The unique screen name for the influencer
+ **creator_display_name**: The chosen display name for the influencer if available
+ **creator_avatar**: The URL to the avatar for the creator
+ **creator_followers**: number of followers the account has
+ **creator_rank**: ranking based on all posts in the last 24 hours that have interactions
+ **interactions_24h**: Number of interactions in the last 24 hours
+ **topic_influence**: an array of social topics and the creators ranking on each topic
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $




---

### Creator Time Series

https://lunarcrush.com/api4/public/creator/:network/:id/time-series/v1

Get time series data on a creator.

input parameters:

+ **network**: _Influencer social network_ **required**
+ **id**: _The unique id or screen name of the creator_ **required**
+ **bucket**: _bucket time series data into hours or days. default is hours._
+ **interval**: _Use interval to specify the start and end time automatically for convenience. If "start" or "end" parameters are provided this parameter is ignored._
+ **start**: _The start time (unix timestamp) to go back to._
+ **end**: _The end time (unix timestamp) to stop at._

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/creator/twitter/lunarcrush/time-series/v1
```



Example response:

```json
{
  "config": {
    "network": "twitter",
    "influencer_id": "twitter::988992203568562176",
    "interval": "1w",
    "start": 1749945600,
    "end": 1750636800,
    "bucket": "hour",
    "name": "lunarcrush",
    "remote_api": "danode1-13",
    "generated": 1750604580
  },
  "data": [
    {
      "time": 1749945600,
      "followers": 312073,
      "interactions": 676,
      "posts_active": 22,
      "creator_rank": 291188
    }
  ]
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **network**: The social network for the post or influencer. We still refer to x as twitter out of developer preference.
+ **interval**: Typically used for specifying time intervals like 1w = 1 week, 1m = 1 month etc
+ **start**: Start/from unix timestamp (in seconds)
+ **end**: End/to unix timestamp (in seconds)
+ **bucket**: Data is generally bucketed into hours or days
+ **name**: The full name of the asset
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **time**: A unix timestamp (in seconds)
+ **followers**: The number of publicly displayed followers the creator has
+ **interactions**: number of all publicly measurable interactions on a social post (views, likes, comments, thumbs up, upvote, share etc)
+ **posts_active**: number of unique social posts with interactions
+ **creator_rank**: ranking based on all posts in the last 24 hours that have interactions




---

### Creator Posts

https://lunarcrush.com/api4/public/creator/:network/:id/posts/v1

Get the top posts for a specific creator.

input parameters:

+ **network**: _Network for the creator. One of twitter, youtube, instagram, reddit, or tiktok_ **required**
+ **id**: _Unique ID or screen name of the creator_ **required**
+ **start**: _The start time (unix timestamp) to start at. Will be rounded to the beginning of the day. If the end parameter is not provided it will just be the top posts for this day._
+ **end**: _(Optional) The end time (unix timestamp) to stop at. Will be rounded to the end of the day._

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/creator/twitter/elonmusk/posts/v1
```



Example response:

```json
{
  "data": [
    {
      "id": "1822352993422901402",
      "post_type": "tweet",
      "post_title": "",
      "post_created": 1723317785,
      "post_sentiment": 3,
      "post_link": "https://x.com/elonmusk/status/1822352993422901402",
      "post_image": "https://pbs.twimg.com/media/GUpMY1xX0AA9VV1.jpg",
      "creator_id": "twitter::44196397",
      "creator_name": "elonmusk",
      "creator_display_name": "Elon Musk",
      "creator_followers": 221113861,
      "creator_avatar": "https://pbs.twimg.com/profile_images/1936002956333080576/kqqe2iWO_200x200.jpg",
      "interactions_24h": 0,
      "interactions_total": 75468620
    }
  ]
}
```

Schema:

+ **id**: Unique id of the social post
+ **post_type**: The type of social post
+ **post_title**: The title text of the social post
+ **post_created**: The unix timestamp of our best indication of when the post was created
+ **post_sentiment**: The sentiment of the post is a score between 1 and 5 with 1 being very negative, 3 being neutral, and 5 being very positive. A score of 3.5 is considered slightly positive.
+ **post_link**: The URL to view the social post on the social network
+ **post_image**: The URL to the primary image for the post if available
+ **creator_id**: The [network]::[unique_id] for the influencer
+ **creator_name**: The unique screen name for the influencer
+ **creator_display_name**: The chosen display name for the influencer if available
+ **creator_followers**: number of followers the account has
+ **creator_avatar**: The URL to the avatar for the creator
+ **interactions_24h**: Number of interactions in the last 24 hours
+ **interactions_total**: Number of total interactions




---

### Posts

https://lunarcrush.com/api4/public/posts/:post_type/:post_id/v1

Get details of a post

input parameters:

+ **post_type**: _The post type e.g. tweet, youtube-video, tiktok-video, reddit-post, instagram-post_ **required**
+ **post_id**: _The unique id of a post, for twitter it is a number, youtube it is the id in the url after watch?v=, look in the url for the unique id_ **required**

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/posts/tweet/1756378079893782591/v1
```



Example response:

```json
{
  "type": "tweet",
  "id": "1756378079893782591",
  "title": "Social activity is 👆 across the board today. \n\n🤔 What are y'all talking about? \n🫡 We've got you covered.\n\n👩‍💻 Technology\n💬 Social Networks\n👨‍🎤 Musicians\n🕺 Celebrities\n🌏 Countries\n🎮 Gaming\n🏖️ Travel\n🚗 Automotive\n🥷 Cryptocurrencies\n🇺🇸 US Election\n\n🚀 https://t.co/AI5yuZEyi7 https://t.co/T0mqJBiyx0",
  "description": null,
  "extraText": "https://lunarcrush.com/categories?rpp=300&page=1&cols=topic_rank%2Ccontributors_active%2Cposts_active%2Caverage_sentiment%2Cinteractions_24h%2Cinteractions_trend",
  "metrics": {
    "bookmarks": 2,
    "favorites": 20,
    "retweets": 3,
    "replies": 13,
    "views": 13004
  },
  "image": {
    "src": "https://pbs.twimg.com/media/GF_n3GQaoAA23sT.jpg",
    "width": 2048,
    "height": 989
  },
  "video": null,
  "images": null,
  "creator_id": "twitter::988992203568562176",
  "creator_name": "LunarCrush",
  "creator_display_name": "LunarCrush Analytics",
  "creator_avatar": "https://pbs.twimg.com/profile_images/1863747720827244545/xoSWaM53_200x200.png",
  "topics": [
    "analytics"
  ],
  "categories": []
}
```

Schema:

+ **type**: Type of item or social network of item e.g. tweet, youtube-video, tiktok, x, youtube, category, topic, creator/influencer
+ **id**: Unique id of the social post
+ **title**: Title of the social post
+ **description**: Explanation of the change and the potential impact
+ **extraText**: Extra text for the post for search matching like the retweet text or text included in the video
+ **metrics**: Comma separated list of metrics to include or that are included
+ **image**: Provides the url/src width and height of a the image in the post if available
+ **video**: Provides the url/src width and height of a the video in the post if available
+ **images**: Provides the url/src width and height of a the images in the post if available
+ **creator_id**: The [network]::[unique_id] for the influencer
+ **creator_name**: The unique screen name for the influencer
+ **creator_display_name**: The chosen display name for the influencer if available
+ **creator_avatar**: The URL to the avatar for the creator
+ **categories**: an array of categories this topic aggregates into




---

### Posts Time Series

https://lunarcrush.com/api4/public/posts/:post_type/:post_id/time-series/v1

Get interactions over time for a post. If a post is older than 365 days the time series will be returned as daily interactions, otherwise it hourly interactions

input parameters:

+ **post_type**: _The post type e.g. tweet, youtube-video, tiktok-video, reddit-post, instagram-post_ **required**
+ **post_id**: _The unique id of a post, for twitter it is a number, youtube it is the id in the url after watch?v=, look in the url for the unique id_ **required**

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/posts/tweet/1756378079893782591/time-series/v1
```



Example response:

```json
{
  "data": [
    {
      "time": "1707523200",
      "interactions": 24
    }
  ]
}
```

Schema:

+ **time**: A unix timestamp (in seconds)
+ **interactions**: number of all publicly measurable interactions on a social post (views, likes, comments, thumbs up, upvote, share etc)




---

### Coins List v2

https://lunarcrush.com/api4/public/coins/list/v2

Get a general snapshot of LunarCrush metrics on the entire list of tracked coins. It is designed as a lightweight mechanism for monitoring the universe of available assets, either in aggregate or relative to each other. Metrics include Galaxy Score™, AltRank™, price, volatility, 24h percent change, market cap, social mentions, social interactions, social contributors, social dominance, and categories.

input parameters:

+ **sort**: _sort the output by metric_
+ **filter**: _filter by sub categories / sector from the "categories" key. Separate by commas for multiple matches. Available sectors can be found on the sector filters at https://lunarcrush.com/categories/cryptocurrencies_
+ **limit**: _limit the number of results. Default is 10 maximum is 1000 per page._
+ **desc**: _Pass any value as desc and the output will be reversed (descending)_
+ **page**: _When using limit, set the page of results to display, pages start at 0_

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/coins/list/v2
```



Example response:

```json
{
  "config": {
    "sort": "market_cap_rank",
    "desc": true,
    "limit": 0,
    "page": 0,
    "total_rows": 6702,
    "generated": 1750604580
  },
  "data": [
    {
      "id": 1,
      "symbol": "BTC",
      "name": "Bitcoin",
      "price": 99657.46614104915,
      "price_btc": 1,
      "volume_24h": 57466730199.45,
      "volatility": 0.0085,
      "circulating_supply": 19882203,
      "max_supply": 21000000,
      "percent_change_1h": -1.268568893685,
      "percent_change_24h": -3.903850097286,
      "percent_change_7d": -5.714108608402,
      "market_cap": 1981409972281.97,
      "market_cap_rank": 1,
      "interactions_24h": 83998832,
      "social_volume_24h": 154647,
      "social_dominance": 25.434692508091892,
      "market_dominance": 64.33585088736577,
      "market_dominance_prev": 61.92270671246963,
      "galaxy_score": 39.9,
      "galaxy_score_previous": 35,
      "alt_rank": 212,
      "alt_rank_previous": 80,
      "sentiment": 73,
      "categories": "layer-1,bitcoin-ecosystem,pow",
      "blockchains": [
        {
          "type": "layer1",
          "network": "bitcoin",
          "address": null,
          "decimals": null
        }
      ],
      "percent_change_30d": -9.261189616616,
      "last_updated_price": 1750604568,
      "last_updated_price_by": "cmc_stream",
      "topic": "btc bitcoin",
      "logo": "https://cdn.lunarcrush.com/bitcoin.png"
    }
  ]
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **id**: LunarCrush internal ID for the asset
+ **symbol**: The symbol for the asset
+ **name**: The full name of the asset
+ **price**: Current price in USD
+ **price_btc**: Current price in BTC
+ **volume_24h**: Volume in USD for 24 hours up to this data point
+ **volatility**: Volatility is calculated as the standard deviation of the price.
+ **circulating_supply**: Circulating Supply is the total number of coins or tokens that are actively available for trade and are being used in the market and in general public
+ **max_supply**: The maximum supply of the asset if available
+ **percent_change_1h**: Percent change in price since 1 hour ago
+ **percent_change_24h**: Percent change in price since 24 hours ago
+ **percent_change_7d**: Percent change in price since 7 days ago
+ **market_cap**: Total dollar market value of all circulating supply or outstanding shares
+ **market_cap_rank**: The rank of the asset by market cap with additional filtering to remove outliers and bad market data.
+ **interactions_24h**: Number of interactions in the last 24 hours
+ **social_volume_24h**: Total number of posts with interactions on this topic in the last 24 hours
+ **social_dominance**: The percent of the total social volume that this topic represents
+ **market_dominance**: The percent of the total market cap that this asset represents
+ **galaxy_score**: A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
+ **galaxy_score_previous**: The galaxy score from the previous 24 hours
+ **alt_rank**: A proprietary score based on how an asset is performing relative to all other assets supported
+ **alt_rank_previous**: The alt rank from the previous 24 hours
+ **sentiment**: % of posts (weighted by interactions) that are positive. 100% means all posts are positive, 50% is half positive and half negative, and 0% is all negative posts.
+ **categories**: A comma delimited string of sub categories/sectors this asset belongs to
+ **blockchains**: An array of blockchains that the asset is part of including the contract address and decimals if applicable
+ **type**: Type of item or social network of item e.g. tweet, youtube-video, tiktok, x, youtube, category, topic, creator/influencer
+ **network**: The name of the blockchain or network
+ **address**: The contract address, zero or null means it is a layer 1
+ **percent_change_30d**: Percent change in price since 30 days ago
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **logo**: The URL to the logo for the asset, topic, or category




---

### Coins List

https://lunarcrush.com/api4/public/coins/list/v1

Get a general snapshot of LunarCrush metrics on the entire list of tracked coins. This version is heavily cached and up to 1 hour behind. It is designed as a lightweight mechanism for monitoring the universe of available assets, either in aggregate or relative to each other. Metrics include Galaxy Score™, AltRank™, price, volatility, 24h percent change, market cap, social mentions, social interactions, social contributors, social dominance, and categories. Use the coins/list/v2 endpoint for data updated every few seconds.

input parameters:

+ **sort**: _sort the output by metric_
+ **filter**: _filter by sub categories / sector from the "categories" key. Separate by commas for multiple matches. Available sectors can be found on the sector filters at https://lunarcrush.com/categories/cryptocurrencies_
+ **limit**: _limit the number of results. Default is 10 maximum is 1000 per page._
+ **desc**: _Pass any value as desc and the output will be reversed (descending)_
+ **page**: _When using limit, set the page of results to display, pages start at 0_

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/coins/list/v1
```



Example response:

```json
{
  "config": {
    "sort": "market_cap_rank",
    "desc": true,
    "limit": 0,
    "page": 0,
    "total_rows": 6702,
    "generated": 1750604581
  },
  "data": [
    {
      "id": 1,
      "symbol": "BTC",
      "name": "Bitcoin",
      "price": 99657.46614104915,
      "price_btc": 1,
      "volume_24h": 57466730199.45,
      "volatility": 0.0085,
      "circulating_supply": 19882203,
      "max_supply": 21000000,
      "percent_change_1h": -1.268568893685,
      "percent_change_24h": -3.903850097286,
      "percent_change_7d": -5.714108608402,
      "market_cap": 1981409972281.97,
      "market_cap_rank": 1,
      "interactions_24h": 83998832,
      "social_volume_24h": 154647,
      "social_dominance": 25.434692508091892,
      "market_dominance": 64.33585088736577,
      "market_dominance_prev": 61.92270671246963,
      "galaxy_score": 39.9,
      "galaxy_score_previous": 35,
      "alt_rank": 212,
      "alt_rank_previous": 80,
      "sentiment": 73,
      "categories": "layer-1,bitcoin-ecosystem,pow",
      "blockchains": [
        {
          "type": "layer1",
          "network": "bitcoin",
          "address": null,
          "decimals": null
        }
      ],
      "percent_change_30d": -9.261189616616,
      "last_updated_price": 1750604568,
      "last_updated_price_by": "cmc_stream",
      "topic": "btc bitcoin",
      "logo": "https://cdn.lunarcrush.com/bitcoin.png"
    }
  ]
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **id**: LunarCrush internal ID for the asset
+ **symbol**: The symbol for the asset
+ **name**: The full name of the asset
+ **price**: Current price in USD
+ **price_btc**: Current price in BTC
+ **volume_24h**: Volume in USD for 24 hours up to this data point
+ **volatility**: Volatility is calculated as the standard deviation of the price.
+ **circulating_supply**: Circulating Supply is the total number of coins or tokens that are actively available for trade and are being used in the market and in general public
+ **max_supply**: The maximum supply of the asset if available
+ **percent_change_1h**: Percent change in price since 1 hour ago
+ **percent_change_24h**: Percent change in price since 24 hours ago
+ **percent_change_7d**: Percent change in price since 7 days ago
+ **market_cap**: Total dollar market value of all circulating supply or outstanding shares
+ **market_cap_rank**: The rank of the asset by market cap with additional filtering to remove outliers and bad market data.
+ **interactions_24h**: Number of interactions in the last 24 hours
+ **social_volume_24h**: Total number of posts with interactions on this topic in the last 24 hours
+ **social_dominance**: The percent of the total social volume that this topic represents
+ **market_dominance**: The percent of the total market cap that this asset represents
+ **galaxy_score**: A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
+ **galaxy_score_previous**: The galaxy score from the previous 24 hours
+ **alt_rank**: A proprietary score based on how an asset is performing relative to all other assets supported
+ **alt_rank_previous**: The alt rank from the previous 24 hours
+ **sentiment**: % of posts (weighted by interactions) that are positive. 100% means all posts are positive, 50% is half positive and half negative, and 0% is all negative posts.
+ **categories**: A comma delimited string of sub categories/sectors this asset belongs to
+ **blockchains**: An array of blockchains that the asset is part of including the contract address and decimals if applicable
+ **type**: Type of item or social network of item e.g. tweet, youtube-video, tiktok, x, youtube, category, topic, creator/influencer
+ **network**: The name of the blockchain or network
+ **address**: The contract address, zero or null means it is a layer 1
+ **percent_change_30d**: Percent change in price since 30 days ago
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **logo**: The URL to the logo for the asset, topic, or category




---

### Coins

https://lunarcrush.com/api4/public/coins/:coin/v1

Get market data on a coin or token. Specify the coin to be queried by providing the numeric ID or the symbol of the coin in the input parameter, which can be found by calling the /coins/list endpoint.

input parameters:

+ **coin**: _provide the numeric id or symbol of the coin or token._ **required**

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/coins/2/v1
```



Example response:

```json
{
  "config": {
    "id": "coins:2",
    "name": "Ethereum",
    "symbol": "ETH",
    "topic": "ethereum",
    "generated": 1750604581
  },
  "data": {
    "id": 2,
    "name": "Ethereum",
    "symbol": "ETH",
    "price": 2202.244756267511,
    "price_btc": 0.022098141178409924,
    "market_cap": 265855146098.44,
    "percent_change_24h": -9.179698099472,
    "percent_change_7d": -13.630813857861,
    "percent_change_30d": -14.639810404722,
    "volume_24h": 26688468380.12,
    "max_supply": null,
    "circulating_supply": 120720072.25,
    "close": 2202.244756267511,
    "galaxy_score": 65.8,
    "alt_rank": 476,
    "volatility": 0.0343,
    "market_cap_rank": 2
  }
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **id**: LunarCrush internal ID for the asset
+ **name**: The full name of the asset
+ **symbol**: The symbol for the asset
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **price**: Current price in USD
+ **price_btc**: Current price in BTC
+ **market_cap**: Total dollar market value of all circulating supply or outstanding shares
+ **percent_change_24h**: Percent change in price since 24 hours ago
+ **percent_change_7d**: Percent change in price since 7 days ago
+ **percent_change_30d**: Percent change in price since 30 days ago
+ **volume_24h**: Volume in USD for 24 hours up to this data point
+ **max_supply**: The maximum supply of the asset if available
+ **circulating_supply**: Circulating Supply is the total number of coins or tokens that are actively available for trade and are being used in the market and in general public
+ **close**: Close price for the time period
+ **galaxy_score**: A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
+ **alt_rank**: A proprietary score based on how an asset is performing relative to all other assets supported
+ **volatility**: Volatility is calculated as the standard deviation of the price.
+ **market_cap_rank**: The rank of the asset by market cap with additional filtering to remove outliers and bad market data.




---

### Coins Time Series

https://lunarcrush.com/api4/public/coins/:coin/time-series/v2

Get market time series data on a coin or token. Specify the coin to be queried by providing the numeric ID or the symbol of the coin in the input parameter, which can be found by calling the /coins/list endpoint.

input parameters:

+ **coin**: _provide the numeric id or symbol of the coin or token._ **required**
+ **bucket**: _bucket time series data into hours or days. default is hours._
+ **interval**: _Use interval to specify the start and end time automatically for convenience. If "start" or "end" parameters are provided this parameter is ignored._
+ **start**: _The start time (unix timestamp) to go back to._
+ **end**: _The end time (unix timestamp) to stop at._

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/coins/2/time-series/v2
```



Example response:

```json
{
  "config": {
    "coin": "2",
    "topic": "ethereum",
    "id": "coins:2",
    "name": "Ethereum",
    "symbol": "ETH",
    "interval": "1w",
    "start": 1749945600,
    "end": 1750611781,
    "bucket": "hour",
    "metrics": [],
    "generated": 1750604581
  },
  "data": [
    {
      "time": 1749945600,
      "contributors_active": 7291,
      "contributors_created": 267,
      "interactions": 1270862,
      "posts_active": 12368,
      "posts_created": 483,
      "sentiment": 83,
      "spam": 253,
      "alt_rank": 332,
      "circulating_supply": 120721164,
      "close": 2537.67,
      "galaxy_score": 65,
      "high": 2537.67,
      "low": 2537.67,
      "market_cap": 306376106603,
      "market_dominance": 9.3539,
      "open": 2537.67,
      "social_dominance": 9.3292,
      "volume_24h": 13898176295
    }
  ]
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **id**: LunarCrush internal ID for the asset
+ **name**: The full name of the asset
+ **symbol**: The symbol for the asset
+ **interval**: Typically used for specifying time intervals like 1w = 1 week, 1m = 1 month etc
+ **start**: Start/from unix timestamp (in seconds)
+ **end**: End/to unix timestamp (in seconds)
+ **bucket**: Data is generally bucketed into hours or days
+ **metrics**: Comma separated list of metrics to include or that are included
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **time**: A unix timestamp (in seconds)
+ **contributors_active**: number of unique social accounts with posts that have interactions
+ **contributors_created**: number of unique social accounts that created new posts
+ **interactions**: number of all publicly measurable interactions on a social post (views, likes, comments, thumbs up, upvote, share etc)
+ **posts_active**: number of unique social posts with interactions
+ **posts_created**: number of unique social posts created
+ **sentiment**: % of posts (weighted by interactions) that are positive. 100% means all posts are positive, 50% is half positive and half negative, and 0% is all negative posts.
+ **spam**: The number of posts created that are considered spam
+ **alt_rank**: A proprietary score based on how an asset is performing relative to all other assets supported
+ **circulating_supply**: Circulating Supply is the total number of coins or tokens that are actively available for trade and are being used in the market and in general public
+ **close**: Close price for the time period
+ **galaxy_score**: A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
+ **high**: Higest price fo rthe time period
+ **low**: Lowest price for the time period
+ **market_cap**: Total dollar market value of all circulating supply or outstanding shares
+ **market_dominance**: The percent of the total market cap that this asset represents
+ **open**: Open price for the time period
+ **social_dominance**: The percent of the total social volume that this topic represents
+ **volume_24h**: Volume in USD for 24 hours up to this data point




---

### Coins Meta

https://lunarcrush.com/api4/public/coins/:coin/meta/v1

Get meta information for a cryptocurrency project. This includes information such as the website, social media links, and other information.

input parameters:

+ **coin**: _provide the numeric id or symbol of the coin or token._ **required**

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/coins/2/meta/v1
```



Example response:

```json
{
  "data": {
    "id": 2,
    "name": "Ethereum",
    "symbol": "ETH",
    "market_categories": "layer-1",
    "updated": 1741059248,
    "blockchain": [
      {
        "type": "layer1",
        "network": "ethereum",
        "address": null,
        "decimals": null
      }
    ],
    "short_summary": "Ethereum is open access to digital money and data-friendly services for everyone – no matter your background or location. It's a community-built technology behind the cryptocurrency ether (ETH) and thousands of applications you can use today.",
    "description": "Ethereum is a technology that lets you send cryptocurrency to anyone for a small fee. It also powers applications that everyone can use and no one can take down.\n\nIt's the world's programmable blockchain.\n\nEthereum builds on Bitcoin's innovation, with some big differences.\n\nBoth let you use digital money without payment providers or banks. But Ethereum is programmable, so you can also use it for lots of different digital assets – even Bitcoin!\n\nThis also means Ethereum is for more than payments. It's a marketplace of financial services, games and apps that can't steal your data or censor you.",
    "github_link": "https://github.com/ethereum",
    "website_link": "https://www.ethereum.org/",
    "whitepaper_link": "https://ethereum.org/en/whitepaper",
    "twitter_link": "https://twitter.com/ethereum",
    "reddit_link": "https://www.reddit.com/r/ethereum/",
    "header_image": "headers/ethereum.png",
    "header_text": "The foundation for our digital future",
    "videos": "https://www.youtube.com/watch?v=GQR1xjQn5Pg",
    "coingecko_link": "https://www.coingecko.com/en/coins/ethereum",
    "coinmarketcap_link": "https://coinmarketcap.com/currencies/ethereum/"
  },
  "config": {
    "coin": "2",
    "generated": 1750604581
  }
}
```

Schema:

+ **id**: LunarCrush internal ID for the asset
+ **name**: The full name of the asset
+ **symbol**: The symbol for the asset
+ **updated**: Timestamp of when the data was last updated
+ **type**: Type of item or social network of item e.g. tweet, youtube-video, tiktok, x, youtube, category, topic, creator/influencer
+ **network**: The social network for the post or influencer. We still refer to x as twitter out of developer preference.
+ **description**: Explanation of the change and the potential impact
+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data




---

### Stocks List v2

https://lunarcrush.com/api4/public/stocks/list/v2

Get a general snapshot of LunarCrush metrics on the entire list of tracked stocks. It is designed as a lightweight mechanism for monitoring the universe of available assets, either in aggregate or relative to each other. Metrics include Galaxy Score™, AltRank™, floor price, 24h percent change, market cap, social mentions, social interactions, social contributors, social dominance, and categories.

input parameters:

+ **sort**: _sort the output by metric_
+ **limit**: _limit the number of results. Default is 10 maximum is 100 per page._
+ **desc**: _Pass any value as desc and the output will be reversed (descending)_
+ **page**: _When using limit, set the page of results to display, pages start at 0_

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/stocks/list/v2
```



Example response:

```json
{
  "config": {
    "limit": 0,
    "sort": "market_cap_rank",
    "desc": true,
    "page": 0,
    "total_rows": 2157,
    "generated": 1750604581
  },
  "data": [
    {
      "id": 4336,
      "symbol": "GOOGL",
      "name": "Alphabet Inc Class A",
      "price": 166.71,
      "volume_24h": 226979751,
      "percent_change_24h": -3.8137549042233934,
      "market_cap": 2026491407296.76,
      "market_cap_rank": 1,
      "interactions_24h": 2265147,
      "social_volume_24h": 5886,
      "social_dominance": 4.2773986788462794,
      "market_dominance": 2.6633362311702355,
      "market_dominance_prev": null,
      "galaxy_score": 36.1,
      "galaxy_score_previous": 45,
      "alt_rank": 1320,
      "alt_rank_previous": 91,
      "sentiment": 78,
      "categories": "communication-services",
      "topic": "googl alphabet inc class a",
      "logo": "https://cdn.lunarcrush.com/stocks/googl.png"
    }
  ]
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **id**: LunarCrush internal ID for the asset
+ **symbol**: The symbol for the asset
+ **name**: The full name of the asset
+ **price**: Current price in USD
+ **volume_24h**: Volume in USD for 24 hours up to this data point
+ **percent_change_24h**: Percent change in price since 24 hours ago
+ **market_cap**: Total dollar market value of all circulating supply or outstanding shares
+ **market_cap_rank**: The rank of the asset by market cap with additional filtering to remove outliers and bad market data.
+ **interactions_24h**: Number of interactions in the last 24 hours
+ **social_volume_24h**: Total number of posts with interactions on this topic in the last 24 hours
+ **social_dominance**: The percent of the total social volume that this topic represents
+ **market_dominance**: The percent of the total market cap that this asset represents
+ **galaxy_score**: A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
+ **galaxy_score_previous**: The galaxy score from the previous 24 hours
+ **alt_rank**: A proprietary score based on how an asset is performing relative to all other assets supported
+ **alt_rank_previous**: The alt rank from the previous 24 hours
+ **sentiment**: % of posts (weighted by interactions) that are positive. 100% means all posts are positive, 50% is half positive and half negative, and 0% is all negative posts.
+ **categories**: an array of categories this topic aggregates into
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **logo**: The URL to the logo for the asset, topic, or category




---

### Stocks List

https://lunarcrush.com/api4/public/stocks/list/v1

Lists all stocks supported by LunarCrush. Includes the "topic" endpoint to use to get social data from this asset as a social topic.

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/stocks/list/v1
```



Example response:

```json
{
  "config": {
    "sort": "market_cap_rank",
    "desc": true,
    "limit": 0,
    "page": 0,
    "total_rows": 2157,
    "generated": 1750604581
  },
  "data": [
    {
      "id": 4336,
      "symbol": "GOOGL",
      "name": "Alphabet Inc Class A",
      "price": 166.71,
      "volume_24h": 226979751,
      "percent_change_24h": -3.8137549042233934,
      "market_cap": 2026491407296.76,
      "market_cap_rank": 1,
      "interactions_24h": 2265147,
      "social_volume_24h": 5886,
      "social_dominance": 4.2773986788462794,
      "market_dominance": 2.6633362311702355,
      "market_dominance_prev": null,
      "galaxy_score": 36.1,
      "galaxy_score_previous": 45,
      "alt_rank": 1320,
      "alt_rank_previous": 91,
      "sentiment": 78,
      "categories": "communication-services",
      "topic": "googl alphabet inc class a",
      "logo": "https://cdn.lunarcrush.com/stocks/googl.png"
    }
  ]
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **id**: LunarCrush internal ID for the asset
+ **symbol**: The symbol for the asset
+ **name**: The full name of the asset
+ **price**: Current price in USD
+ **volume_24h**: Volume in USD for 24 hours up to this data point
+ **percent_change_24h**: Percent change in price since 24 hours ago
+ **market_cap**: Total dollar market value of all circulating supply or outstanding shares
+ **market_cap_rank**: The rank of the asset by market cap with additional filtering to remove outliers and bad market data.
+ **interactions_24h**: Number of interactions in the last 24 hours
+ **social_volume_24h**: Total number of posts with interactions on this topic in the last 24 hours
+ **social_dominance**: The percent of the total social volume that this topic represents
+ **market_dominance**: The percent of the total market cap that this asset represents
+ **galaxy_score**: A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
+ **galaxy_score_previous**: The galaxy score from the previous 24 hours
+ **alt_rank**: A proprietary score based on how an asset is performing relative to all other assets supported
+ **alt_rank_previous**: The alt rank from the previous 24 hours
+ **sentiment**: % of posts (weighted by interactions) that are positive. 100% means all posts are positive, 50% is half positive and half negative, and 0% is all negative posts.
+ **categories**: an array of categories this topic aggregates into
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **logo**: The URL to the logo for the asset, topic, or category




---

### Stocks

https://lunarcrush.com/api4/public/stocks/:stock/v1

Get market data on a stock. Specify the coin to be queried by providing the numeric ID or the symbol of the coin in the input parameter, which can be found by calling the /coins/list endpoint.

input parameters:

+ **stock**: _provide the numeric id or symbol of the stock._ **required**

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/stocks/7056/v1
```



Example response:

```json
{
  "config": {
    "id": "stocks:7056",
    "name": "NVIDIA Corp.",
    "symbol": "NVDA",
    "topic": "$nvda",
    "generated": 1750604581
  },
  "data": {
    "id": 7056,
    "name": "NVIDIA Corp.",
    "symbol": "NVDA",
    "price": 143.78,
    "market_cap": 3536743574000,
    "percent_change_24h": -1.1685455045366984,
    "volume_24h": 485912020,
    "close": 143.78,
    "market_cap_rank": 941
  }
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **id**: LunarCrush internal ID for the asset
+ **name**: The full name of the asset
+ **symbol**: The symbol for the asset
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **price**: Current price in USD
+ **market_cap**: Total dollar market value of all circulating supply or outstanding shares
+ **percent_change_24h**: Percent change in price since 24 hours ago
+ **volume_24h**: Volume in USD for 24 hours up to this data point
+ **close**: Close price for the time period
+ **market_cap_rank**: The rank of the asset by market cap with additional filtering to remove outliers and bad market data.




---

### Stocks Time Series

https://lunarcrush.com/api4/public/stocks/:stock/time-series/v2

Get market time series data on a stock. Specify the stock to be queried by providing the numeric ID or the symbol of the stock in the input parameter, which can be found by calling the /stocks/list endpoint.

input parameters:

+ **stock**: _provide the numeric id or symbol of the stock or token._ **required**
+ **bucket**: _bucket time series data into hours or days. default is hours._
+ **interval**: _Use interval to specify the start and end time automatically for convenience. If "start" or "end" parameters are provided this parameter is ignored._
+ **start**: _The start time (unix timestamp) to go back to._
+ **end**: _The end time (unix timestamp) to stop at._

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/stocks/7056/time-series/v2
```



Example response:

```json
{
  "config": {
    "stock": "7056",
    "topic": "$nvda",
    "id": "stocks:7056",
    "name": "NVIDIA Corp.",
    "symbol": "NVDA",
    "interval": "1w",
    "start": 1749945600,
    "end": 1750611781,
    "bucket": "hour",
    "metrics": [],
    "generated": 1750604581
  },
  "data": [
    {
      "time": 1749945600,
      "contributors_active": 2664,
      "contributors_created": 104,
      "interactions": 499470,
      "posts_active": 4518,
      "posts_created": 196,
      "sentiment": 83,
      "spam": 73,
      "alt_rank": 58,
      "galaxy_score": 55,
      "social_dominance": 13.291
    }
  ]
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **id**: LunarCrush internal ID for the asset
+ **name**: The full name of the asset
+ **symbol**: The symbol for the asset
+ **interval**: Typically used for specifying time intervals like 1w = 1 week, 1m = 1 month etc
+ **start**: Start/from unix timestamp (in seconds)
+ **end**: End/to unix timestamp (in seconds)
+ **bucket**: Data is generally bucketed into hours or days
+ **metrics**: Comma separated list of metrics to include or that are included
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **time**: A unix timestamp (in seconds)
+ **contributors_active**: number of unique social accounts with posts that have interactions
+ **contributors_created**: number of unique social accounts that created new posts
+ **interactions**: number of all publicly measurable interactions on a social post (views, likes, comments, thumbs up, upvote, share etc)
+ **posts_active**: number of unique social posts with interactions
+ **posts_created**: number of unique social posts created
+ **sentiment**: % of posts (weighted by interactions) that are positive. 100% means all posts are positive, 50% is half positive and half negative, and 0% is all negative posts.
+ **spam**: The number of posts created that are considered spam
+ **alt_rank**: A proprietary score based on how an asset is performing relative to all other assets supported
+ **galaxy_score**: A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
+ **social_dominance**: The percent of the total social volume that this topic represents




---

### Searches Search

https://lunarcrush.com/api4/public/searches/search

Get recently popular social posts matching a single search term or phrase. Optionally configure and test a custom search configuration.

input parameters:

+ **term**: _Test a single search term or phrase_
+ **search_json**: _A JSON object (stringified) that defines the search criteria for the custom search aggregation. Posts that match any of the search term will be included. For each search term there are optional inclusion and exclusion terms to help fine tune the results._

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/searches/search
```



Example response:

```json
{
  "error": "Error: search_json object is not formatted correctly"
}
```

Schema:





---

### Searches List

https://lunarcrush.com/api4/public/searches/list

List all custom search aggregations.

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/searches/list
```



Example response:

```json
{
  "data": [
    {
      "id": "lc1s5M27Jq",
      "name": "Pump.fun Leaderboard",
      "search_json": {
        "terms": [],
        "rollups": [
          "5ioomhkyijrm9bsbvtkut5j7jwuzjq6758iuhb9epump"
        ]
      },
      "priority": false,
      "created": 1749064987
    }
  ]
}
```

Schema:

+ **id**: LunarCrush internal ID for the asset
+ **name**: The full name of the asset




---

### Searches Create

https://lunarcrush.com/api4/public/searches/create

Create a custom search aggregation of topics and search terms. Fine tune the posts that get included or excluded. Search terms and configuration cannot be changed once created. If successful returns the new id/slug and the processed search config. Note that search terms will be adjusted and simplified for optimized search and matching.

input parameters:

+ **name**: _The name of the custom search aggregation._ **required**
+ **search_json**: _A JSON object (stringified) that defines the search criteria for the custom search aggregation. Search terms and configuration cannot be changed once created. Posts that match any of the search term will be included. For each search term there are optional inclusion and exclusion terms to help fine tune the results._ **required**
+ **priority**: _Flag as a high priority search aggregation. Pro accounts get up to 10 high priority search aggregations at a time._

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/searches/create
```



Example response:

```json
{
  "error": "Error: name is required"
}
```

Schema:





---

### Searches Update

https://lunarcrush.com/api4/public/searches/:slug/update

Update a custom search aggregation name or priority. Search terms and configuration cannot be changed once created.

input parameters:

+ **slug**: _The ID of the custom search aggregation to update._ **required**
+ **name**: _The name of the custom search aggregation._
+ **search_json**: _A JSON object (stringified) that defines the search criteria for the custom search aggregation. Search terms and configuration cannot be changed once created. Posts that match any of the search term will be included. For each search term there are optional inclusion and exclusion terms to help fine tune the results._ **required**
+ **priority**: _Define if this is a high priority search aggregation. Pro accounts get up to 10 high priority search aggregations at a time._

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/searches/:slug/update
```



Example response:

```json
{
  "error": "Error: search_json is required"
}
```

Schema:





---

### Searches Delete

https://lunarcrush.com/api4/public/searches/:slug/delete

Delete a custom search aggregation.

input parameters:

+ **slug**: _The ID of the custom search aggregation to delete._ **required**

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/searches/:slug/delete
```



Example response:

```json
{
  "error": "Error: That item does not exist"
}
```

Schema:





---

### Searches

https://lunarcrush.com/api4/public/searches/:slug

See the summary output of a custom search aggregation.

input parameters:

+ **slug**: _The ID of the custom search aggregation to view._ **required**

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/searches/:slug
```



Example response:

```json
{
  "error": "Use the topics endpoints to get the latest data like /public/topic/:slug/v1"
}
```

Schema:





---

### Topic

https://lunarcrush.com/api4/public/topic/:topic/v1

Get summary information for a social topic. The output is a 24 hour aggregation social activity with metrics comparing the latest 24 hours to the previous 24 hours.

input parameters:

+ **topic**: _Provide the topic to get details for. A topic must be all lower case and can only include letters, numbers, spaces, # and $. You can also look up a topic by the coin/nft/stock numeric id like coins:1 for bitcoin or stocks:7056 for nVidia._ **required**

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/topic/bitcoin/v1
```



Example response:

```json
{
  "config": {
    "id": "bitcoin",
    "name": "Bitcoin",
    "symbol": "BTC",
    "topic": "bitcoin",
    "generated": 1750604578
  },
  "data": {
    "topic": "bitcoin",
    "title": "Bitcoin",
    "topic_rank": 53,
    "related_topics": [
      "coins layer 1"
    ],
    "types_count": {
      "reddit-post": 11298,
      "tweet": 202878,
      "youtube-video": 33017,
      "tiktok-video": 16640,
      "news": 931
    },
    "types_interactions": {
      "reddit-post": 136956,
      "tweet": 61019860,
      "youtube-video": 11607141,
      "tiktok-video": 10971746,
      "news": 263129
    },
    "types_sentiment": {
      "reddit-post": 76,
      "tweet": 74,
      "youtube-video": 78,
      "tiktok-video": 69,
      "news": 76
    },
    "types_sentiment_detail": {
      "reddit-post": {
        "positive": 47786,
        "neutral": 80525,
        "negative": 8645
      },
      "tweet": {
        "positive": 23491671,
        "neutral": 25995992,
        "negative": 11532197
      },
      "youtube-video": {
        "positive": 3697104,
        "neutral": 6368677,
        "negative": 1541360
      },
      "tiktok-video": {
        "positive": 2107230,
        "neutral": 7992668,
        "negative": 871848
      },
      "news": {
        "positive": 79706,
        "neutral": 166243,
        "negative": 17180
      }
    },
    "interactions_24h": 83998832,
    "num_contributors": 90751,
    "num_posts": 264764,
    "categories": [
      "Cryptocurrencies"
    ],
    "trend": "flat"
  }
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **id**: LunarCrush internal ID for the asset
+ **name**: The full name of the asset
+ **symbol**: The symbol for the asset
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **title**: The case sensitive title of the topic or category
+ **topic_rank**: LunarCrush metric for ranking a social topic relative to all other social topics
+ **related_topics**: an array of related topics
+ **types_count**: An object with the counts of the total number of unique posts getting interactions from each social network in the last 24 hours
+ **types_interactions**: An object with the counts of the total number of interactions on each post from each social network in the last 24 hours
+ **types_sentiment**: An object with the sentiment score broken down by each supported social network. 0% is all posts negative, 100% is all posts positive. 50% is equal positive and negative posts. Each post is weighted by interactions.
+ **types_sentiment_detail**: An object with the breakdown of positive, neutral, and negative posts by 24h interactions for each social network
+ **interactions_24h**: Number of interactions in the last 24 hours
+ **num_contributors**: The number of unique social contributors to the topic
+ **num_posts**: Total number of posts with interactions on this topic in the last 24 hours
+ **categories**: an array of categories this topic aggregates into
+ **trend**: One of up, down or flat to represent the general trend in interactions




---

### Nfts List v2

https://lunarcrush.com/api4/public/nfts/list/v2

Get a general snapshot of LunarCrush metrics on the entire list of tracked NFTS. It is designed as a lightweight mechanism for monitoring the universe of available assets, either in aggregate or relative to each other. Metrics include Galaxy Score™, AltRank™, floor price, 24h percent change, market cap, social mentions, social interactions, social contributors, social dominance, and categories.

input parameters:

+ **sort**: _sort the output by metric_
+ **limit**: _limit the number of results. Default is 10 maximum is 100 per page._
+ **desc**: _Pass any value as desc and the output will be reversed (descending)_
+ **page**: _When using limit, set the page of results to display, pages start at 0_

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/nfts/list/v2
```



Example response:

```json
{
  "config": {
    "limit": 0,
    "sort": "market_cap_rank",
    "desc": true,
    "page": 0,
    "total_rows": 461,
    "generated": 1750604581
  },
  "data": [
    {
      "id": 2876,
      "lunar_id": "Nouns-Fork-0",
      "base_crypto": "ETH",
      "name": "Nouns - Fork 0",
      "floor_price": 1.1,
      "volume_24h": 0,
      "percent_change_24h": 0,
      "market_cap": 11518.1,
      "interactions_24h": 0,
      "social_volume_24h": 0,
      "social_contributors": 0,
      "social_dominance": 0,
      "galaxy_score": 0,
      "alt_rank": 388,
      "logo": "https://cdn.lunarcrush.com/nfts/nouns-fork-0.png"
    }
  ]
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **id**: LunarCrush internal ID for the asset
+ **lunar_id**: LunarCrush human readable slug/ID for the asset
+ **base_crypto**: The base crypto used to calculate the crypto_usd value
+ **name**: The full name of the asset
+ **volume_24h**: Volume in USD for 24 hours up to this data point
+ **percent_change_24h**: Percent change in price since 24 hours ago
+ **market_cap**: Total dollar market value of all circulating supply or outstanding shares
+ **interactions_24h**: Number of interactions in the last 24 hours
+ **social_volume_24h**: Total number of posts with interactions on this topic in the last 24 hours
+ **social_contributors**: The number of unique social contributors in the last 24 hours
+ **social_dominance**: The percent of the total social volume that this topic represents
+ **galaxy_score**: A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
+ **alt_rank**: A proprietary score based on how an asset is performing relative to all other assets supported
+ **logo**: The URL to the logo for the asset, topic, or category




---

### Nfts List

https://lunarcrush.com/api4/public/nfts/list/v1

Lists all nft collections supported by LunarCrush. Includes the "topic" endpoint to use to get social data from this nft collection as a social topic.

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/nfts/list/v1
```



Example response:

```json
{
  "config": {
    "sort": "market_cap_rank",
    "desc": true,
    "limit": 0,
    "page": 0,
    "total_rows": 461,
    "generated": 1750604581
  },
  "data": [
    {
      "id": 2876,
      "lunar_id": "Nouns-Fork-0",
      "base_crypto": "ETH",
      "name": "Nouns - Fork 0",
      "floor_price": 1.1,
      "volume_24h": 0,
      "percent_change_24h": 0,
      "market_cap": 11518.1,
      "interactions_24h": 0,
      "social_volume_24h": 0,
      "social_contributors": 0,
      "social_dominance": 0,
      "galaxy_score": 0,
      "alt_rank": 388,
      "logo": "https://cdn.lunarcrush.com/nfts/nouns-fork-0.png"
    }
  ]
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **id**: LunarCrush internal ID for the asset
+ **lunar_id**: LunarCrush human readable slug/ID for the asset
+ **base_crypto**: The base crypto used to calculate the crypto_usd value
+ **name**: The full name of the asset
+ **volume_24h**: Volume in USD for 24 hours up to this data point
+ **percent_change_24h**: Percent change in price since 24 hours ago
+ **market_cap**: Total dollar market value of all circulating supply or outstanding shares
+ **interactions_24h**: Number of interactions in the last 24 hours
+ **social_volume_24h**: Total number of posts with interactions on this topic in the last 24 hours
+ **social_contributors**: The number of unique social contributors in the last 24 hours
+ **social_dominance**: The percent of the total social volume that this topic represents
+ **galaxy_score**: A proprietary score based on technical indicators of price, average social sentiment, relative social activity, and a factor of how closely social indicators correlate with price and volume
+ **alt_rank**: A proprietary score based on how an asset is performing relative to all other assets supported
+ **logo**: The URL to the logo for the asset, topic, or category




---

### Nfts

https://lunarcrush.com/api4/public/nfts/:nft/v1

Get market data on an nft collection. Specify the nft to be queried by providing the numeric ID or the slug of the nft in the input parameter, which can be found by calling the /public/nfts/list endpoint.

input parameters:

+ **nft**: _provide the numeric id or slug of the nft._ **required**

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/nfts/2/v1
```



Example response:

```json
{
  "config": {
    "nft": "2",
    "generated": 1750604581
  },
  "data": {
    "id": 2,
    "name": "CryptoPunks",
    "floor_price": 39.79,
    "market_cap": 397900,
    "percent_change_24h": 0,
    "volume_24h": 0
  }
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **id**: LunarCrush internal ID for the asset
+ **name**: The full name of the asset
+ **market_cap**: Total dollar market value of all circulating supply or outstanding shares
+ **percent_change_24h**: Percent change in price since 24 hours ago
+ **volume_24h**: Volume in USD for 24 hours up to this data point




---

### Nfts Time Series v2

https://lunarcrush.com/api4/public/nfts/:nft/time-series/v2

Get market time series data on a nft. Specify the nft to be queried by providing the numeric ID or the symbol of the nft in the input parameter, which can be found by calling the /nfts/list endpoint.

input parameters:

+ **nft**: _provide the numeric id or symbol of the nft or token._ **required**
+ **bucket**: _bucket time series data into hours or days. default is hours._
+ **interval**: _Use interval to specify the start and end time automatically for convenience. If "start" or "end" parameters are provided this parameter is ignored._
+ **start**: _The start time (unix timestamp) to go back to._
+ **end**: _The end time (unix timestamp) to stop at._

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/nfts/2/time-series/v2
```



Example response:

```json
{
  "config": {
    "nft": 2,
    "topic": "cryptopunks",
    "interval": "1w",
    "bucket": "hour",
    "start": 1749945600,
    "end": 1750604582,
    "generated": 1750604581
  },
  "data": [
    {
      "time": 1749945600,
      "market_cap": 432500,
      "alt_rank": 167,
      "contributors_active": 78,
      "contributors_created": 2,
      "posts_active": 103,
      "posts_created": 2,
      "interactions": 1597,
      "social_dominance": 1.8727272727272728,
      "sentiment": 88
    }
  ]
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **topic**: LunarCrush social topic. Can only includes letters, numbers, spaces, #, and $
+ **interval**: Typically used for specifying time intervals like 1w = 1 week, 1m = 1 month etc
+ **bucket**: Data is generally bucketed into hours or days
+ **start**: Start/from unix timestamp (in seconds)
+ **end**: End/to unix timestamp (in seconds)
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **time**: A unix timestamp (in seconds)
+ **market_cap**: Total dollar market value of all circulating supply or outstanding shares
+ **alt_rank**: A proprietary score based on how an asset is performing relative to all other assets supported
+ **contributors_active**: number of unique social accounts with posts that have interactions
+ **contributors_created**: number of unique social accounts that created new posts
+ **posts_active**: number of unique social posts with interactions
+ **posts_created**: number of unique social posts created
+ **interactions**: number of all publicly measurable interactions on a social post (views, likes, comments, thumbs up, upvote, share etc)
+ **social_dominance**: The percent of the total social volume that this topic represents
+ **sentiment**: % of posts (weighted by interactions) that are positive. 100% means all posts are positive, 50% is half positive and half negative, and 0% is all negative posts.




---

### Nfts Time Series

https://lunarcrush.com/api4/public/nfts/:nft/time-series/v1

Get market time series data on an nft collection. Specify the nft to be queried by providing the numeric ID or slug of the nft collection in the input parameter, which can be found by calling the /public/nfts/list endpoint.

input parameters:

+ **nft**: _provide the numeric id or symbol of the nft collection._ **required**

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/nfts/2/time-series/v1
```



Example response:

```json
{
  "config": {
    "nft": "2",
    "interval": "1w",
    "bucket": "hour",
    "start": 1749945600,
    "end": 1750604582,
    "generated": 1750604581
  },
  "data": {
    "id": 2,
    "name": "CryptoPunks",
    "symbol": "cryptopunks"
  },
  "timeSeries": [
    {
      "time": 1749945600,
      "market_cap": 432500,
      "alt_rank": 167
    }
  ]
}
```

Schema:

+ **config**: This includes the inputs for the request processed by the server and may include additional hints about the request and response information.
+ **interval**: Typically used for specifying time intervals like 1w = 1 week, 1m = 1 month etc
+ **bucket**: Data is generally bucketed into hours or days
+ **start**: Start/from unix timestamp (in seconds)
+ **end**: End/to unix timestamp (in seconds)
+ **generated**: A unix timestamp (in seconds) when the data was generated to understand possibly stale data
+ **id**: LunarCrush internal ID for the asset
+ **name**: The full name of the asset
+ **symbol**: The symbol for the asset
+ **time**: A unix timestamp (in seconds)
+ **market_cap**: Total dollar market value of all circulating supply or outstanding shares
+ **alt_rank**: A proprietary score based on how an asset is performing relative to all other assets supported




---

### System Changes

https://lunarcrush.com/api4/public/system/changes

Updates to potential changes to historical time series data. Search term changes only impact the most recent 72 hours (hourly) or 3 days (daily) data. "full historical" is a change that may impact the full history of data. Each change provides a description of what is impacted and why.

Example request:

```bash
curl -H "Authorization: Bearer <API_KEY>" https://lunarcrush.com/api4/public/system/changes
```



Example response:

```json
{
  "data": [
    {
      "asset_type": "coins",
      "asset_id": 160963,
      "asset_name": "BlackCoin (BLACKCOIN)",
      "change": "search terms established",
      "description": "search criteria initially set for this asset for the purposes of tracking changes over time",
      "time": 1750587169
    }
  ]
}
```

Schema:

+ **asset_type**: One of coins, nfts, stocks, topic or category
+ **asset_id**: The id of the asset (coin, nft, stock, topic, or category)
+ **asset_name**: The descriptive name of the asset to help identify it
+ **change**: The type of change that occurred
+ **description**: Explanation of the change and the potential impact
+ **time**: A unix timestamp (in seconds)
