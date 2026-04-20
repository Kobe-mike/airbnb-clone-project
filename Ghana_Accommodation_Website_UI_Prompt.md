# Ghana Stay — Accommodation Website UI Design Prompt
### Adapted from Divi Pixel Accommodation Layout · Ghanaian Cultural Edition

---

## 0. Design Philosophy & Identity

**Concept:** "Ghana Stay" is a premium Ghanaian accommodation and hospitality booking platform. The visual identity fuses contemporary hospitality design with Ghanaian cultural warmth — think Kente-inspired color accents, afro-modern typography, and the vibrancy of Accra's hospitality scene rendered in a sleek, editorial layout.

**Aesthetic Direction:** Luxury-editorial meets Afro-modern. Clean structure with bold typographic moments, warm earth tones anchored by deep gold and forest green accent pops. Not generic tropical — refined, cosmopolitan, and confidently Ghanaian.

**Font System (consistent across all pages):**
- **Display / Hero Headlines:** `Cormorant Garamond` (serif, 600 weight) — regal and editorial
- **Section Headings:** `DM Serif Display` (serif, regular) — warm authority
- **Body / UI Text:** `Outfit` (sans-serif, 300–500 weight) — clean, modern, legible
- **Monospace / Prices / Stats:** `DM Mono` (mono, 500) — precision and trust
- Load all four via Google Fonts. Apply via CSS custom properties.

**Color Palette (CSS custom properties):**
```css
--color-gold:        #C9943A;   /* Primary accent — Kente gold */
--color-deep-green:  #1B4332;   /* Primary dark — forest/nature */
--color-cream:       #FAF6EF;   /* Page background */
--color-earth:       #7B5E3A;   /* Warm secondary */
--color-charcoal:    #1C1C1E;   /* Text primary */
--color-slate:       #4A5568;   /* Text secondary */
--color-mist:        #F0EBE1;   /* Card backgrounds */
--color-white:       #FFFFFF;
--color-red-accent:  #8B2020;   /* Danger / highlight */
--color-border:      rgba(201,148,58,0.18); /* Gold-tinted borders */
```

**Motion Principles:**
- Staggered fade-up animations on section entry (using `IntersectionObserver`)
- Hover states: cards lift 4px with warm gold border glow
- Transitions: `all 0.35s cubic-bezier(0.22, 1, 0.36, 1)`
- Counters (stats): animate count-up on scroll into view
- No jarring instant snaps; everything eases gracefully

**Responsiveness Breakpoints:**
```
Mobile:   < 640px   → single column, hamburger nav
Tablet:   640–1024px → 2-col grids, condensed nav
Desktop:  > 1024px  → full layout as described
Wide:     > 1440px  → max-width: 1400px centered, generous padding
```

---

## 1. Sticky Navigation Bar

**Layout (3-zone, all on one bar):**
```
[ Nav Links (left) ]   [ LOGO (center) ]   [ Login · Contact (right) ]
```

**Specifications:**
- Full-width, `position: sticky; top: 0; z-index: 999`
- Background: `rgba(27,67,50,0.96)` with `backdrop-filter: blur(12px)` (deep green frosted glass)
- Height: 72px on desktop, 60px on mobile
- Bottom border: `1px solid rgba(201,148,58,0.25)` (subtle gold line)

**Left zone — Navigation Links:**
- Links: `Home · About Us · Stays · Services · Blog · Pricing · FAQ`
- Font: `Outfit`, 14px, 400 weight, color `#FAF6EF` (cream)
- Hover: text turns gold (`#C9943A`), underline slides in from left (CSS `::after` pseudo-element)
- "Stays" has a dropdown chevron → dropdown shows: Rooms, Villas, Chalets, Eco Lodges, Heritage Properties
- Dropdown: dark green card (`#1B4332`), gold left-border accent, items fade in staggered

**Center — Logo:**
- Logo image: `[ADMIN UPLOAD: site_logo]` — admin uploads via console; max height 48px
- Fallback text if no logo: "Ghana Stay" in `Cormorant Garamond`, 22px, gold color
- Clicking logo links to homepage

