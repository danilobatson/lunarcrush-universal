// 🛠️ LunarCrush Service Fixes
// Fixes for failing resolvers to handle missing/changed endpoints gracefully

import { LunarCrushConfig } from './lunarcrush'

// Fixed getNftTimeSeriesV1 - return empty array if no data
export async function getNftTimeSeriesV1Fixed(config: LunarCrushConfig, id: string, interval?: string, start?: number, end?: number): Promise<any[]> {
  try {
    const params = new URLSearchParams({
      id,
      ...(interval && { interval }),
      ...(start && { start: start.toString() }),
      ...(end && { end: end.toString() })
    })

    const response = await fetch(`${config.baseUrl}/nfts/${id}/time-series?${params}`, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      console.warn(`getNftTimeSeriesV1 API error: ${response.status}`)
      return [] // Return empty array instead of throwing
    }

    const data = await response.json()
    return Array.isArray(data.data) ? data.data : []
  } catch (error) {
    console.warn('getNftTimeSeriesV1 error:', error)
    return [] // Return empty array on any error
  }
}

// Fixed getSearch - handle missing endpoint gracefully
export async function getSearchFixed(config: LunarCrushConfig, id: string): Promise<any> {
  try {
    const response = await fetch(`${config.baseUrl}/search/${id}`, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      return {
        id,
        query: id,
        results: [],
        status: 'endpoint_unavailable',
        message: 'Search endpoint not available'
      }
    }

    return await response.json()
  } catch (error) {
    console.warn('getSearch error:', error)
    return {
      id,
      query: id,
      results: [],
      status: 'error',
      message: 'Search temporarily unavailable'
    }
  }
}

// Fixed searchPosts - return empty array if endpoint missing
export async function searchPostsFixed(config: LunarCrushConfig, term: string): Promise<any[]> {
  try {
    const params = new URLSearchParams({ term })
    const response = await fetch(`${config.baseUrl}/posts/search?${params}`, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      console.warn(`searchPosts API error: ${response.status}`)
      return []
    }

    const data = await response.json()
    return Array.isArray(data.data) ? data.data : []
  } catch (error) {
    console.warn('searchPosts error:', error)
    return []
  }
}

// Fixed getPostDetails - handle missing endpoint
export async function getPostDetailsFixed(config: LunarCrushConfig, id: string): Promise<any> {
  try {
    const response = await fetch(`${config.baseUrl}/posts/${id}`, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      return {
        id,
        title: 'Post not available',
        content: 'Post details temporarily unavailable',
        status: 'endpoint_unavailable'
      }
    }

    return await response.json()
  } catch (error) {
    console.warn('getPostDetails error:', error)
    return {
      id,
      title: 'Post unavailable',
      content: 'Post details temporarily unavailable',
      status: 'error'
    }
  }
}

// Fixed getPostTimeSeries - return empty array if endpoint missing
export async function getPostTimeSeriesFixed(config: LunarCrushConfig, id: string, bucket?: string, interval?: string, start?: number, end?: number): Promise<any[]> {
  try {
    const params = new URLSearchParams({
      id,
      ...(bucket && { bucket }),
      ...(interval && { interval }),
      ...(start && { start: start.toString() }),
      ...(end && { end: end.toString() })
    })

    const response = await fetch(`${config.baseUrl}/posts/${id}/time-series?${params}`, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      console.warn(`getPostTimeSeries API error: ${response.status}`)
      return []
    }

    const data = await response.json()
    return Array.isArray(data.data) ? data.data : []
  } catch (error) {
    console.warn('getPostTimeSeries error:', error)
    return []
  }
}
