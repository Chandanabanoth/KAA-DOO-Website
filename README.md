# KAA DOO V2 — Ultimate Store

A polished, mobile-first React + Vite storefront for KAA DOO.

## Included
- Responsive homepage
- Product catalog with categories and search
- Product cards with pricing, discounts and ratings
- Functional cart drawer
- Quantity controls and cart totals
- WhatsApp order flow
- Combos section
- Brand story / promise sections
- Newsletter signup UI
- Mobile navigation
- Footer with contact/social placeholders

## Run locally

Requirements: Node.js 18+

```bash
npm install
npm run dev
```

Then open the local Vite URL.

For production:
```bash
npm run build
npm run preview
```

## Important customization
1. Replace the WhatsApp number in `src/main.jsx`:
   `919000000000`
2. Replace email / phone / address placeholders in the footer.
3. Replace emoji product visuals with real KAA DOO product images when available.
4. Update product names, sizes and prices in the `products` array.
5. Connect a real payment gateway and backend/order database before accepting online payments.

This version intentionally works as a frontend store without exposing payment secrets.
