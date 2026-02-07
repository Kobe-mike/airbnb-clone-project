# Design Guidelines - Client-Side Interface

## 🎨 Design Philosophy

Create a **modern, artistic, and clean interface** inspired by Airbnb's design language. Focus on:
- Clean typography
- Generous whitespace
- High-quality imagery as the hero element
- Smooth animations and transitions
- Clear visual hierarchy
- Intuitive user experience

---

## 🎯 Color Palette

### Primary Colors
- **Airbnb Pink** - `#FF385C` - Call-to-action buttons, active states
- **Dark Gray** - `#222222` - Primary text, headers
- **Light Gray** - `#F7F7F7` - Backgrounds, cards
- **White** - `#FFFFFF` - Main background, cards

### Accent Colors
- **Success Green** - `#00A699` - Confirmations, availability
- **Warning Yellow** - `#FFB81C` - Important notices
- **Error Red** - `#E74C3C` - Errors, cancellations
- **Info Blue** - `#1E90FF` - Information messages

### Text Colors
- **Primary Text** - `#222222` - Main content
- **Secondary Text** - `#717171` - Meta information, labels
- **Light Text** - `#ABABAB` - Disabled states, hints

---

## 🔤 Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
```

### Font Sizes
```css
/* Headings */
h1 { font-size: 2.5rem; font-weight: 700; line-height: 1.2; }  /* 40px */
h2 { font-size: 2rem; font-weight: 700; line-height: 1.3; }    /* 32px */
h3 { font-size: 1.5rem; font-weight: 600; line-height: 1.4; }  /* 24px */
h4 { font-size: 1.25rem; font-weight: 600; line-height: 1.5; } /* 20px */

/* Body Text */
p  { font-size: 1rem; font-weight: 400; line-height: 1.6; }    /* 16px */
small { font-size: 0.875rem; font-weight: 400; line-height: 1.5; } /* 14px */
```

### Font Weights
- **Regular** - `400` - Body text
- **Medium** - `500` - Navigation, buttons
- **Semi-bold** - `600` - Sub-headings
- **Bold** - `700` - Headings, emphasis

---

## 📐 Spacing & Layout

### Spacing Scale
```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
```

### Grid System
- **Max Width** - `1280px` - Desktop content
- **Columns** - 12-column responsive grid
- **Gutter** - `24px` on desktop, `16px` on mobile, `8px` on tablets

### Container Padding
```css
Desktop:  padding: 0 32px;
Tablet:   padding: 0 24px;
Mobile:   padding: 0 16px;
```

---

## 🎮 Interactive Elements

### Buttons

#### Primary Button
```css
background-color: #FF385C; /* Airbnb Pink */
color: white;
padding: 12px 24px;
border-radius: 8px;
font-size: 1rem;
font-weight: 600;
border: none;
cursor: pointer;
transition: all 0.3s ease;
```

- **Hover:** `background-color: #E63946;` (darker pink)
- **Active:** `transform: scale(0.98);` (slight press effect)
- **Disabled:** `opacity: 0.5; cursor: not-allowed;`

#### Secondary Button
```css
background-color: transparent;
color: #222222;
border: 2px solid #222222;
padding: 10px 22px;
border-radius: 8px;
font-size: 1rem;
font-weight: 600;
transition: all 0.3s ease;
```

- **Hover:** `background-color: #f7f7f7;`

### Form Inputs
```css
border: 1px solid #DDDDDD;
border-radius: 8px;
padding: 12px 16px;
font-size: 1rem;
font-family: inherit;
transition: all 0.3s ease;
```

- **Focus:** `border-color: #FF385C; box-shadow: 0 0 0 3px rgba(255, 56, 92, 0.1);`
- **Error:** `border-color: #E74C3C;`

### Links
```css
color: #FF385C;
text-decoration: none;
font-weight: 500;
border-bottom: 1px solid transparent;
transition: all 0.3s ease;
```

- **Hover:** `border-bottom-color: #FF385C;`

---

## 🖼️ Cards & Components

### Property Card
```css
background: white;
border-radius: 12px;
overflow: hidden;
box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
transition: all 0.3s ease;
```

- **Hover:** `box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12); transform: translateY(-2px);`

### Card Structure
```html
<div class="property-card">
  <div class="card-image">
    <img src="property.jpg" alt="Property">
    <span class="rating">4.9</span>
  </div>
  <div class="card-content">
    <h3>Property Name</h3>
    <p class="location">City, Country</p>
    <p class="description">Brief description</p>
    <div class="card-footer">
      <span class="price">$120<span class="unit">/night</span></span>
      <button class="wishlist-btn">♡</button>
    </div>
  </div>
</div>
```

---

## 🎬 Animations & Transitions

### Page Transitions
```css
/* Fade in animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide up animation */
@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Applied to page load */
body { animation: fadeIn 0.3s ease-out; }
.card { animation: slideUp 0.4s ease-out; }
```

### Hover Effects
- Subtle scale: `transform: scale(1.02);`
- Shadow elevation: Increase box-shadow
- Color transition: Smooth color changes on hover
- Cursor change: Visual feedback

### Timing
- **Quick interactions** - `0.2s` (buttons, inputs)
- **Card hover** - `0.3s` (smoother feel)
- **Page transitions** - `0.4s` (more noticeable)

---

## 📱 Responsive Design

### Breakpoints
```css
Mobile:       < 640px
Tablet:       640px - 1024px
Desktop:      > 1024px
Large:        > 1280px
```

