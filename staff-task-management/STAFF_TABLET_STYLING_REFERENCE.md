# Staff Tablet App - Styling & Component Reference

This document contains styling, components, and utilities from the Staff Tablet App for reuse in the HQ/Store Manager repository.

---

## 📋 Table of Contents
1. [Color System & CSS Variables](#color-system)
2. [Core Utilities](#core-utilities)
3. [TypeScript Types](#typescript-types)
4. [Dependencies](#dependencies)
5. [Key Files Structure](#key-files)
6. [Component Patterns](#component-patterns)

---

## 🎨 Color System & CSS Variables

### Primary Colors
```css
/* src/styles/globals.css */

:root {
  --font-size: 16px;
  
  /* Background & Foreground */
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  
  /* Card */
  --card: #ffffff;
  --card-foreground: oklch(0.145 0 0);
  
  /* Popover */
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  
  /* Primary (Brand Color) */
  --primary: #030213;
  --primary-foreground: oklch(1 0 0);
  
  /* Secondary */
  --secondary: oklch(0.95 0.0058 264.53);
  --secondary-foreground: #030213;
  
  /* Muted */
  --muted: #ececf0;
  --muted-foreground: #717182;
  
  /* Accent */
  --accent: #e9ebef;
  --accent-foreground: #030213;
  
  /* Destructive */
  --destructive: #d4183d;
  --destructive-foreground: #ffffff;
  
  /* Borders & Inputs */
  --border: rgba(0, 0, 0, 0.1);
  --input: transparent;
  --input-background: #f3f3f5;
  --switch-background: #cbced4;
  
  /* Typography */
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  
  /* Ring (Focus) */
  --ring: oklch(0.708 0 0);
  
  /* Radius */
  --radius: 0.625rem;
  
  /* Custom Colors */
  --custom-pink: #D61F69;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
}
```

### Custom Color Classes
```css
/* Custom Pink Brand Color */
.bg-custom-pink {
  background-color: #D61F69;
}

.text-custom-pink {
  color: #D61F69;
}

.bg-custom-pink-light {
  background-color: #FDF2F8;
}
```

---

## 🛠️ Core Utilities

### 1. cn() Utility Function

**File:** `src/components/ui/utils.ts` or `src/lib/utils.ts`

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Usage:** Combines class names with Tailwind merge to handle conflicts.

```typescript
<button className={cn("px-4 py-2", className)} />
```

### 2. Helper Functions

**File:** `src/lib/utils.ts`

```typescript
// Format time display
export function formatTime(time: string): string {
  return time;
}

// Format date for display
export function formatDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Get status badge colors
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'Open': 'bg-gray-100 border-gray-300 text-gray-700',
    'Processing': 'bg-purple-100 border-purple-300 text-purple-700',
    'Pending': 'bg-yellow-100 border-yellow-300 text-yellow-700',
    'Awaiting Approval': 'bg-blue-100 border-blue-300 text-blue-700',
    'Done': 'bg-green-100 border-green-300 text-green-700',
    'Cancelled': 'bg-red-100 border-red-300 text-red-700',
  };
  return colors[status] || 'bg-gray-100 border-gray-300 text-gray-700';
}

// Get task type color
export function getTaskTypeColor(type: string): string {
  return type === 'DWS' ? 'bg-blue-500' : 'bg-orange-500';
}

// Calculate time slots for timeline
export function calculateTimeSlots(startHour: number, endHour: number, interval: number = 1): string[] {
  const slots: string[] = [];
  for (let hour = startHour; hour <= endHour; hour += interval) {
    slots.push(`${hour}:00`);
  }
  return slots;
}

// Calculate position on timeline
export function getTaskPosition(startTime: string, startHour: number): number {
  const [hours, minutes] = startTime.split(':').map(Number);
  return ((hours - startHour) * 60 + minutes) / 60;
}

// Calculate task width on timeline
export function getTaskWidth(startTime: string, endTime: string): number {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  const startTotal = startHours * 60 + startMinutes;
  const endTotal = endHours * 60 + endMinutes;
  return (endTotal - startTotal) / 60;
}
```

---

## 📝 TypeScript Types

### Core Types

**File:** `src/types/index.ts`

```typescript
export type TaskStatus = 'Open' | 'Processing' | 'Pending' | 'Awaiting Approval' | 'Done' | 'Cancelled';
export type TaskType = 'DWS' | 'WS';
export type ViewMode = 'timeline' | 'kanban' | 'list';
export type AIVerificationStatus = 'pending' | 'passed' | 'failed' | 'not_required';

export interface Staff {
  id: string;
  name: string;
  shiftStart: string;
  shiftEnd: string;
  taskAssignmentPercentage: number;
  building: string;
  city: string;
  region: string;
}

export interface Task {
  id: string;
  title: string;
  staffId: string;
  status: TaskStatus;
  type: TaskType;
  startTime: string;
  endTime: string;
  estimatedMinutes: number;
  actualMinutes?: number;
  description?: string;
  date: string;
  guide?: string;
  sampleImages?: string[];
  completionPhotos?: string[];
  aiVerificationStatus?: AIVerificationStatus;
  aiVerificationMessage?: string;
  requiresHQApproval?: boolean;
  autoApproved?: boolean;
  cancellationReason?: string;
}

export interface Shift {
  id: string;
  staffId: string;
  date: string;
  scheduledStart: string;
  scheduledEnd: string;
  actualCheckIn?: string;
  actualCheckOut?: string;
  isOff: boolean;
  shiftName?: string;
  taskAssignmentPercentage?: number;
}

export interface LeaderboardEntry {
  staffId: string;
  staffName: string;
  tasksCompleted: number;
  completionRate: number;
  totalHours: number;
  efficiency: number;
  rank: number;
}
```

---

## 📦 Dependencies

### Package.json

```json
{
  "dependencies": {
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-alert-dialog": "^1.1.6",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-slot": "^1.1.2",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-tooltip": "^1.1.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "*",
    "lucide-react": "^0.487.0",
    "next-themes": "^0.4.6",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.55.0",
    "recharts": "^2.15.2",
    "tailwind-merge": "*"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@vitejs/plugin-react-swc": "^3.10.2",
    "vite": "6.3.5",
    "typescript": "^5.x.x"
  }
}
```

### Tailwind Configuration (v4)

The project uses **Tailwind CSS v4** with the new configuration system. Key files:
- `src/styles/globals.css` - Main styles with custom variables
- `src/index.css` - Tailwind imports and utilities

---

## 📂 Key Files Structure

```
src/
├── components/
│   └── ui/                    # Reusable UI components (shadcn/ui style)
│       ├── utils.ts           # cn() utility
│       ├── button.tsx          # Button component
│       ├── card.tsx            # Card components
│       ├── badge.tsx           # Badge component
│       ├── dialog.tsx          # Dialog/Modal
│       ├── tabs.tsx            # Tabs component
│       ├── input.tsx           # Input fields
│       ├── label.tsx           # Labels
│       ├── select.tsx          # Select dropdowns
│       └── ... (many more)
│
├── lib/
│   ├── utils.ts               # Helper functions
│   └── mockData.ts             # Mock data (remove for production)
│
├── types/
│   └── index.ts                # TypeScript type definitions
│
├── styles/
│   └── globals.css             # Global styles and CSS variables
│
├── App.tsx                     # Main app component
├── main.tsx                    # Entry point
└── index.css                   # Tailwind CSS imports
```

---

## 🧩 Component Patterns

### Button Component

```typescript
// src/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border bg-background text-foreground hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3",
        lg: "h-10 rounded-md px-6",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

**Usage:**
```tsx
<Button variant="default" size="default">Click me</Button>
<Button variant="destructive" size="sm">Delete</Button>
<Button variant="outline" size="lg">Cancel</Button>
```

### Card Component

```typescript
// src/components/ui/card.tsx
import * as React from "react";
import { cn } from "./utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 px-6 pt-6",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <h4 className={cn("text-lg font-semibold", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-6 pb-6", className)} {...props} />;
}
```

**Usage:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Badge Component

```typescript
// src/components/ui/badge.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-white",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
```

**Usage:**
```tsx
<Badge variant="default">New</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Info</Badge>
```

---

## 🎨 Common Styling Patterns

### Status Colors
```typescript
const statusColors = {
  'Open': 'bg-gray-100 border-gray-300 text-gray-700',
  'Processing': 'bg-purple-100 border-purple-300 text-purple-700',
  'Pending': 'bg-yellow-100 border-yellow-300 text-yellow-700',
  'Awaiting Approval': 'bg-blue-100 border-blue-300 text-blue-700',
  'Done': 'bg-green-100 border-green-300 text-green-700',
  'Cancelled': 'bg-red-100 border-red-300 text-red-700',
};
```

### Task Type Colors
- **DWS**: Blue (`bg-blue-500`)
- **WS**: Orange (`bg-orange-500`)

### Layout Patterns
```tsx
// Page Container
<div className="flex flex-col h-screen bg-gray-100">
  {/* Header */}
  <header className="border-b bg-white">
    {/* Content */}
  </header>
  
  {/* Content Area */}
  <main className="flex-1 overflow-hidden">
    {/* Page Content */}
  </main>
  
  {/* Footer/Navigation */}
  <footer className="bg-white border-t">
    {/* Navigation */}
  </footer>
</div>
```

### Card with Status Badge
```tsx
<div className="border rounded-lg p-4 space-y-2">
  <div className="flex items-center justify-between">
    <h3 className="font-semibold">Task Title</h3>
    <Badge className={getStatusColor(status)}>{status}</Badge>
  </div>
  <p className="text-sm text-gray-600">Description</p>
</div>
```

---

## 🚀 Integration Guide

### 1. Install Dependencies
```bash
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge
npm install -D tailwindcss@next
```

### 2. Copy Core Files
- Copy `src/styles/globals.css` for CSS variables
- Copy `src/components/ui/utils.ts` for `cn()` utility
- Copy `src/lib/utils.ts` for helper functions
- Copy `src/types/index.ts` for type definitions
- Copy `src/components/ui/` for all UI components

### 3. Configure Tailwind
```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your custom colors
      },
    },
  },
};

export default config;
```

### 4. Main App Setup
```typescript
// src/App.tsx
import './styles/globals.css';

export function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Your app content */}
    </div>
  );
}
```

---

## 📌 Notes

1. **Brand Colors**: Uses custom pink (`#D61F69`) for primary actions and navigation
2. **Component Library**: Based on shadcn/ui with Radix UI primitives
3. **Styling**: Uses Tailwind CSS v4 with CSS variables for theming
4. **Accessibility**: Components include proper ARIA attributes
5. **Dark Mode**: CSS variables support dark mode (not implemented in staff app)

---

## 🔗 Related Files

- `package.json` - Complete dependency list
- `src/styles/globals.css` - Full CSS variable definitions
- `src/components/ui/` - All reusable components
- `src/types/index.ts` - Type definitions
- `src/lib/utils.ts` - Helper functions

---

**Last Updated:** January 2025  
**Repository:** Task and Shift Management App - Staff Tablet  
**Purpose:** Reference for HQ/Store Manager repository styling consistency