**Right zone:**
- `Log In` → ghost button (cream border, cream text, dark green bg on hover)
- `Contact` → filled button (gold bg `#C9943A`, charcoal text, slight rounded corners 6px)
- Both buttons: `Outfit`, 13px, 500 weight
- Font size: 13px, gap: 12px between buttons

**Mobile (< 640px):**
- Logo stays centered
- Hamburger menu icon (three lines, gold color) on the left replaces nav links
- Login + Contact collapse into hamburger drawer
- Drawer slides from left, full-height overlay, deep green background
- Nav links stacked vertically with 24px padding

---

## 2. Hero Section

**Layout:** Full-viewport-height (`100dvh`) with a cinematic two-part split:
- **Left panel (60% width):** Overlaid on a large, atmospheric hero background image
- **Right panel (40% width):** Cream background, booking search widget

**Left Panel:**
- Background: `[ADMIN UPLOAD: hero_background_image]` — full bleed, `object-fit: cover`
- Dark gradient overlay from bottom: `linear-gradient(to top, rgba(27,67,50,0.90) 0%, rgba(0,0,0,0.20) 60%, transparent 100%)`
- Content sits in the bottom-left, with 48px padding

**Hero content (on left panel, overlaid):**
- Badge chip: `★ 4.8 Rating — Trusted by Ghana Tourism Authority` — pill shape, gold border, cream text, `Outfit` 12px
- Headline (H1): Two lines — e.g., `"Find Your Perfect Stay` / `Across Ghana"` — `Cormorant Garamond`, 64px (desktop), 36px (mobile), white, 600 weight
- Subheadline: 16px, `Outfit` 300, cream at 80% opacity — admin-editable tagline: `[ADMIN TEXT: hero_subheadline]`
- CTA row: Two buttons side by side
  - `Explore Stays` → gold filled, rounded 8px, `Outfit` 500, 15px, charcoal text
  - `Log In` → ghost, cream border, cream text
- Animated scroll-cue arrow (bouncing down chevron, gold) at bottom-center

**Right Panel — Booking Search Widget:**
- Background: `var(--color-cream)`, rounded-left corner 24px (only left side rounds into the image)
- Heading: `"Plan Your Visit"` — `DM Serif Display`, 22px, charcoal
- Fields (stacked):
  1. **Location:** Dropdown of Ghanaian cities — Accra, Kumasi, Cape Coast, Tamale, Ho, Sunyani, Bolgatanga (Admin can add/edit cities via console: `[ADMIN: booking_locations]`)
  2. **Check-in Date:** Date picker, gold accent on selected date
  3. **Check-out Date:** Same style
  4. **Guests:** Number stepper (adults + children)
  5. **Accommodation Type:** Pill toggles — Room · Villa · Chalet · Eco Lodge · Heritage
- Search button: Full-width, gold filled, `"Search Stays"` in charcoal, 16px `Outfit` 500

**Trusted By Strip (below hero, full-width):**
- Background: `var(--color-mist)`, height 72px
- Label: `"Trusted by"` — `Outfit` 12px uppercase, letter-spacing 0.1em, `var(--color-slate)`
- Logo slots: 5 horizontally spaced partner logo placeholders
  - Each slot: `[ADMIN UPLOAD: trusted_logo_1]` through `[ADMIN UPLOAD: trusted_logo_5]`
  - If no image uploaded: shows a rounded placeholder rectangle with dashed gold border
  - On mobile: logos scroll horizontally (overflow-x: auto, no scrollbar visible)
- Admin can also edit the "Trusted by" label text: `[ADMIN TEXT: trusted_by_label]`

---

## 3. Featured Listings — "Spotlight Stays"

**Layout:** Asymmetric two-card hero layout
- Card A (left, 58% width): Large portrait orientation, taller card
- Card B (right, 40% width): Slightly shorter landscape card, offset vertically by 32px (overlaps slightly below card A)