### Mobile-First Approach
```css
/* Default: Mobile */
.card { width: 100%; }

/* Tablet */
@media (min-width: 640px) {
  .card { width: calc(50% - 8px); }
}

/* Desktop */
@media (min-width: 1024px) {
  .card { width: calc(25% - 12px); }
}
```

### Property Grid Responsive
- **Mobile** - 1 column
- **Tablet** - 2 columns
- **Desktop** - 3-4 columns
- **Large Desktop** - 4-6 columns

---

## 🏗️ Page Layouts

### Homepage Layout
```
┌─────────────────────────────────────────┐
│           Header & Navigation           │
├─────────────────────────────────────────┤
│                                         │
│    Hero Section with Search Widget      │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│    Featured Properties (4-6 cards)      │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│    Categories / Quick Filters           │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│    Popular Destinations Section         │
│                                         │
├─────────────────────────────────────────┤
│           Footer with Links             │
└─────────────────────────────────────────┘
```

### Search Results Layout
```
┌─────────────────────────────────────────┐
│           Header & Navigation           │
├─────────────────────────────────────────┤
│ ┌──────────────┐ ┌──────────────────┐   │
│ │   Filters    │ │  Results Grid    │   │
│ │  - Price     │ │                  │   │
│ │  - Type      │ │  Property Cards  │   │
│ │  - Amenity   │ │                  │   │
│ │  - Rating    │ │                  │   │
│ └──────────────┘ └──────────────────┘   │
│                                         │
│         Pagination or Load More         │
└─────────────────────────────────────────┘
```

### Property Detail Layout
```
┌─────────────────────────────────────────┐
│           Header & Navigation           │
├─────────────────────────────────────────┤
│                                         │
│    Image Gallery (Large + Thumbnails)   │
│                                         │
├──────────────────┬──────────────────────┤
│                  │                      │
│   Property Info  │   Booking Sidebar    │
│   - Details      │   - Price Info       │
│   - Amenities    │   - Date Selector    │
│   - Description  │   - Guest Count      │
│   - Host Info    │   - Book Button      │
│                  │                      │
│   Reviews        │                      │
│   - List         │                      │
│   - Rating       │                      │
│                  │                      │
└──────────────────┴──────────────────────┘
        Footer
```

---

## 🎯 Visual Hierarchy

### Importance Levels
1. **Primary** - Large headings, CTA buttons (Airbnb pink)
2. **Secondary** - Sub-headings, secondary buttons
3. **Tertiary** - Body text, helper text
4. **Meta** - Small gray text, timestamps

### Visual Weight
- Use **size**, **color**, **weight**, and **spaced** to create hierarchy
- Large elements naturally draw the eye first
- Bold colors (pink) naturally stand out
- Ample whitespace makes content feel important

---

## ✨ Image Handling

### Image Best Practices
- **Hero Image** - High quality, 16:9 aspect ratio, 1920x1080 minimum
- **Property Cards** - 1:1 or 4:3 aspect ratio, optimized for web (~500KB max)
- **Thumbnails** - Square images, 200x200px minimum
- **Lazy Load** - Load images as they become visible

### Image Overlays
```css
/* Overlay for card images */
.card-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.1));
  pointer-events: none;
}
```

---

## 📊 Component Library Examples

### Rating Display
```html
<div class="rating">
  <span class="stars">★★★★★</span>
  <span class="score">4.9</span>
  <span class="count">(248 reviews)</span>
</div>
```

### Image Gallery
```html
<div class="gallery">
  <div class="main-image">
    <img src="main.jpg" alt="Main view">
  </div>
  <div class="thumbnail-grid">
    <img src="thumb1.jpg" alt="Thumb 1">
    <img src="thumb2.jpg" alt="Thumb 2">
    <!-- More thumbnails -->
  </div>
</div>
```

### Search Bar
```html
<div class="search-bar">
  <input type="text" placeholder="Where are you going?" class="location">
  <input type="date" placeholder="Check in" class="checkin">
  <input type="date" placeholder="Check out" class="checkout">
  <select class="guests">
    <option>Guests</option>
  </select>
  <button class="search-btn">Search</button>
</div>
```

---

## 🌐 Browser Support

- **Chrome** - Latest 2 versions
- **Firefox** - Latest 2 versions
- **Safari** - Latest 2 versions
- **Edge** - Latest 2 versions
- **Mobile Browsers** - iOS Safari, Chrome Mobile

---

## ♿ Accessibility

### WCAG 2.1 Level AA Compliance

- **Color Contrast** - Text: 4.5:1 ratio minimum
- **Focus States** - Visible keyboard navigation
- **Alt Text** - Descriptive image descriptions
- **ARIA Labels** - Screen reader support
- **Semantic HTML** - Proper heading structure (h1, h2, h3)
- **Keyboard Navigation** - Full site navigable via keyboard

---

## 📋 Design Checklist

- [ ] Consistent spacing throughout
- [ ] Typography properly sized and weighted
- [ ] Color palette applied correctly
- [ ] Images are optimized and responsive
- [ ] Buttons have hover/active states
- [ ] Forms have proper focus states
- [ ] Mobile responsiveness tested
- [ ] Animations smooth and non-distracting
- [ ] Accessibility standards met
- [ ] Load times optimized
- [ ] Cross-browser compatibility verified

---

## 🎨 Visual Inspiration Resources

- **Airbnb.com** - Clean, modern aesthetic
- **Dribbble** - UI design trends
- **Pinterest** - Travel/hospitality design
- **Material Design** - Component guidelines
- **Apple HIG** - iOS/Mac design standards

---

This design guide ensures a cohesive, professional, and user-friendly interface that matches Airbnb's aesthetic while remaining unique to your application.
