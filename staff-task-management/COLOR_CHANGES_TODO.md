# AEON MaxValu Brand Color Changes - TODO

## Completed ✅
- [x] **Top Navigation Header** - Changed to `bg-custom-pink` (#D61F69)
- [x] **Bottom Navigation Active States** - Changed to `text-custom-pink` and `bg-custom-pink-light`

## Remaining Tasks

### 3. Task Type Badges
- [ ] Change DWS badge from `bg-blue-500` to custom pink
- [ ] Keep WS badge as `bg-orange-500` (no change needed)
- **File:** `src/lib/utils.ts` (getTaskTypeColor function)

### 4. Status Colors
- [ ] Change "Awaiting Approval" status from blue to pink colors
  - From: `bg-blue-100 border-blue-300 text-blue-700`
  - To: `bg-pink-100 border-pink-300 text-pink-700`
- **File:** `src/lib/utils.ts` (getStatusColor function)

### 5. Shift Management Page
- [ ] Performance indicator ≥75% from `bg-blue-500` to custom pink
- [ ] Today's date highlight from `bg-blue-50` and `text-blue-600` to pink variants
- [ ] Schedule legend "Working" indicator from blue to pink
- **File:** `src/components/ShiftManagement.tsx`

### 6. Leaderboard Page
- [ ] Header gradient from `from-blue-50 to-purple-50` to `from-pink-50 to-purple-50`
- [ ] High completion rate text from `text-blue-600` to custom pink
- [ ] Progress bar from `bg-blue-500` to custom pink
- **File:** `src/components/Leaderboard.tsx`

### 7. Task Detail Dialog (AI Verification)
- [ ] Info boxes from `bg-blue-50 border-blue-200` to pink variants
- [ ] Loading spinner from `text-blue-600` to custom pink
- [ ] AI verification messages from blue to pink colors
- **File:** `src/components/TaskDetailDialog.tsx`

### 8. Primary Buttons
- [ ] View toggle buttons (8 hour/24 hour) - need to check default button styles
- [ ] "Today" button - need to check if using default blue
- **Files:** `src/components/TimelineView.tsx`, `src/components/DateNavigation.tsx`

## CSS Classes to Add
Consider adding these utility classes to `src/index.css` as needed:
```css
.border-custom-pink { border-color: #D61F69; }
.bg-custom-pink-100 { background-color: #FDF2F8; }
.text-custom-pink-700 { color: #A01456; }
```

## Notes
- Using custom CSS classes approach since Tailwind arbitrary values were not rendering correctly
- Keep consistent with `#D61F69` as the primary brand color
- Use lighter shades for backgrounds and darker shades for text to maintain readability