**Each Featured Card contains:**
- Full-bleed photo background: `[ADMIN UPLOAD: featured_listing_1_image]` / `[ADMIN UPLOAD: featured_listing_2_image]`
- Bottom-gradient scrim: `linear-gradient(to top, rgba(27,67,50,0.92) 0%, transparent 55%)`
- **Property Name:** `DM Serif Display`, 28px (card A) / 22px (card B), white
- **Location:** Gold dot `●` + text e.g. `"East Legon, Accra"` — `Outfit` 13px, cream 70% opacity
- **Price badge:** Bottom-right corner — `"GHS 850/night"` — dark green pill, gold text, `DM Mono` 13px
- **Heart/Save icon:** Top-right corner, ghost white
- Hover: card scale 1.02 with a 2px gold border glow

**Section label:** Above the cards — `"Featured Stays"` — small caps, gold, `Outfit` 11px letter-spaced. Below: `"Handpicked experiences across Ghana"` — `DM Serif Display` 38px, charcoal.

---

## 4. Accommodation Type Filter + Property Grid

**Filter tabs row:**
- Pills: `All · Rooms · Villa · Eco Lodge · Heritage · Chalet · Compound Suite`
- Active pill: gold background, charcoal text
- Inactive: cream border, charcoal text, gold hover
- Clicking a pill filters the grid below (JS filter by data-attribute, animated fade)
- Admin can add/remove accommodation types: `[ADMIN: accommodation_type_tags]`

**Property Grid:**
- 3 columns on desktop, 2 on tablet, 1 on mobile
- Card anatomy (vertical card):
  - **Photo zone (top 55%):** `[ADMIN UPLOAD: listing_N_image]`, `border-radius: 12px 12px 0 0`, aspect ratio 4:3
    - Top-left badge: category type pill (e.g. "Eco Lodge") — muted green bg, white text, `Outfit` 11px
    - Top-right: Heart icon (save to wishlist)
  - **Details zone (bottom 45%):** cream bg, padded 16px
    - **Rating row:** gold stars (SVG, filled) + numeric `"4.7"` in `DM Mono` 13px
    - **Property name:** `DM Serif Display`, 18px, charcoal — `[ADMIN: listing_N_name]`
    - **Location:** `Outfit` 13px, `var(--color-slate)`, with a small map-pin icon (SVG)
    - **Info grid (2×2):** Rooms · Bathrooms · Internet · Parking — icon + label + value. Icons: simple SVG line-art, gold color
    - **Two feature icons:** e.g. Cleanliness ✓ · Amenities ✓ — `[ADMIN: listing_N_features]`
    - **Price row:** `"GHS [X]/night"` in `DM Mono` 500 16px gold + `"incl. taxes"` in slate 11px
    - **Book Now button:** full-width, deep green fill, cream text, `Outfit` 500 — rounded 8px, hover turns gold
    - **Host avatar + "Meet the Host" link:** small avatar circle `[ADMIN UPLOAD: host_N_photo]` + name `[ADMIN: host_N_name]`
- Grid loads 6 cards; "Load More" button (ghost, gold border) below

---

## 5. Category Showcase — "Ways to Stay"

**Layout:** Horizontal row of 3 large cards, each full-width of its column
- Columns: `repeat(3, 1fr)`, gap 20px on desktop; stacked single column on mobile

**Each category card:**
- Background image: `[ADMIN UPLOAD: category_N_image]` — `object-fit: cover`, height 380px
- Bottom overlay gradient (gold-tinted green): `linear-gradient(to top, rgba(27,67,50,0.88), transparent 60%)`
- **Category name (large):** e.g. `"Beach Retreats"` / `"Eco Lodges"` / `"Heritage Hotels"` — `Cormorant Garamond` 30px white 600
- **Starting from price:** `"From GHS 1,200/night"` — `DM Mono` 14px, gold
- **Hover:** card lifts, a gold bracket border animates in from corners (CSS clip-path transition)

