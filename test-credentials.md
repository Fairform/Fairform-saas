# FairForm Test Credentials

For testing dashboard and document generation functionality:

**Email:** test@fairform.com
**Password:** TestUser123!

## How to Test:
1. Navigate to `/login`
2. Use the credentials above to sign in
3. Test dashboard functionality at `/dashboard`
4. Test document generation features
5. Test document dashboard at `/dashboard/documents`

## User Flow Testing:
- **Unauthenticated users:** Should be redirected to login/signup pages when clicking CTA buttons
- **Authenticated users:** Should be redirected to checkout/dashboard as appropriate

## Pages to Test:
- Pricing page: "Start Plan" buttons → login (unauthenticated) or checkout (authenticated)
- Product page: "Get This Pack" buttons → login (unauthenticated) or pricing (authenticated)
- Home page: "Start now" button → signup (unauthenticated) or dashboard (authenticated)
