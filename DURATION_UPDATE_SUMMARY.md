# Task Duration Standardization - Summary

## Overview
Updated all DWS and WS task templates to meet the minimum 30-minute requirement with standardized 15-minute increments.

**Date**: October 29, 2025
**Updated Files**:
- `shared-data/src/templates/dwsTemplates.ts` (110 tasks)
- `shared-data/src/templates/wsTemplates.ts` (10 tasks)

---

## Duration Requirements

All task durations must:
- Be **minimum 30 minutes**
- Use **15-minute increments** only

**Valid increments**: 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300...

---

## Changes Made

### DWS Templates (110 tasks)

Updated all tasks with durations less than 30 minutes or using invalid increments:

| Task Code | Task Title | Old Duration | New Duration |
|-----------|-----------|--------------|--------------|
| 1.1.2 | Cash Float Verification | 15 mins | 30 mins |
| 1.1.3 | POS System Login | 10 mins | 30 mins |
| 1.3.1 | Receipt Paper Replacement | 20 mins | 30 mins |
| 1.3.2 | POS Terminal Cleaning | 15 mins | 30 mins |
| 1.4.1 | Card Reader Testing | 10 mins | 30 mins |
| 1.4.2 | Barcode Scanner Check | 10 mins | 30 mins |
| 1.5.1 | Cash Drop Procedure | 20 mins | 30 mins |
| 1.5.2 | Change Fund Request | 15 mins | 30 mins |
| ... | (and 20+ more similar updates) | <30 mins | 30 mins |

**Result**: All 110 DWS tasks now use valid durations (30, 45, 60, 90, 120 minutes).

### WS Templates (10 tasks)

Updated 1 task with invalid increment:

| Task Code | Task Title | Old Duration | New Duration | Notes |
|-----------|-----------|--------------|--------------|-------|
| WS-009 | Summer Sale Promotion Setup | 200 mins (3h 20m) | 210 mins (3h 30m) | Rounded to nearest 15-min increment |

**All other WS tasks already compliant**:
- WS-001: 240 mins (4 hours) ✅
- WS-002: 180 mins (3 hours) ✅
- WS-003: 150 mins (2.5 hours) ✅
- WS-004: 120 mins (2 hours) ✅
- WS-005: 480 mins (8 hours) ✅
- WS-006: 300 mins (5 hours) ✅
- WS-007: 180 mins (3 hours) ✅
- WS-008: 240 mins (4 hours) ✅
- WS-010: 180 mins (3 hours) ✅

---

## Build Verification

Both apps built successfully after duration updates:

### HQ App Build
```
✓ 1711 modules transformed.
✓ built in 1.18s
build/assets/index-Cl2SFDYX.js  407.09 kB │ gzip: 96.97 kB
```

### Staff App Build
```
✓ 1702 modules transformed.
✓ built in 1.39s
build/assets/index-0jehlWsC.js  383.65 kB │ gzip: 112.76 kB
```

---

## Duration Distribution

### DWS Tasks (110 total)
- **30 minutes**: ~85 tasks (77%)
- **45 minutes**: ~15 tasks (14%)
- **60 minutes**: ~7 tasks (6%)
- **90 minutes**: ~2 tasks (2%)
- **120 minutes**: ~1 task (1%)

### WS Tasks (10 total)
- **120 minutes**: 1 task (Fire Safety Inspection)
- **150 minutes**: 1 task (Valentine Display)
- **180 minutes**: 3 tasks (New Year, Women's Day, Mid-Autumn)
- **210 minutes**: 1 task (Summer Sale)
- **240 minutes**: 2 tasks (Christmas, Back to School)
- **300 minutes**: 1 task (Lunar New Year)
- **480 minutes**: 1 task (Store Renovation)

---

## Impact on Apps

### HQ App (ai-hq-task-assignment)
- **DWSTaskTemplates.tsx**: Now displays all 110 tasks with standardized durations
- **Template creation**: New templates will follow the 30-minute minimum standard

### Staff App (staff-task-management)
- **Task Generation**: All generated tasks use standardized durations
- **Time Display**: Consistent duration formatting across Timeline, Kanban, and List views
- **Estimation**: More realistic time estimates for staff task completion

---

## Benefits

1. **Consistency**: All tasks follow the same duration standard
2. **Realistic Timing**: Minimum 30 minutes ensures tasks are substantial enough to track
3. **Scheduling**: 15-minute increments align well with shift scheduling
4. **User Experience**: Predictable duration patterns across both apps
5. **Maintainability**: Clear rules for adding new templates

---

## Next Steps

When adding new task templates:

1. Ensure `estimatedMinutes` is **minimum 30**
2. Use only **15-minute increments** (30, 45, 60, 75, 90, 105, 120...)
3. Consider realistic completion times for the task type
4. For very short tasks (<30 mins), combine them into a single larger task

---

**Updated**: October 29, 2025
**Status**: Complete ✅
**Both Apps**: Building Successfully ✅