**Default 3 Ghanaian categories (admin-editable names and images):**
1. `[ADMIN: category_1_name]` — default "Beach Retreats (Busua & Cape Coast)" — `[ADMIN UPLOAD: category_1_image]`
2. `[ADMIN: category_2_name]` — default "Eco Lodges (Volta & Kakum)" — `[ADMIN UPLOAD: category_2_image]`
3. `[ADMIN: category_3_name]` — default "Heritage Hotels (Accra & Kumasi)" — `[ADMIN UPLOAD: category_3_image]`

---

## 6. "Secure & Affordable" Value Proposition Section

**Layout:** 50/50 horizontal split on desktop; stacked on mobile (image first)

**Left half — Text + Amenity Icons:**
- Section tag: `"Why Choose Us"` — gold, `Outfit` 11px uppercase
- Star rating: 5 filled gold stars + `"(4.8/5)"` in `DM Mono`
- Heading: `"Economically Sound and Genuinely Ghanaian Hospitality"` — `DM Serif Display` 40px, charcoal
- Body paragraph: `Outfit` 16px, 300 weight, `var(--color-slate)`, line-height 1.8 — `[ADMIN TEXT: value_prop_body]`
- CTA: `"Explore All Stays"` — gold filled button
- **Amenity Icons strip** (below CTA, 2×3 grid or horizontal scroll on mobile):
  - Each item: SVG icon (gold, 28px) + label (`Outfit` 13px 500) + sub-label (`Outfit` 12px slate)
  - Items (admin-editable): `[ADMIN: amenity_N_icon]`, `[ADMIN: amenity_N_label]`, `[ADMIN: amenity_N_sublabel]`
  - Default items: Very Affordable (from GHS 350/night) · Generator Backup (24/7) · Valet Service (on request) · Room Service (24/7) · High-Speed Internet (100mbps+) · Air Conditioning (all rooms)
  - Admin can add up to 8 amenities

**Right half — Image Collage (Masonry-style):**
- 5 images arranged asymmetrically:
  - 1 tall image on the left (full height)
  - 2 stacked images top-right
  - 2 stacked images bottom-right, offset 24px down
- All images: `[ADMIN UPLOAD: gallery_image_1]` through `[ADMIN UPLOAD: gallery_image_5]`
- Small floating card overlaid at intersection: `"300+ Happy Guests"` — white card, `DM Mono` counter, gold star

---

## 7. Testimonial + Counter Section

**Layout:** Dark full-width band (`var(--color-deep-green)` background), with Kente-stripe decorative divider line (gold, red, and black stripes pattern at top and bottom edge, 6px tall)

**Testimonial:**
- Giant opening quote mark (`"`) — `Cormorant Garamond` 200px, `var(--color-gold)`, decorative, opacity 0.2, positioned absolute
- Quote text: `Outfit` 20px 300, white, line-height 2.0, max-width 700px, centered — `[ADMIN TEXT: testimonial_N_quote]`
- Author name: `DM Serif Display` 18px, gold — `[ADMIN: testimonial_N_name]`
- Author title: `Outfit` 13px, cream 60% — `[ADMIN: testimonial_N_title]`
- Author photo: circular avatar 56px — `[ADMIN UPLOAD: testimonial_N_photo]`
- Navigation dots below for multiple testimonials (carousel)
- Admin can add up to 6 testimonials

**Animated Counters row (below testimonials, separated by thin gold line):**
- 5 counter blocks side by side (separated by vertical gold lines on desktop, 2×3 grid on mobile)
- Each: large number in `DM Mono` 48px gold (count-up on scroll) + label in `Outfit` 14px cream
- Blocks (admin-editable values):
  - `[ADMIN: stat_1_value]` Locations Across Ghana
  - `[ADMIN: stat_2_value]` Years in Hospitality
  - `[ADMIN: stat_3_value]` Guests Hosted
  - `[ADMIN: stat_4_value]` Happy Reviews
  - `[ADMIN: stat_5_value]` Excellence Awards

---

## 8. Perks/Trust Bar

**Layout:** Cream background strip, 3 perks side-by-side, each separated by thin gold vertical divider

**Each perk card (no outer border, just inner content):**
- SVG icon: gold, 40px
- Title: `DM Serif Display` 18px, charcoal
- Subtitle: `Outfit` 14px 300, `var(--color-slate)`

