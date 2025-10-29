# Shared Data Module

This module contains shared mock data, types, and API simulation for both HQ Task Assignment and Staff Task Management applications.

## Purpose

- **Shared Types**: TypeScript interfaces used by both apps (Task, Staff, TaskTemplate, etc.)
- **Mock Templates**: DWS and WS task templates created by HQ
- **Mock API**: Simulated backend API with event-based communication
- **Data Synchronization**: localStorage-based data sharing for prototype demo

## Structure

```
shared-data/
├── src/
│   ├── types.ts              # All TypeScript interfaces and types
│   ├── templates/            # Task templates (DWS/WS)
│   ├── staff/                # Staff profiles and store data
│   ├── state/                # Mock API and event emitter
│   └── index.ts              # Main export
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

This module is installed as a local dependency in both apps:

```json
{
  "dependencies": {
    "shared-data": "file:../shared-data"
  }
}
```

Then run:
```bash
npm install
```

## Usage

### Import Types
```typescript
import { Task, TaskStatus, Staff, TaskTemplate } from 'shared-data';
```

### Import Templates (coming soon)
```typescript
import { dwsTemplates, wsTemplates } from 'shared-data/templates';
```

### Import Mock API (coming soon)
```typescript
import { mockAPI } from 'shared-data';

// HQ: Assign tasks
mockAPI.assignTasks(tasks);

// Staff: Update task status
mockAPI.updateTaskStatus(taskId, 'Done');

// Listen for events
mockAPI.on('tasks:needsApproval', (task) => {
  console.log('Task needs approval:', task);
});
```

## Development

Type check:
```bash
npm run type-check
```

## Integration Status

- [x] TypeScript types defined
- [ ] DWS templates extracted
- [ ] WS templates extracted
- [ ] Mock API implemented
- [ ] Event system implemented
- [ ] Staff data consolidated
- [ ] Store data added
