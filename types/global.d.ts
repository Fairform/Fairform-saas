// Global type declarations for Formative
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    STRIPE_SECRET_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
    POCKETBOOK_LLM_API_URL: string;
    ADMIN_SECRET_KEY: string;
  }
}

// Stripe types extension
declare module 'stripe' {
  namespace Stripe {
    interface ApiVersion {
      '2023-10-16': '2023-10-16';
    }
  }
}
