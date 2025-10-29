# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Development Server
```bash
npm run dev       # Start development server on http://localhost:3000 (Vite configured port)
```

### Build
```bash
npm run build     # Build for production (outputs to build/ directory)
```

### Install Dependencies
```bash
npm install       # Install all dependencies
```

## Architecture Overview

This is a React-based Task and Shift Management application built with Vite and TypeScript. The app provides task management, shift scheduling, and performance leaderboard functionality.

### Tech Stack
- **Build Tool**: Vite with React SWC plugin for fast HMR
- **UI Framework**: React 18.3 with TypeScript
- **Component Library**: shadcn/ui (built on Radix UI primitives)
- **Styling**: Tailwind CSS with custom utility classes
- **State Management**: React hooks (useState)

### Application Structure

The app has three main pages accessible via bottom navigation:
1. **Tasks Page** - Three view modes (Timeline, Kanban, List) for task management
2. **Shifts Page** - Employee shift scheduling and management
3. **Leaderboard Page** - Performance statistics and rankings

### Key Component Relationships

- `App.tsx` serves as the main orchestrator, managing global state and page routing
- Task data flows through multiple view components (TimelineView, KanbanView, ListView)
- `TaskDetailDialog` handles task editing and status updates
- Mock data in `lib/mockData.ts` simulates backend responses

### View Modes

The Tasks page supports three different views:
- **Timeline View**: Visual schedule with time-based task layout
- **Kanban View**: Column-based task board by status
- **List View**: Tabular view with sortable columns

### State Management Pattern

- Global task state managed in App.tsx
- Status changes flow through `handleStatusChange` callback
- Task filtering by date and type (DWS/WS) happens at App level
- Individual components receive filtered data as props

### Build Configuration

Vite is configured with:
- Port 3000 for development server
- ESNext build target
- Path alias `@` pointing to `src/`
- Custom output directory `build/`
- Extensive Radix UI package aliasing for version consistency