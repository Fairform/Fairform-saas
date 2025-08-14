const { getDocumentsForPack, getCatalogStats, INDUSTRY_PACKS } = require('../lib/catalog');

describe('Catalog Functions', () => {
  test('getDocumentsForPack returns correct documents for lite pack', () => {
    const docs = getDocumentsForPack('construction-trades', 'lite');
    expect(docs.length).toBeGreaterThan(0);
    expect(docs.every(doc => doc.inLite)).toBe(true);
  });

  test('getDocumentsForPack returns all documents for pro pack', () => {
    const liteDocs = getDocumentsForPack('construction-trades', 'lite');
    const proDocs = getDocumentsForPack('construction-trades', 'pro');
    expect(proDocs.length).toBeGreaterThan(liteDocs.length);
  });

  test('getDocumentsForPack returns full document set for construction-full pack', () => {
    const fullDocs = getDocumentsForPack('construction-trades', 'construction-full');
    const proDocs = getDocumentsForPack('construction-trades', 'pro');
    expect(fullDocs.length).toBeGreaterThanOrEqual(proDocs.length);
  });

  test('getDocumentsForPack returns NDIS-specific documents for ndis-full pack', () => {
    const ndisDocs = getDocumentsForPack('ndis', 'ndis-full');
    expect(ndisDocs.length).toBeGreaterThan(0);
    expect(ndisDocs.some(doc => doc.title.toLowerCase().includes('ndis'))).toBe(true);
  });

  test('getCatalogStats returns correct statistics', () => {
    const stats = getCatalogStats();
    expect(stats.totalDocuments).toBeGreaterThan(0);
    expect(stats.liteDocuments).toBeGreaterThan(0);
    expect(stats.totalDocuments).toBeGreaterThanOrEqual(stats.liteDocuments);
  });

  test('INDUSTRY_PACKS contains required industries', () => {
    expect(INDUSTRY_PACKS).toHaveProperty('construction-trades');
    expect(INDUSTRY_PACKS).toHaveProperty('ndis');
    expect(INDUSTRY_PACKS['construction-trades'].packs).toBeDefined();
    expect(INDUSTRY_PACKS['ndis'].packs).toBeDefined();
  });

  test('All packs have required properties', () => {
    Object.values(INDUSTRY_PACKS).forEach(industry => {
      industry.packs.forEach(pack => {
        expect(pack).toHaveProperty('id');
        expect(pack).toHaveProperty('label');
        expect(pack).toHaveProperty('formats');
        expect(Array.isArray(pack.formats)).toBe(true);
      });
    });
  });
});
