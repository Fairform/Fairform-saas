const { 
  checkUserPackAccess, 
  checkDocumentGenerationLimit,
  getUserAccess,
  getUserSubscriptions,
  FORMATIVE_PRODUCTS 
} = require('../lib/access-control');

jest.mock('../lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          eq: jest.fn(() => ({
            eq: jest.fn(() => ({
              or: jest.fn(() => ({
                single: jest.fn(() => Promise.resolve({ data: null, error: null }))
              }))
            }))
          }))
        }))
      }))
    }))
  }
}));

describe('Access Control Functions', () => {
  const mockUserId = 'test-user-123';

  test('checkUserPackAccess handles construction-trades lite pack', async () => {
    const hasAccess = await checkUserPackAccess(mockUserId, 'construction-trades', 'lite');
    expect(typeof hasAccess).toBe('boolean');
  });

  test('checkUserPackAccess handles ndis full pack', async () => {
    const hasAccess = await checkUserPackAccess(mockUserId, 'ndis', 'ndis-full');
    expect(typeof hasAccess).toBe('boolean');
  });

  test('checkDocumentGenerationLimit returns proper structure', async () => {
    const result = await checkDocumentGenerationLimit(mockUserId);
    expect(result).toHaveProperty('canGenerate');
    expect(result).toHaveProperty('limit');
    expect(result).toHaveProperty('used');
    expect(result).toHaveProperty('remaining');
    expect(typeof result.canGenerate).toBe('boolean');
    expect(typeof result.limit).toBe('number');
    expect(typeof result.used).toBe('number');
    expect(typeof result.remaining).toBe('number');
  });

  test('getUserAccess returns array', async () => {
    const access = await getUserAccess(mockUserId);
    expect(Array.isArray(access)).toBe(true);
  });

  test('getUserSubscriptions returns array', async () => {
    const subscriptions = await getUserSubscriptions(mockUserId);
    expect(Array.isArray(subscriptions)).toBe(true);
  });

  test('FORMATIVE_PRODUCTS contains required products', () => {
    expect(FORMATIVE_PRODUCTS).toHaveProperty('LITE_PACK');
    expect(FORMATIVE_PRODUCTS).toHaveProperty('PRO_PACK');
    expect(FORMATIVE_PRODUCTS).toHaveProperty('NDIS_PACK');
    expect(FORMATIVE_PRODUCTS).toHaveProperty('CONSTRUCTION_PACK');
    expect(FORMATIVE_PRODUCTS).toHaveProperty('STARTER_PLAN');
    expect(FORMATIVE_PRODUCTS).toHaveProperty('PRO_PLAN');
    expect(FORMATIVE_PRODUCTS).toHaveProperty('AGENCY_PLAN');
  });
});
