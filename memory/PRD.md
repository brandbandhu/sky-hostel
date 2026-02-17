# Sky Hostels - Product Requirements Document

## Original Problem Statement
Build a complete responsive hostel website for Sky Hostels (Premium PG Hostel) with:
- Multi-page React application (Home, About, Facilities, Pricing, Testimonials, Contact, Admission Policy, Privacy Policy, Terms, Refund Policy)
- Contact form submissions saved to database
- Booking inquiry system with admin panel
- Sky Blue design theme (#0EA5E9)
- Similar design style to zenzohostel.com
- Exact contact details: +917028156980, skyhostels3@gmail.com

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, Shadcn UI, Lucide React Icons
- **Backend**: FastAPI, Python
- **Database**: MongoDB
- **Routing**: React Router DOM v7

## User Personas
1. **Prospective Residents**: Students and working professionals looking for hostel accommodation near Vishwaraj Hospital, Pune
2. **Current Residents**: People using the website for information about facilities, timings, and policies
3. **Admin Staff**: Management team reviewing bookings and contact inquiries

## Core Requirements (Static)
### Design System
- Primary Color: Sky Blue (#0EA5E9)
- Secondary Colors: Dark Blue (#0369A1), Light Sky (#E0F2FE)
- Font: Poppins (Google Font - system default fallback)
- Border Radius: Cards 18px, Buttons 14px
- Shadow: 0 10px 30px rgba(14,165,233,0.15)

### Pages Required
1. Home - Hero, Stats, Rooms Preview, Facilities Preview, Testimonials, CTA
2. About - Vision, Mission, Why Choose Us, Location
3. Facilities - In-room facilities, Common facilities, Image showcase
4. Pricing - Room types, Pricing breakdown, Mess timings
5. Testimonials - Resident reviews, Stats, Video placeholders
6. Contact - Contact form, Map, Quick actions
7. Admission Policy - Steps, Documents, Rules, Payment policy
8. Privacy Policy - Data collection, Usage, Protection
9. Terms & Conditions - Agreement terms
10. Refund Policy - Refund categories, Process
11. Admin Dashboard - Booking inquiries, Contact messages

### Features
- Sticky header with navigation
- WhatsApp floating button
- Responsive design (mobile/tablet/desktop)
- Smooth scroll animations
- Toast notifications
- Google Maps integration
- Mock data for initial preview

## What's Been Implemented (as of Jan 11, 2025)

### Phase 1: Frontend with Mock Data ✅
**Date**: January 11, 2025

**Components Created**:
- Header.jsx - Sticky navigation with mobile menu
- Footer.jsx - Multi-column footer with links
- WhatsAppFloat.jsx - Floating WhatsApp button

**Pages Created**:
- Home.jsx - Full landing page with hero, stats, rooms, facilities, testimonials
- About.jsx - Vision/mission, Why choose us, Location advantages
- Facilities.jsx - In-room & common facilities grid with images
- Pricing.jsx - Room pricing cards, breakdown, mess timings
- Testimonials.jsx - Review cards, stats section
- Contact.jsx - Contact form (mock), map embed, quick actions
- AdmissionPolicy.jsx - 5-step process, documents, rules
- PrivacyPolicy.jsx - Data protection policies
- Terms.jsx - Terms & conditions
- RefundPolicy.jsx - Refund categories and process
- Admin.jsx - Dashboard with booking/contact tables (mock data)

**Data**:
- mock.js - Complete mock data for all content

**Images**:
- Hero section: Modern hostel building exterior
- Rooms: Single and double sharing room images
- Facilities: Study hall, dining, bathroom, common area
- Testimonials: Resident photos

**Design Features**:
- Sky Blue (#0EA5E9) color theme throughout
- Smooth hover animations and transitions
- Lucide React icons (no emoji icons)
- Gradient backgrounds
- Shadow effects on cards
- Responsive grid layouts
- Custom scrollbar styling

## Prioritized Backlog

### P0 (Must Have - Next Phase)
1. **Backend API Development**
   - Contact form submission endpoint
   - Booking inquiry submission endpoint
   - Admin authentication
   - Get bookings/contacts endpoints
   - Update booking status endpoint
   - Mark contact as read endpoint

2. **Database Schema**
   - Bookings collection
   - Contacts collection
   - Admin users collection (optional)

3. **Frontend-Backend Integration**
   - Remove mock.js dependencies
   - Connect contact form to API
   - Connect admin dashboard to API
   - Add loading states
   - Add error handling

### P1 (Should Have)
1. **Admin Features**
   - Admin login system
   - Booking approval/rejection
   - Email notifications on new bookings
   - Export data to CSV
   - Search/filter functionality

2. **User Features**
   - Booking form on pricing page
   - Image gallery with lightbox
   - Room availability calendar
   - Virtual tour

3. **SEO & Performance**
   - Meta tags for all pages
   - Open Graph tags
   - Schema markup
   - Image optimization
   - Lazy loading

### P2 (Nice to Have)
1. Payment gateway integration (Stripe/Razorpay)
2. Real-time chat support
3. Resident portal
4. Online rent payment
5. Maintenance request system
6. Blog section
7. Multi-language support

## Next Action Items
1. **Backend Development**:
   - Create MongoDB models for bookings and contacts
   - Implement POST /api/contact endpoint
   - Implement POST /api/bookings endpoint
   - Implement GET /api/admin/bookings endpoint
   - Implement GET /api/admin/contacts endpoint
   - Add PATCH /api/admin/bookings/:id/status endpoint

2. **Integration**:
   - Update Contact.jsx to submit to backend API
   - Create booking form component
   - Update Admin.jsx to fetch from backend API
   - Add proper error handling and validation

3. **Testing**:
   - Test all API endpoints with curl
   - Test form submissions end-to-end
   - Test admin dashboard data flow
   - Mobile responsiveness testing

## API Contracts (To Be Implemented)

### POST /api/contact
```json
Request:
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "subject": "string",
  "message": "string"
}

Response:
{
  "id": "string",
  "status": "success",
  "message": "Contact form submitted successfully"
}
```

### POST /api/bookings
```json
Request:
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "roomType": "string",
  "moveInDate": "string (ISO date)",
  "message": "string (optional)"
}

Response:
{
  "id": "string",
  "status": "success",
  "message": "Booking inquiry submitted successfully"
}
```

### GET /api/admin/bookings
```json
Response:
{
  "bookings": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "phone": "string",
      "roomType": "string",
      "moveInDate": "string",
      "status": "pending|confirmed|rejected",
      "createdAt": "string"
    }
  ]
}
```

### GET /api/admin/contacts
```json
Response:
{
  "contacts": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "phone": "string",
      "subject": "string",
      "message": "string",
      "status": "unread|read",
      "createdAt": "string"
    }
  ]
}
```

## Notes
- All frontend code uses mock data currently (see /app/frontend/src/data/mock.js)
- Contact form shows toast notification but doesn't save to database yet
- Admin dashboard displays mock bookings and contacts
- WhatsApp integration uses direct link (no API needed)
- Google Maps uses embed iframe (no API key needed)
- Images sourced from Unsplash via vision_expert_agent

## Success Metrics
- Page load time < 3 seconds
- Mobile responsive on all devices
- Contact form submission rate > 10%
- Booking inquiry conversion rate > 5%
- Admin dashboard usability score > 8/10