**Default 3 perks (admin-editable):**
1. Free Cancellation — Selected stays; T&Cs apply
2. Fast & Reliable Internet — 100mbps minimum guaranteed
3. Easy Verification — Single Ghana Card or Passport required

All fields: `[ADMIN: perk_N_icon]`, `[ADMIN: perk_N_title]`, `[ADMIN: perk_N_subtitle]`

---

## 9. "Steal Deal" — Featured Offer Section

**Layout:** Full-width section with dark green background. Contains a large horizontal deal card with:
- **Left 50%:** Hero image `[ADMIN UPLOAD: deal_N_image]` — full height of card, `border-radius: 16px 0 0 16px`
  - Overlaid top-left badge: `"Best Deal"` — gold pill
  - Overlaid: Location + rating
- **Right 50%:** Details panel (cream bg), padded 40px, `border-radius: 0 16px 16px 0`
  - Small label: `"Steal Deal"` — gold, `Outfit` 11px uppercase
  - Property name (H2): `Cormorant Garamond` 44px 600, charcoal — `[ADMIN: deal_N_name]`
  - Location: `[ADMIN: deal_N_location]`
  - Price: `"GHS [X]/night"` — `DM Mono` 32px gold + `"including all taxes"` slate 12px
  - Stats grid (2×2): Bedrooms · Beds · Bathrooms · Balcony — each with icon + value — `[ADMIN: deal_N_specs]`
  - `Reserve Now!` button — gold filled, full-width of right panel
  - `"Terms and Conditions Apply"` — link text, `Outfit` 11px, slate — links to admin-managed T&C page

**Carousel Navigation:** Left/right arrow buttons (gold circle, dark green arrow icon) to cycle through multiple deals. Indicator dots below.
- Admin can add up to 5 deal listings

---

## 10. FAQ Section

**Layout:** Two-column on desktop (left: section header + expert CTA; right: accordion list). Single column on mobile.

**Left column:**
- Section tag: `"Common Queries"` — gold uppercase
- Heading: `"Got Questions? We've Got Answers."` — `DM Serif Display` 36px, charcoal
- Short para: `Outfit` 15px, slate — `[ADMIN TEXT: faq_intro]`
- Expert CTA card (dark green bg, rounded 16px):
  - `"Still Confused? Our Ghanaian Hospitality Experts Are Here."` — white text
  - Two buttons: `FAQ Page` (ghost) · `Contact Us` (gold filled)

**Right column — Accordion:**
- Each FAQ item: `Outfit` 15px 500 question, charcoal border bottom `var(--color-border)`
- Expand/collapse: gold `+` / `−` icon, answer slides open (CSS `max-height` transition)
- Answer text: `Outfit` 15px 300, `var(--color-slate)`
- Admin can add/edit/delete FAQ items via console: `[ADMIN: faq_items]` (title + body per item, unlimited)

---

## 11. Blog / "Spotlights" Section

**Layout:** Magazine-style mixed grid:
- Row 1: 1 large featured post (full width) with image left 55%, text right 45%
- Row 2: 3 equal-width cards (standard blog card layout)
- Row 3: 4 smaller cards in a tight row
- "View All Posts" CTA button centered below

**Each blog card:**
- Image: `[ADMIN UPLOAD: post_N_image]` — 16:9 aspect ratio, `border-radius: 10px`
- Tag chip (top-left on image): category — e.g. "Destinations · Lifestyle" — gold border, small text
- Date: `DM Mono` 12px, gold (month abbrev + day)
- Post title: `DM Serif Display`, charcoal, line-clamp 2
- Author avatar `[ADMIN UPLOAD: author_N_photo]` + author name — small, beneath title
- Hover: image zooms 1.04, gold underline appears on title

**Featured post (Row 1 large card):**
- Image on left at full card height, `border-radius: 16px 0 0 16px`
- Category + date row
- Title: `Cormorant Garamond` 36px 600, charcoal
- Excerpt paragraph: `Outfit` 15px 300, slate, 3 lines
- `"Read More →"` link — gold

