import LRU from 'lru-cache'
import { INDUSTRY_PACKS, DOCUMENT_CATALOG, getDocumentsForPack, type CatalogDoc } from './catalog'

interface CacheOptions {
  maxSize: number
  ttl: number
}

class CatalogCache {
  private cache: LRU<string, any>
  
  constructor(options: CacheOptions = { maxSize: 1000, ttl: 1000 * 60 * 60 }) {
    this.cache = new LRU({
      max: options.maxSize,
      ttl: options.ttl
    })
  }
  
  getIndustryPacks() {
    const cacheKey = 'industry-packs'
    let data = this.cache.get(cacheKey)
    
    if (!data) {
      data = INDUSTRY_PACKS
      this.cache.set(cacheKey, data)
    }
    
    return data
  }
  
  getDocumentCatalog() {
    const cacheKey = 'document-catalog'
    let data = this.cache.get(cacheKey)
    
    if (!data) {
      data = DOCUMENT_CATALOG
      this.cache.set(cacheKey, data)
    }
    
    return data
  }
  
  getDocumentsForPack(industryId: string, packId: string): CatalogDoc[] {
    const cacheKey = `documents-${industryId}-${packId}`
    let data = this.cache.get(cacheKey)
    
    if (!data) {
      data = getDocumentsForPack(industryId, packId)
      this.cache.set(cacheKey, data)
    }
    
    return data
  }
  
  preloadCatalogData() {
    this.getIndustryPacks()
    this.getDocumentCatalog()
    
    Object.keys(INDUSTRY_PACKS).forEach(industryId => {
      const industry = INDUSTRY_PACKS[industryId]
      industry.packs.forEach(pack => {
        this.getDocumentsForPack(industryId, pack.id)
      })
    })
  }
  
  clearCache() {
    this.cache.clear()
  }
}

export const catalogCache = new CatalogCache()

catalogCache.preloadCatalogData()
