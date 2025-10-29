# AWS System Design for Task & Shift Management Application

## Executive Summary

This document outlines the comprehensive AWS infrastructure design for the AEON Vietnam Task & Shift Management Application. The system is designed to scale from a single store to hundreds of locations across Vietnam, supporting real-time task management, shift scheduling, attendance tracking, and gamification features.

---

## System Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER LAYER                            │
│  ┌──────────────┐              ┌──────────────┐              │
│  │ HQ/Managers  │              │   Staff      │              │
│  │  (Desktop)   │              │  (Tablets)   │              │
│  └──────┬───────┘              └──────┬───────┘              │
│         │                              │                     │
└─────────┼──────────────────────────────┼─────────────────────┘
          │                              │
          ▼                              ▼
┌──────────────────────────────────────────────────────────────┐
│                AWS CLOUD INFRASTRUCTURE                      │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │           Application Load Balancer              │       │
│  └────────────────────┬────────────────────────────┘       │
│                       │                                      │
│         ┌──────────────┼──────────────┐                     │
│         ▼              ▼              ▼                     │
│    ┌────────┐    ┌────────┐    ┌────────┐                  │
│    │ ECS     │    │ ECS     │    │ ECS     │                  │
│    │ Service │    │ Service │    │ Service │                  │
│    │ (Auth)  │    │(Business)│   │ (API)   │                  │
│    └────────┘    └────────┘    └────────┘                  │
│                       │                                      │
│         ┌──────────────┼──────────────────┐                │
│         ▼              ▼                  ▼                │
│    ┌────────────────────────────────────────┐              │
│    │            AWS SERVICES                 │              │
│    └────────────────────────────────────────┘              │
│                                                              │
│  Database │ Storage │ AI/ML │ Monitoring │ Security         │
│                                                              │
└───────────┼─────────────────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────────────┐
│      EXTERNAL SYSTEMS (EDOC Integration)       │
└──────────────────────────────────────────────┘
```

---

## AWS Services Breakdown

### 1. COMPUTE SERVICES

#### Amazon Elastic Container Service (ECS) with Fargate
**Purpose**: Container-based backend services

**Configuration**:
- **Task Management Service**: 2-4 vCPU, 4-8 GB RAM
- **Shift Management Service**: 2-4 vCPU, 4-8 GB RAM
- **Authentication Service**: 2 vCPU, 4 GB RAM
- **Notification Service**: 2 vCPU, 4 GB RAM
- **API Gateway Service**: 2-4 vCPU, 4-8 GB RAM
- **AI Verification Service**: 4-8 vCPU, 8-16 GB RAM (for photo analysis)

**Benefits**:
- Serverless container management
- Auto-scaling based on demand
- Pay only for running containers
- Easy deployment and rollback
- Multi-AZ deployment for high availability

**Cost Estimate**: $50-200/month per service (depending on usage)

#### AWS Lambda
**Purpose**: Event-driven microservices

**Use Cases**:
- Real-time notifications (SNS integration)
- Background job processing
- Scheduled tasks (shift generation)
- Data synchronization with EDOC
- Performance metric calculations

**Configuration**:
- 512 MB - 1 GB memory
- 30-second to 5-minute timeout
- EventBridge for scheduling

**Cost Estimate**: $10-50/month

#### Amazon EC2 (Optional)
**Purpose**: Stateful services or specific requirements

**Use Case**: 
- Self-hosted Redis (if not using ElastiCache)
- Legacy integration services

**Configuration**: t3.medium (2 vCPU, 4 GB RAM) instances

**Cost Estimate**: $50-100/month (if used)

---

### 2. DATABASE SERVICES

#### Amazon RDS for PostgreSQL
**Purpose**: Primary relational database for all business data

**Configuration**:
- **Instance Type**: db.t3.medium to db.t3.xlarge
- **Engine Version**: PostgreSQL 15 or later
- **Storage**: 
  - Initial: 100 GB GP3 SSD
  - Auto-scaling up to 1 TB
- **Multi-AZ**: Yes (for production)
- **Backup**: Automated daily backups with 7-day retention

**Data Stored**:
- User accounts and profiles
- Tasks (DWS and WS)
- Shift schedules
- Attendance records
- Performance metrics
- Leaderboard data
- Audit logs

**Optimization**:
- Connection pooling with PgBouncer
- Read replicas for reporting queries
- Automated performance insights

**Cost Estimate**: $150-500/month (including backup and Multi-AZ)

#### Amazon DynamoDB
**Purpose**: Real-time data and session management

**Configuration**:
- **On-demand mode** for unpredictable traffic
- **Tables**:
  - Active sessions
  - Real-time notifications
  - Task status cache
  - Leaderboard rankings (hot data)

**Benefits**:
- Single-digit millisecond latency
- Automatic scaling
- No operational overhead

**Cost Estimate**: $20-100/month

#### Amazon ElastiCache (Redis)
**Purpose**: Caching and real-time features

**Configuration**:
- **Type**: Redis 7.x
- **Instance**: cache.t3.small to cache.t3.medium
- **Cluster Mode**: Enabled for high availability

**Use Cases**:
- Session storage
- Task status caching
- Leaderboard rankings (real-time updates)
- API response caching
- Pub/Sub for real-time notifications

**Cost Estimate**: $50-200/month

---

### 3. STORAGE SERVICES

#### Amazon S3
**Purpose**: Object storage for media and static assets

**Buckets Configuration**:
1. **App Static Assets** (spa-task-shift-app)
   - Frontend React build files
   - Images, CSS, JavaScript
   - CloudFront origin

2. **User Uploads** (task-shift-uploads)
   - WS task photos
   - User profile pictures
   - Uploaded files
   - Lifecycle policies for archived data

3. **Backup Storage** (task-shift-backups)
   - Database backups
   - Application backups
   - Configuration backups

**Features**:
- Versioning enabled
- Cross-Region Replication
- Lifecycle policies
- Server-Side Encryption (SSE-S3)

**Cost Estimate**: $20-100/month (depending on storage)

#### Amazon EFS
**Purpose**: Shared file system for containers (if needed)

**Configuration**:
- EFS Standard
- Multi-AZ deployment
- 10 GB initial, scales automatically

**Cost Estimate**: $30-50/month (if used)

---

### 4. NETWORKING & CDN

#### Amazon CloudFront
**Purpose**: Content Delivery Network for static assets and API acceleration

**Configuration**:
- **Origins**: S3, ALB
- **Caching**: Aggressive caching for static assets
- **Edge Locations**: Worldwide (optimized for Vietnam)
- **HTTPS**: TLS 1.2+

**Benefits**:
- Low latency for Vietnamese users
- Reduced origin server load
- DDoS protection
- Cost reduction through caching

**Cost Estimate**: $30-150/month

#### Application Load Balancer (ALB)
**Purpose**: Request distribution and SSL termination

**Configuration**:
- **Type**: Application Load Balancer
- **Availability Zones**: Multi-AZ (minimum 2 AZs)
- **SSL/TLS**: ACM certificates
- **Listener**: HTTPS (443), HTTP (80) redirect to HTTPS
- **Health Checks**: Configured for ECS services

**Target Groups**:
- API Services (port 8080)
- Authentication Service (port 8081)
- Business Services (port 8082)

**Cost Estimate**: $25-50/month

#### Amazon Route 53
**Purpose**: DNS management

**Configuration**:
- Hosted zone for domain
- Health checks for failover
- Latency-based routing (optional)

**Cost Estimate**: $5/month

#### Amazon VPC
**Purpose**: Isolated network environment

**Configuration**:
- **CIDR**: 10.0.0.0/16
- **Public Subnets**: 2 AZs (for ALB)
- **Private Subnets**: 3 AZs (for ECS tasks)
- **NAT Gateways**: 2 AZs for outbound internet
- **Internet Gateway**: 1 for public resources

**Security**:
- Security groups with least privilege
- Network ACLs
- Flow logs enabled

**Cost Estimate**: $50-100/month (mostly NAT Gateway)

---

### 5. ARTIFICIAL INTELLIGENCE & MACHINE LEARNING

#### Amazon Rekognition
**Purpose**: Photo verification for WS tasks

**Use Cases**:
- Image moderation (inappropriate content detection)
- Quality assessment
- Object detection in uploaded photos
- Scene analysis for task completion

**Configuration**:
- Custom labels (if needed)
- Analyze labels API
- Detect moderation labels
- Detect objects

**Integration**:
- Trigger Lambda function on S3 upload
- Process images asynchronously
- Store analysis results in DynamoDB

**Cost Estimate**: $20-100/month (based on API calls)

#### Amazon Textract (Optional)
**Purpose**: Text extraction from task photos (if needed for audit)

**Cost Estimate**: $10-50/month (if used)

#### Amazon Comprehend (Optional)
**Purpose**: Sentiment analysis on task notes/feedback

**Cost Estimate**: $10-50/month (if used)

---

### 6. ANALYTICS & MONITORING

#### Amazon CloudWatch
**Purpose**: Monitoring and logging

**Configuration**:
- **Metrics**: Custom metrics for business KPIs
- **Dashboards**: Performance dashboards
- **Alarms**: CPU, memory, request rates
- **Log Groups**: Application logs, access logs
- **Log Retention**: 30 days (configurable)

**Use Cases**:
- Track task completion rates
- Monitor API performance
- Alert on errors
- Cost monitoring

**Cost Estimate**: $20-100/month

#### AWS X-Ray
**Purpose**: Distributed tracing

**Configuration**:
- End-to-end request tracing
- Performance bottleneck identification
- Service map visualization

**Cost Estimate**: $15-50/month

#### Amazon QuickSight (Optional)
**Purpose**: Business intelligence dashboards

**Use Cases**:
- Management dashboards
- Performance analytics
- Custom reports

**Cost Estimate**: $200-500/month (if used)

---

### 7. MESSAGING & EVENT PROCESSING

#### Amazon SNS (Simple Notification Service)
**Purpose**: Push notifications and alerts

**Topics**:
- Task assignments
- Shift reminders
- Approval requests
- Performance updates
- System alerts

**Integration**:
- SNS → Lambda → Push notifications
- Email notifications via SES

**Cost Estimate**: $10-50/month

#### Amazon SQS (Simple Queue Service)
**Purpose**: Decoupled service communication

**Queues**:
- Task processing queue
- Notification queue
- Background job queue

**Benefits**:
- Asynchronous processing
- Dead letter queues for error handling
- Auto-scaling based on queue depth

**Cost Estimate**: $5-30/month

#### Amazon EventBridge (CloudWatch Events)
**Purpose**: Event-driven architecture

**Rules**:
- Scheduled shift generation
- Daily task assignment
- Scheduled reports
- Performance calculations

**Cost Estimate**: $5-20/month

---

### 8. SECURITY SERVICES

#### AWS IAM (Identity and Access Management)
**Purpose**: Authentication and authorization

**Configuration**:
- IAM users for operations team
- IAM roles for ECS tasks
- IAM policies with least privilege
- Cross-account access (if needed)

**Cost**: Free

#### Amazon Cognito
**Purpose**: User authentication and authorization

**Configuration**:
- User pool for staff and managers
- JWT tokens for API authentication
- Federated identity (optional SSO)
- Password policies
- MFA (optional)

**Use Cases**:
- Login/logout
- Password reset
- Session management
- Role-based access control

**Cost Estimate**: $0-50/month (free tier covers most users)

#### AWS Secrets Manager
**Purpose**: Secure credential storage

**Secrets Stored**:
- Database passwords
- EDOC API keys
- Third-party API keys
- Certificate private keys

**Benefits**:
- Automatic rotation
- Audit trail
- Encryption at rest

**Cost Estimate**: $10-30/month

#### AWS WAF (Web Application Firewall)
**Purpose**: Web application protection

**Configuration**:
- AWS Managed Rules
- Custom rate limiting rules
- IP whitelisting/blacklisting
- SQL injection protection
- XSS protection

**Cost Estimate**: $15-50/month

#### AWS GuardDuty (Optional)
**Purpose**: Threat detection

**Configuration**:
- Continuous monitoring
- Threat intelligence feeds
- Anomaly detection

**Cost Estimate**: $20-100/month

#### AWS Shield Standard
**Purpose**: DDoS protection

**Configuration**: Included free with ALB
**Cost**: Free (Advanced available for $3,000/month)

---

### 9. INTEGRATION SERVICES

#### Amazon API Gateway
**Purpose**: External API integration (EDOC)

**Configuration**:
- REST API for EDOC integration
- Rate limiting
- Request/response validation
- API keys for authentication

**Endpoints**:
- Staff data sync
- Shift data sync
- Days off data sync

**Cost Estimate**: $10-50/month

---

### 10. DEPLOYMENT & CI/CD

#### AWS CodePipeline
**Purpose**: Automated CI/CD pipeline

**Stages**:
- Source (GitHub/GitLab integration)
- Build (AWS CodeBuild)
- Deploy (AWS CodeDeploy to ECS)

**Cost Estimate**: $10-30/month

#### AWS CodeBuild
**Purpose**: Build and test

**Configuration**:
- Build Docker images
- Run tests
- Security scanning

**Cost Estimate**: $10-50/month

#### Amazon ECR (Elastic Container Registry)
**Purpose**: Container image storage

**Configuration**:
- Image scanning for vulnerabilities
- Lifecycle policies

**Cost Estimate**: $5-15/month

---

## Regional Architecture

### Primary Region: Asia Pacific (Singapore) or (Tokyo)
**Rationale**:
- Low latency for Vietnam
- Data residency compliance
- Cost-effective pricing

### Disaster Recovery: Asia Pacific (Sydney)
**Purpose**: Backup region for disaster recovery
- Cross-region replication enabled
- Read replica in DR region (optional)

---

## Cost Estimates

### Monthly Operating Costs

**Development/Testing Environment**: $500-1,200/month
- Reduced instance sizes
- No Multi-AZ for non-critical services
- Limited usage

**Production Environment**: $2,000-5,000/month
- Full Multi-AZ deployment
- Larger instance sizes
- High availability
- Backup and monitoring

**Breakdown (Production)**:
- Compute (ECS/Lambda): $300-800
- Database (RDS): $150-500
- Cache (ElastiCache): $50-200
- Storage (S3/EFS): $50-200
- Network (CloudFront/ALB): $100-300
- AI/ML (Rekognition): $50-200
- Monitoring (CloudWatch): $50-150
- Security: $50-200
- Messaging: $20-100
- Other: $100-300

### Scaling Considerations
- **10 stores**: 1.5x base cost
- **50 stores**: 3-4x base cost
- **200+ stores**: 6-8x base cost (requires architecture review)

---

## High Availability & Disaster Recovery

### Availability Zones
- Minimum 2 AZs for critical services
- Database in 3 AZs
- Load balancer in multi-AZ

### Disaster Recovery Strategy
**RTO (Recovery Time Objective)**: 4 hours
**RPO (Recovery Point Objective)**: 1 hour

**Measures**:
- Automated daily backups
- Cross-region replication for S3 and RDS
- Infrastructure as Code for quick recovery
- Documentation and runbooks

---

## Security Architecture

### Data Encryption
- **At Rest**: AES-256 encryption for all data
- **In Transit**: TLS 1.2+ for all connections
- **Database**: RDS encryption at rest
- **S3**: SSE-S3 encryption

### Network Security
- VPC with private subnets for compute
- Security groups with least privilege
- WAF for application protection
- DDoS protection (Shield Standard)

### Access Control
- IAM roles for resource access
- Cognito for user authentication
- MFA for admin accounts
- Audit logs (CloudTrail)

### Compliance
- GDPR compliance (if applicable)
- SOC 2 Type II considerations
- Data residency in APAC region

---

## Monitoring & Alerting

### Key Metrics to Monitor
1. **Business Metrics**:
   - Task completion rate
   - Active users
   - API response times
   - Shift coverage percentage

2. **Technical Metrics**:
   - CPU and memory utilization
   - Database connections
   - Error rates
   - Request latency

3. **Cost Metrics**:
   - Daily AWS spend
   - Cost per service
   - Forecasted costs

### Alerts Configuration
- **Critical**: Application errors, database connectivity issues
- **Warning**: High CPU/memory, slow API responses
- **Info**: Deployments, configuration changes

---

## Scalability Plan

### Initial Phase (1-10 stores)
- Single region deployment
- Standard instance sizes
- Basic monitoring
- **Cost**: $2,000-3,000/month

### Growth Phase (10-50 stores)
- Add read replicas
- Enable auto-scaling
- Enhanced monitoring
- **Cost**: $3,000-4,500/month

### Scale Phase (50-200+ stores)
- Multi-region deployment
- Dedicated instance types
- Advanced analytics
- **Cost**: $5,000-8,000/month

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
- Set up VPC and networking
- Deploy RDS database
- Configure S3 buckets
- Set up ALB and CloudFront

### Phase 2: Core Services (Weeks 3-4)
- Deploy authentication service
- Deploy task management service
- Deploy shift management service
- Set up CI/CD pipeline

### Phase 3: Advanced Features (Weeks 5-6)
- AI/ML integration (Rekognition)
- Real-time features (WebSocket)
- Notification service
- Analytics dashboards

### Phase 4: Integration & Optimization (Weeks 7-8)
- EDOC API integration
- Performance optimization
- Security hardening
- Load testing

---

## Best Practices

### Cost Optimization
- Use Reserved Instances for predictable workloads
- Enable auto-scaling to match demand
- Set up S3 lifecycle policies
- Monitor and optimize unused resources

### Performance Optimization
- Use CloudFront for static assets
- Implement caching strategies
- Database query optimization
- CDN for API responses (if applicable)

### Operational Excellence
- Infrastructure as Code (Terraform/CloudFormation)
- Automated backups and testing
- Comprehensive logging
- Regular security reviews

---

## Appendix: Service Catalog Summary

| Service Category | AWS Service | Primary Purpose | Cost/Month |
|------------------|-------------|-----------------|------------|
| Compute | ECS Fargate | Container runtime | $300-800 |
| Compute | Lambda | Event-driven | $20-50 |
| Database | RDS PostgreSQL | Primary database | $150-500 |
| Database | DynamoDB | Real-time data | $20-100 |
| Cache | ElastiCache Redis | Caching | $50-200 |
| Storage | S3 | File storage | $30-100 |
| CDN | CloudFront | Content delivery | $30-150 |
| Network | ALB | Load balancing | $25-50 |
| Network | Route 53 | DNS | $5 |
| Network | VPC/NAT | Networking | $50-100 |
| AI/ML | Rekognition | Photo verification | $50-200 |
| Analytics | CloudWatch | Monitoring | $50-150 |
| Messaging | SNS/SQS | Events/Notifications | $20-80 |
| Security | Cognito | Authentication | $0-50 |
| Security | WAF/GuardDuty | Protection | $35-150 |
| CI/CD | CodePipeline/CodeBuild | Deployment | $20-80 |
| **TOTAL** | | | **$2,000-5,000** |

---

## Conclusion

This AWS system design provides a scalable, secure, and cost-effective foundation for the AEON Vietnam Task & Shift Management Application. The architecture is designed to:

- ✅ **Scale from 1 to 200+ stores** without major redesign
- ✅ **Maintain high availability** with multi-AZ deployment
- ✅ **Ensure security** with comprehensive protection measures
- ✅ **Optimize costs** through serverless and auto-scaling
- ✅ **Enable rapid development** with modern cloud services
- ✅ **Integrate seamlessly** with EDOC and future systems

The estimated monthly cost ranges from $2,000-5,000 for production deployment, with the ability to scale up or down based on actual usage.

---

**Document Version**: 1.0  
**Last Updated**: December 2024  
**Prepared For**: AEON Vietnam Task & Shift Management Proposal