**Ghanaian destination suggestions for blog post placeholders (admin replaces with real posts):**
- "The Ultimate Guide to Stays in Cape Coast"
- "Weekend Getaway: Volta Region's Best Eco Lodges"
- "Hidden Gems: Off-the-Beaten-Path in Northern Ghana"
- "Homowo Season: Where to Stay in Accra During Festivals"
- "Luxury in Kumasi: Heritage Hotels You Can't Miss"

---

## 12. Newsletter / Email Subscription Popup

**Trigger:** Appears after 8 seconds on page, or on exit intent. One-time per session.

**Design:** Centered modal overlay, `backdrop-filter: blur(8px)`, dark overlay `rgba(0,0,0,0.6)`

**Modal Card:** `var(--color-cream)` bg, `border-radius: 20px`, max-width 520px, padding 48px
- Close `×` button: top-right, charcoal
- Decorative Kente-stripe bar across top (4px, gold + green + red)
- Heading: `"Craft Your Ghana Visit with Exclusive Insights"` — `Cormorant Garamond` 32px charcoal
- Body: `Outfit` 15px slate — `[ADMIN TEXT: newsletter_popup_body]`
- Email field + `"Subscribe"` button (gold filled, full-width)
- Micro-text: `"We respect your inbox. No spam, ever."` — `Outfit` 11px slate
- Admin-editable: title, body, button text, confirmation message

---

## 13. Discount / Promo Popup

**Trigger:** Separate from newsletter. Appears on first visit, 3 second delay.

**Design:** Bottom-right corner (desktop), full-width bottom sheet (mobile)
- Compact card: `var(--color-deep-green)` bg, `border-radius: 16px`, shadow, width 320px
- Gold badge at top: `"20% OFF"` — `DM Mono` 32px gold
- Heading: `"Unlock Your First Stay Discount"` — `Outfit` 16px 500, white
- CTA: `"Claim Offer"` — gold filled button
- Small print: `"Terms and conditions apply"` — link to admin-managed T&C — `Outfit` 11px cream 60%
- Close `×` icon: top-right, cream
- Admin-editable: discount percentage, heading, CTA text, T&C link

---

## 14. Footer

