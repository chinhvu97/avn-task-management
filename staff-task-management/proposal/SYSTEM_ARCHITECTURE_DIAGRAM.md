# System Architecture Diagram for Slide 12 (Technical Architecture)

## Overview
This document provides detailed specifications for creating the system architecture diagram, following the VTI solution style from the reference image.

## Slide Title
**"HỆ THỐNG KIỂM SOÁT TASK & SHIFT MANAGEMENT - TASK & SHIFT APP ON AWS"**
*(Task & Shift Management System - Task & Shift App on AWS)*

Subtitle: "Comprehensive Task & Shift Management Solution on Cloud Platform - Flexible, Scalable, Secure"

---

## Diagram Components

### 1. USER INTERACTION LAYER (Top Section)

**Title: "ĐỐI TƯỢNG SỬ DỤNG" (User Categories)**

#### A. Headquarters / Store Manager
- **Device**: Desktop PC / Laptop
- **Icon**: Laptop/Desktop icon
- **Access Method**: Web Browser (Chrome, Edge, Safari)
- **Features Used**:
  - Task assignment and management
  - Staff shift scheduling
  - Performance monitoring and analytics
  - Report generation
  - Approval workflows

#### B. Staff / Field Workers
- **Device**: Tablet (iPad)
- **Icon**: Tablet/Tablet icon
- **Access Method**: Web Browser (iOS Safari, Chrome)
- **Features Used**:
  - View assigned tasks
  - Update task status
  - Check-in/Check-out for shifts
  - Upload completion photos (for WS tasks)
  - View personal performance ranking

**Connection**: Both connect via "Internet / Web Access"

---

### 2. BACKEND SERVER LAYER (Middle Section - Main Focus)

**Title: "AWS CLOUD INFRASTRUCTURE"**
- **Color**: Orange/Blue gradient box (AWS brand colors)
- **Location**: Amazon Web Services Cloud

#### Core Services Box: "BUSINESS / DOMAIN SERVICES"

List of modules/services (in organized sections):

**📋 TASK MANAGEMENT SERVICES**
- Task Assignment Service
- Task Status Tracking Service
- Task Workflow Engine
- DWS/WS Task Router

**🕐 SHIFT MANAGEMENT SERVICES**
- Shift Scheduling Service
- Attendance Tracking Service
- Check-in/Check-out Service
- Shift Performance Analytics

**📊 PERFORMANCE & ANALYTICS SERVICES**
- Leaderboard Service
- Performance Metrics Service
- Reporting Service
- Real-time Analytics Service

**🎮 GAMIFICATION SERVICES**
- Ranking Engine
- Rewards Management
- Achievement Tracking
- Gamification Rules Engine

**⚙️ CORE SERVICES**
- User Authentication & Authorization
- Data Synchronization Service
- Notification Service
- API Gateway

---

### 3. EXTERNAL SYSTEM LINKAGE (Right Side)

**Title: "HỆ THỐNG BÊN NGOÀI" (External Systems)**

#### Connection: "API INTEGRATION (REST API)"

**EDOC System - One-Way Data Sync:**
- **Staff Data** - Employee information, profiles
- **Shift Data** - Shift schedules, assignments
- **Days Off Data** - Holiday calendar, off-days

**Direction**: EDOC → Task & Shift App (One-way sync)
**Frequency**: Real-time or scheduled sync
**Data Flow**: EDOC exports data → API Gateway → Database

(Optional - Future integrations shown with dashed lines):
- HR System
- Payroll System
- Time & Attendance System

---

## Layout Specifications

