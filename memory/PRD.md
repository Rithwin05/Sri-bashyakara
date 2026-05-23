# SBJ — The House of Cinematic Heritage · PRD

## Original problem statement
Build "The House of SBJ" — Sri Bhashyakara Jewellery Pvt Ltd's cinematic
heritage luxury jewellery platform. Position SBJ as India's first cinematic
3D heritage jewellery house (Royal Indian Noir) — concierge-led, not
ecommerce. Avoid pop-ups, discounts, coupons. Phase 1 MVP includes a
cinematic homepage, five Collection Worlds (Temple, Emerald, Bridal,
Pearls, Modern), Bridal Journey questionnaire, Private Viewing
reservation form, Showroom page, and WhatsApp luxury concierge.

## User personas
- South Indian bridal families (Telugu / Tamil / Kannada)
- NRI luxury bridal buyers (USA, UK, EU, Gulf, Singapore)
- Hyderabad heritage jewellery clients
- Editorial luxury / press audience

## Architecture
- **Frontend** React 19 + Tailwind + Framer Motion + Canvas2D (custom-built
  cinematic scenes replacing R3F due to React 19 reconciler incompatibility)
- **Backend** FastAPI + Motor (Mongo) — lead capture for 3 funnels
  (consultation, reservation, concierge) + curated collection world data
- **Routing** /, /collection/:slug, /bridal-journey, /reserve, /showroom

## Implemented (2026-02)
- Royal Indian Noir design system (Cormorant Garamond / Cinzel / Tenor Sans)
- Cinematic intro sequence with logo emergence + gold dust
- Canvas2D cinematic hero (rotating gold ring + diamond constellation +
  particle dust) — faster + more reliable than R3F for React 19
- Canvas2D Temple ambience scene (torch glow + golden mandala + motes)
- Custom magnetic gold cursor
- Nav + mobile drawer + footer + marquee strip
- Home: intro → hero → marquee → manifesto → Temple Universe →
  5 Worlds grid → Floating Museum horizontal track →
  Craftsmanship 4-step → Bridal Constellation teaser →
  Concierge invitation → Showroom reveal
- 5 Collection Worlds — atmosphere-tinted backgrounds, featured artifact
  rotation, piece selector, continue-journey CTAs
- Bridal Journey — 4-question multi-step editorial questionnaire + contact
  step + WhatsApp continue
- Reserve — full reservation form with date/time/party size/world
- Showroom — Jubilee Hills address, 4-step in-showroom story, maps link
- Floating WhatsApp concierge with elegant card popup
- Backend lead routes POST /api/leads/{consultation,reservation,concierge}
  and GET /api/leads admin list
- Curated collection data — 5 worlds × 3 hand-written artifacts each

## Prioritized backlog
- **P1** Admin auth + dedicated /admin lead dashboard
- **P1** Real product CMS (replace hardcoded pieces with Mongo CRUD)
- **P2** Object storage upload for new collection imagery
- **P2** Bridal lookbook PDF delivery via email after questionnaire
- **P2** NRI region-aware concierge routing
- **P3** Optional ambient temple bell soundscape (toggleable)
- **P3** R3F upgrade once camera-controls becomes Node 20 compatible
- **P3** Festival landing pages (Ugadi, Diwali, Akshaya Tritiya)

## Known limitations
- Hero/Temple scenes use Canvas2D (not WebGL/R3F). Visual is cinematic
  but not true 3D — pragmatic choice for React 19 stability.
- No auth — lead-admin endpoint is open in Phase 1.
- Products are hardcoded curated showcase, not editable.