**Layout:** 5-column grid (desktop), 2-column (tablet), single-column stacked (mobile)
- Footer background: `var(--color-charcoal)` (#1C1C1E)
- All text: cream/white tones
- Kente-stripe decorative divider at very top of footer

**Column 1 — Brand:**
- Logo: `[ADMIN UPLOAD: footer_logo]` (or fallback text) — white version of logo, max-width 140px
- Brand description: `Outfit` 13px, cream 60%, max 3 lines — `[ADMIN TEXT: footer_brand_description]`
- CEO/Founder credit: small avatar `[ADMIN UPLOAD: founder_photo]` + name + title — `[ADMIN: founder_name]`, `[ADMIN: founder_title]`
- Social media icons (SVG, inline):
  - Facebook: `[ADMIN: social_facebook_url]`
  - Instagram: `[ADMIN: social_instagram_url]`
  - TikTok: `[ADMIN: social_tiktok_url]`
  - WhatsApp: `[ADMIN: social_whatsapp_url]`
  - X (Twitter): `[ADMIN: social_twitter_url]`
  - YouTube: `[ADMIN: social_youtube_url]`
  - All icon URLs are admin-configured. If URL is empty, icon is hidden.
  - Icons: white, 20px, hover turns gold

**Columns 2–6 — Link Groups (admin-editable labels and URLs):**
All link groups have a heading in `DM Serif Display` 16px gold, and links in `Outfit` 13px cream 70% with hover gold.

- **About Us:** Our Story · Mission & Values · Meet the Team · Awards · Community Involvement
- **Accommodations:** Room Options · Suite Packages · Special Themes · Pet-Friendly · Accessibility
- **Amenities:** Free Wi-Fi · Parking · Fitness Center · Swimming Pool · Spa & Wellness
- **Local Attractions:** Landmarks · Dining · Cultural Events · Outdoor Activities · Shopping
- **Promotions:** Seasonal Discounts · Festival Packages · Weekend Gateway · Member Discounts

Admin can edit all link labels and URLs via `[ADMIN: footer_link_group_N]`

**Booking CTA bar (below columns, above bottom bar):**
- Two offer cards side-by-side (dark green bg, `border-radius: 12px`):
  - `"Book Accommodation"` → `"Get 10% OFF on First Booking"` with bed icon
  - `"Book for Business"` → `"Get 5% OFF on Business Stays"` with briefcase icon
- Admin-editable: `[ADMIN: booking_cta_1_text]`, `[ADMIN: booking_cta_1_discount]`, etc.

**Personal / Business Options strip:**
Two rows of icon-link items (cream, small, `Outfit` 13px) for quick nav:
- Personal: Accommodation · Camping Sites · Backpackers · Motorhome · Family Gatherings
- Business: Accommodation · Meeting Rooms · Corporate Packages

**Bottom bar (full-width, darker strip, `#111`):**
- Left: `"© 2025 Ghana Stay. All Rights Reserved."` — `Outfit` 12px cream 50%
- Center: Legal links (pipe-separated): `Terms & Conditions · Privacy Policy · Cookie Policy · Refund Policy · Booking Policy`
  - All 5 legal pages are fully admin-editable rich-text pages accessible via admin console: `[ADMIN PAGE: terms_and_conditions]`, `[ADMIN PAGE: privacy_policy]`, `[ADMIN PAGE: cookie_policy]`, `[ADMIN PAGE: refund_policy]`, `[ADMIN PAGE: booking_policy]`
  - Each opens in a clean full-page template with the site header/footer
- Right: `"Design by [Partner Name]"` — `[ADMIN TEXT: design_credit]`

---

## 15. Video Tutorial Modal

**Trigger:** Clickable "How to Make a Reservation" link/button

**Design:** Full-screen overlay, `backdrop-filter: blur(10px)`, centered modal
- `border-radius: 20px`, max-width 800px
- Embedded video player (same specs as Video Player UI Prompt from earlier)
- Close `×` top-right (cream on dark bg)
- Below video: step-by-step written guide (accordion or numbered list)
- Video source: `[ADMIN UPLOAD: tutorial_video]` — admin uploads MP4 via console

---

## 16. Admin Console Requirements (Full Summary)

All the following must be configurable without code changes:

### Images (all via file upload):
| Key | Description |
|-----|-------------|
| `hero_background_image` | Hero section full-bleed background |
| `site_logo` | Header logo (PNG/SVG, transparent bg) |
| `footer_logo` | Footer logo (white version) |
| `trusted_logo_1` – `trusted_logo_5` | "Trusted By" partner logos |
| `featured_listing_1_image` / `_2_image` | Two featured property hero images |
| `listing_N_image` (unlimited) | Property card photos |
| `host_N_photo` (per listing) | Host avatar per property |
| `category_1_image` – `category_3_image` | "Ways to Stay" category photos |
| `gallery_image_1` – `gallery_image_5` | Value prop collage images |
| `testimonial_N_photo` | Testimonial author avatars |
| `deal_N_image` | Steal Deal section images |
| `post_N_image` | Blog post thumbnail images |
| `author_N_photo` | Blog author avatars |
| `founder_photo` | Footer founder/CEO avatar |
| `tutorial_video` | How-to-book tutorial video (MP4) |

### Texts (all admin-editable inline):
- Hero headline, hero subheadline, "Trusted by" label
- Value proposition body copy, FAQ intro
- Newsletter popup heading and body
- Footer brand description, design credit
- All booking CTA texts and discount percentages
- Stat counter values (5 counters)
- Amenity labels and sub-labels (up to 8)
- Perk titles and subtitles (3 perks)

### Structured Data (CRUD in admin panel):
- FAQ items (question + answer, unlimited, drag-to-reorder)
- Accommodation listings (all fields per card)
- Blog posts (title, date, category, author, excerpt, body, image)
- Testimonials (quote, author, title, photo, up to 6)
- "Steal Deal" listings (up to 5)
- Accommodation type filter tags
- Booking locations (city list for search widget)
- Footer link groups and URLs (all 5 columns, CRUD)

### Social Links (admin-editable URLs, auto-hide if empty):
`social_facebook_url`, `social_instagram_url`, `social_tiktok_url`, `social_whatsapp_url`, `social_twitter_url`, `social_youtube_url`

### Legal Pages (rich-text editor in admin, each a full editable page):
- Terms & Conditions
- Privacy Policy
- Cookie Policy
- Refund Policy
- Booking Policy

---

## 17. Responsiveness Specifications

### Mobile (< 640px):
- Navbar: logo centered, hamburger left, no right buttons visible (inside drawer)
- Hero: single column, booking widget stacks below image panel
- Property grid: 1 column
- Category cards: single column, scrollable
- Footer: single column, social icons centered
- FAQ: full-width accordion only (no split layout)
- All font sizes reduced by ~20% (use `clamp()` for fluid scaling)

### Tablet (640–1024px):
- Navbar: logo centered, compact nav (fewer items visible), login + contact right
- Hero: booking widget overlaps bottom of hero image (absolute positioned)
- Property grid: 2 columns
- Category cards: 2 columns (third wraps below)
- Footer: 2-column grid
- Blog: 2-column grid

### Desktop (> 1024px):
- Full layout as described throughout this document

### Wide Screen (> 1440px):
- Outer container: `max-width: 1400px; margin: 0 auto`
- Hero section remains full-bleed (no max-width) but inner content uses 1400px container
- Section padding: `80px` top/bottom

---

## 18. Typography Scale Reference

| Element | Font | Size (desktop) | Weight | Color |
|---------|------|----------------|--------|-------|
| Hero H1 | Cormorant Garamond | 64px | 600 | White |
| Section H2 | DM Serif Display | 40px | 400 | Charcoal |
| Card Title | DM Serif Display | 22px | 400 | Charcoal |
| Body / Para | Outfit | 16px | 300 | Slate |
| UI Labels | Outfit | 13–14px | 500 | Charcoal/Slate |
| Tags / Badges | Outfit | 11px, uppercase | 500 | Various |
| Prices / Stats | DM Mono | 16–48px | 500 | Gold |
| Testimonial quote | Outfit | 20px | 300 | White |
| Buttons | Outfit | 14–15px | 500 | Varies |
| Footer links | Outfit | 13px | 300 | Cream 70% |

---

## 19. Dynamic & Cultural Touches

- **Kente stripe dividers:** Use a CSS `linear-gradient` stripe of gold + deep green + red (the Ghanaian flag palette) as section dividers — 6px tall, full-width
- **Pattern accents:** Subtle adinkra symbol watermark (SVG) as background texture on the hero left panel — very low opacity (0.04), white, repeating
- **Festival promotions:** Admin can activate a seasonal banner: e.g. `"Homowo Weekend Deal"` or `"Independence Day Special"` — a top-of-page dismissible banner bar, gold bg, charcoal text — `[ADMIN: promo_banner_text]`, `[ADMIN: promo_banner_active]` toggle
- **Currency display:** Show prices in Ghana Cedis (GHS) by default; admin can enable dual currency display (GHS + USD) — `[ADMIN: show_dual_currency]` toggle
- **WhatsApp CTA:** Floating WhatsApp button (bottom-right, always visible) linking to WhatsApp Business number — `[ADMIN: whatsapp_number]`, displayed as green circular button with WhatsApp SVG icon, 52px
- **Ghanaian city badges:** On property cards, city names use short Ghanaian location abbreviations + color-coded dot (e.g., gold dot for Accra, green for Cape Coast, red for Tamale)
- **Language:** All placeholder copy should use warm, welcoming Ghanaian hospitality tone — "Akwaaba (Welcome)" can be used in hero or newsletter popup subheadline as a cultural greeting

---

*End of Ghana Stay UI Design Prompt · v1.0*
*All `[ADMIN: ...]` and `[ADMIN UPLOAD: ...]` tags represent fields configurable via the admin console without code changes.*
