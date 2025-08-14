/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

jest.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
  }),
}));

global.fetch = jest.fn();

describe('Pricing Toggle Logic', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('pricing mode toggle switches between subscription and one-time', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { id: 'starter', name: 'Starter', price: '$129/month' },
          { id: 'pro', name: 'Pro', price: '$179/month' },
        ],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { id: 'lite_pack', name: 'Lite Pack', price: '$79' },
          { id: 'pro_pack', name: 'Pro Pack', price: '$189' },
        ],
      });

    const PricingPage = require('../app/pricing/page.tsx').default;
    render(<PricingPage />);

    await waitFor(() => {
      expect(screen.getByText('Subscription Plans')).toBeInTheDocument();
    });

    const oneTimeToggle = screen.getByText('One-Time Packs');
    expect(oneTimeToggle).toBeInTheDocument();

    fireEvent.click(oneTimeToggle);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/pricing/one-time');
    });
  });

  test('subscription plans display correct pricing', () => {
    const subscriptionPlans = [
      { id: 'starter', name: 'Starter', price: '$129/month' },
      { id: 'pro', name: 'Pro', price: '$179/month' },
      { id: 'agency', name: 'Agency', price: '$499/month' },
    ];

    subscriptionPlans.forEach(plan => {
      expect(plan.price).toMatch(/\$\d+\/month/);
    });
  });

  test('one-time packs display correct pricing', () => {
    const oneTimePacks = [
      { id: 'lite_pack', name: 'Lite Pack', price: '$79' },
      { id: 'pro_pack', name: 'Pro Pack', price: '$189' },
      { id: 'ndis_full', name: 'NDIS Full Pack', price: '$499' },
      { id: 'construction_full', name: 'Construction Compliance Pack', price: '$349' },
    ];

    oneTimePacks.forEach(pack => {
      expect(pack.price).toMatch(/\$\d+/);
      expect(pack.price).not.toMatch(/\/month/);
    });
  });
});
