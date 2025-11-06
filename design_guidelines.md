# TSPark Design Guidelines

## Design Approach
**System Selected**: Material Design with fitness-focused adaptations
**Rationale**: Data-heavy application requiring clear information hierarchy, efficient CRUD operations, and multi-role dashboard management.

## Core Design Principles
1. **Functionality First**: Clean, scannable interfaces prioritizing task completion
2. **Role Clarity**: Visual distinction between admin, gym owner, and client interfaces
3. **Data Density**: Efficient use of space for tables, stats, and leaderboards
4. **Fitness Context**: Energetic yet professional aesthetic suitable for sports/training domain

## Typography

**Font Family**: 
- Primary: Inter (Google Fonts) - UI elements, data, forms
- Display: Poppins (Google Fonts) - Headings, hero sections

**Hierarchy**:
- Hero/Landing: 4xl-6xl, font-bold
- Page Titles: 3xl, font-semibold
- Section Headers: xl-2xl, font-semibold
- Card Titles: lg, font-medium
- Body Text: base, font-normal
- Captions/Meta: sm, font-normal
- Stats/Numbers: 2xl-4xl, font-bold (for emphasis)

## Layout System

**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6, p-8
- Section spacing: mb-8, mb-12, mb-16
- Grid gaps: gap-4, gap-6, gap-8
- Consistent rhythm using these values throughout

**Container Strategy**:
- Dashboard content: max-w-7xl mx-auto
- Forms: max-w-2xl
- Data tables: full width with px-4 to px-8

## Component Library

### Navigation
- **Admin Dashboard**: Sidebar navigation (w-64) with collapsible sections for Gyms, Exercises, Badges, Users
- **Gym Owner Dashboard**: Top navbar with quick access to My Gym, Challenges, Statistics
- **Client Interface**: Bottom tab navigation (mobile-first) for Explore, My Challenges, Progress, Profile
- All navigations use icon + label pattern (Heroicons)

### Data Display
- **Tables**: Striped rows, sticky headers, hover states, action columns with icon buttons
- **Stats Cards**: Grid layout (grid-cols-1 md:grid-cols-2 lg:grid-cols-4), large numbers with icons, trend indicators
- **Challenge Cards**: Image thumbnail, title, difficulty badge, duration, participant count, CTA button
- **Leaderboard**: Ranked list with user avatar, name, score/points, position indicator
- **Badge Display**: Icon grid with unlock status, progress bars for partial completion

### Forms
- **Gym Management**: Multi-step form (info → equipment → photos → review)
- **Challenge Creation**: Rich form with exercise selection (multi-select), duration picker, difficulty selector
- **Badge Rules**: Dynamic rule builder with condition/action pairs
- Form inputs: Consistent h-12, rounded-lg, focus states with ring
- Labels: text-sm font-medium mb-2
- Error states: text-red-600 text-sm mt-1

### Modals & Overlays
- **Confirmation Dialogs**: Centered modal with backdrop blur, max-w-md
- **User Details**: Slide-over panel from right (w-96) for quick user info/actions
- **Challenge Details**: Full modal with image header, scrollable content

### Buttons
- Primary: py-2.5 px-6, rounded-lg, font-medium, transition
- Secondary: outlined variant with border-2
- Icon buttons: w-10 h-10, rounded-lg for table actions
- Floating Action Button: Fixed bottom-right for quick challenge creation (client view)

## Page-Specific Layouts

### Landing Page (Marketing)
- Hero: Full-width with fitness imagery (running, gym equipment), centered headline + CTA
- Features: 3-column grid showcasing admin/owner/client capabilities
- Social Proof: Stats section (users, challenges completed, gyms)
- Final CTA: Sign up section with role selection

### Admin Dashboard
- Sidebar + main content area
- Overview: Stats grid (total gyms, pending approvals, active users, badges awarded)
- Recent Activity: Table of latest actions/approvals
- Quick Actions: Card grid for common tasks

### Gym Owner Dashboard
- Top stats: My gym capacity, active challenges, total participants
- Gym Details: Card with edit capability
- Challenge Management: Table with create/edit/view actions
- Performance: Charts showing participation trends

### Client Interface
- Explore: Filter bar + challenge card grid (masonry layout)
- My Challenges: Tabbed view (Active, Completed, Invited)
- Progress: Timeline view of training sessions, calorie charts, badges earned
- Profile: Avatar, stats, achievements, friend challenges

## Images

**Hero Section**: Large fitness imagery showing diverse people training (gym environment, outdoor exercise, community aspect) - Full-width, h-[500px] to h-[600px]

**Challenge Cards**: Thumbnail images (aspect-video) representing exercise type or gym facility

**Profile Avatars**: Circular, w-10 h-10 for lists, w-24 h-24 for profiles

**Badge Icons**: SVG icons from Heroicons (Trophy, Star, Lightning, Fire, Medal variations)

**Gym Photos**: Gallery grid (grid-cols-2 md:grid-cols-3) in gym detail views

**Empty States**: Illustration-style graphics for "No challenges yet", "No badges earned" states

## Accessibility & Polish
- All interactive elements meet 44x44 minimum touch target
- Form validation with clear error messages
- Loading states with skeleton screens for tables/cards
- Success notifications (toast, top-right) for CRUD actions
- Keyboard navigation support throughout
- Focus indicators on all interactive elements