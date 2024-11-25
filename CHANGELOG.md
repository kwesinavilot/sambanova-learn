# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# Changelog

## [1.0.4] - 2023-09-25

### Added
- Server-side API route for secure SambaNova API access
- Enhanced ExplainerAgent with friendly AI personality
- Markdown-based content rendering system
- Loading skeleton states for better UX

### Changed
- Split state management into separate user and mode stores
- Updated store persistence configuration
- Enhanced Explainer component with proper hydration
- Improved AI prompt engineering for better explanations

### Fixed
- CORS issues with external API calls
- State management and hydration conflicts
- Data fetching race conditions

### Architecture
- Added API routes for secure external calls
- Enhanced AI agent system with personality
- Improved markdown content structure

## [1.0.3] - 2024-11-25

### Added
- New `StoreProvider` component in `/components/providers/store-provider.tsx`
  - Handles store hydration at app level
  - Includes client-side safety checks
  - Provides loading state management

### Changed
- Modified root layout (`/app/layout.tsx`)
  - Added `StoreProvider` within the `ThemeProvider`
  - Maintained existing providers and configurations
  - Preserved hydration warnings suppression

- Updated Zustand store configuration (`mode-store.ts`)
  - Added `skipHydration: true` to persist middleware
  - Changed storage to `sessionStorage`
  - Improved type safety and state management

- Refactored Explainer component
  - Removed redundant local state management
  - Added proper hydration handling
  - Improved routing logic for missing topics
  - Added proper null state handling

### Fixed
- Infinite loop issue caused by state management conflicts
- Hydration mismatches between server and client
- Race conditions with persistence layer
- State initialization timing issues

### Architecture Changes
- Implemented proper provider hierarchy:
  1. ThemeProvider (outer)
  2. StoreProvider
  3. Application content
  4. Toaster

### Dependencies
- No new dependencies added
- Utilizing existing:
  - Zustand for state management
  - Next.js for routing
  - React for component architecture

### Notes
- Store hydration now happens at the application root level
- Components wait for hydration before rendering
- Improved error handling and state management
- Maintained existing theme and toast functionality

## [1.0.2] - 2023-09-25

### Added
- Chat-based interface for regular mode with animated messages
- Explainer component with loading skeleton states
- Shared layout structure for all learning modes
- Dynamic topic explanations based on difficulty level

### Changed
- Updated header component with centered layout and user profile
- Enhanced navigation flow between modes and onboarding
- Transformed regular mode from static to interactive chat interface


## [1.0.1] - 2023-09-23

### Added
- User onboarding flow with animated step-by-step form
- State management using Zustand for user data persistence
- Input validation for name, topic, and difficulty level
- Back navigation in onboarding steps
- Conditional routing based on user existence
- Centered layout with logo and welcome message
- Smooth transitions between onboarding steps

### Changed
- Reinitialized the project, starting from scratch
- Updated header component with centered layout
- Enhanced navigation flow between modes and onboarding