### Overall Structure
```
┌────────────────────────────────────────────────────────────────────┐
│                    HỆ THỐNG KIỂM SOÁT TASK & SHIFT                │
│                  TASK & SHIFT APP ON AWS                          │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌─────────────────┐              ┌─────────────────┐             │
│  │  HQ / Manager   │              │     Staff       │             │
│  │   Desktop PC    │              │   iPad Tablet   │             │
│  └────────┬────────┘              └────────┬────────┘             │
│           │                               │                      │
│           └──────────┬────────────────────┘                      │
│                      │                                            │
│            ┌─────────▼─────────┐                                  │
│            │   Web Browser /     │                                 │
│            │   Internet Access  │                                 │
│            └─────────┬──────────┘                                 │
│                      │                                            │
├──────────────────────┼────────────────────────────────────────────┤
│                      │                                            │
│            ┌─────────▼────────────────────────────────┐           │
│            │   AWS CLOUD INFRASTRUCTURE                │           │
│            │                                           │           │
│            │  ┌────────────────────────────────┐     │           │
│            │  │ BUSINESS / DOMAIN SERVICES       │     │           │
│            │  │                                  │     │           │
│            │  │ ┌───────────────────────────┐   │     │           │
│            │  │ │ TASK MANAGEMENT SERVICES  │   │     │           │
│            │  │ │ • Assignment              │   │     │           │
│            │  │ │ • Tracking                │   │     │           │
│            │  │ │ • Workflow                │   │     │           │
│            │  │ └───────────────────────────┘   │     │           │
│            │  │                                  │     │           │
│            │  │ ┌───────────────────────────┐   │     │           │
│            │  │ │ SHIFT MANAGEMENT SERVICES  │   │     │           │
│            │  │ │ • Scheduling              │   │     │           │
│            │  │ │ • Attendance               │   │     │           │
│            │  │ │ • Analytics                │   │     │           │
│            │  │ └───────────────────────────┘   │     │           │
│            │  │                                  │     │           │
│            │  │ ┌───────────────────────────┐   │     │           │
│            │  │ │ PERFORMANCE & ANALYTICS   │   │     │           │
│            │  │ │ • Leaderboard             │   │     │           │
│            │  │ │ • Metrics                 │   │     │           │
│            │  │ │ • Reporting               │   │     │           │
│            │  │ └───────────────────────────┘   │     │           │
│            │  │                                  │     │           │
│            │  │ ┌───────────────────────────┐   │     │           │
│            │  │ │ GAMIFICATION SERVICES      │   │     │           │
│            │  │ │ • Rankings                 │   │     │           │
│            │  │ │ • Rewards                  │   │     │           │
│            │  │ │ • Achievements             │   │     │           │
│            │  │ └───────────────────────────┘   │     │           │
│            │  └────────────────────────────────┘     │           │
│            └───────────────┬────────────────────┘           │
│                            │                                │
├────────────────────────────┼────────────────────────────────┤
│                            │                                │
│                            ▼                                │
│              ┌──────────────────────────────────┐           │
│              │  API INTEGRATION (REST API)       │           │
│              │            │                      │           │
│              │            ▼                      │           │
│              │  ┌────────────────────────────┐  │           │
│              │  │     EDOC SYSTEM            │  │           │
│              │  │  ┌────────────────────┐   │  │           │
│              │  │  │ • Staff Data       │   │  │           │
│              │  │  │ • Shift Data       │   │  │           │
│              │  │  │ • Days Off Data    │   │  │           │
│              │  │  └────────────────────┘   │  │           │
│              │  └────────────────────────────┘  │           │
│              └──────────────────────────────────┘           │
└────────────────────────────────────────────────────────────┘
```

---

## Design Guidelines

### Colors
- **AWS Cloud Box**: AWS Orange (#FF9900) gradient with blue accents
- **User Layer**: Light gray background (#F5F5F5)
- **External Systems Box**: Light yellow/beige (#FFF9E6)
- **Services Box**: White with subtle border
- **Connecting Lines**: Blue arrows (#0066CC)

### Typography
- **Headings**: Bold, 16-18pt
- **Sub-headings**: Semi-bold, 12-14pt
- **Service Names**: Regular, 10-11pt
- **Details**: Regular, 9-10pt
- **Language**: Vietnamese for titles, English for technical terms

### Icons
- Desktop/Laptop icon for HQ/Manager
- Tablet/iPad icon for Staff
- Cloud icon for AWS
- Database icon for data storage
- API arrows showing data flow
- Sync icon showing one-way data flow

### Spacing
- Vertical spacing between layers: 40px
- Padding inside boxes: 20px
- Margin between elements: 15px
- Horizontal layout proportions: 60% for main system, 40% for external

---

## Technical Details to Include

### Connection Methods (PHƯƠNG THỨC KẾT NỐI)
At the bottom of the slide:
- **Access via web browser** (Internet)
- **No software installation required**
- **Multi-device compatible** (Desktop & Tablet)
- **Real-time synchronization**

### Key Benefits (LỢI ÍCH NỔI BẬT)
List these advantages:
- **CLOUD-BASED**: Scalable AWS infrastructure
- **EDOC INTEGRATION**: Automated staff data sync
- **REAL-TIME UPDATES**: Instant multi-location synchronization
- **ENTERPRISE SECURITY**: Bank-grade security on AWS
- **OFFLINE CAPABLE**: Uninterrupted operation with sync
- **INFINITE SCALE**: Unlimited growth potential

---

## Slide Number
This should be **Slide 12** in the proposal deck (Technical Architecture)

## Implementation Notes
1. Use vector graphics for scalability
2. Ensure all icons are consistent in style
3. Use AWS brand colors for cloud infrastructure
4. Add subtle shadows for depth
5. Make connection arrows clearly visible
6. Use consistent arrow types (full for two-way, single for one-way)
7. Add labels above/below arrows indicating data flow direction

---

## Alternative Simplified Version
If the detailed version is too complex, you can use a simplified 3-layer version:

```
USERS (Desktop + Tablet)
    ↓
AWS CLOUD (Services)
    ↓
EXTERNAL SYSTEMS (EDOC API)
```

This keeps it cleaner and more focused on the key message: **Web-based, Cloud-hosted, EDOC-integrated solution**.


