# Core Objective
CreatorIQ is a centralized creator analytics and content performance dashboard designed to help content creators, influencer agencies, and marketing teams track multi-platform social media metrics, audience demographics, engagement growth, and monetization insights to make data-driven content decisions.

## User Roles & Access Control (RBAC)

### Creator:
  Connects personal social accounts, tracks content/audience metrics, and logs personal sponsorships/ad revenue.

### Agency:
 Manages multiple creator profiles, compares cross-creator performance, and exports client reports.

### Marketing Team:
 Monitors campaign reach, hashtag trends, audience demographics, and ROI.

### Administrator: 
Manages platform users, system health, API rate limits, and global configurations.

## Core Analytics Workflows

### Authentication & Onboarding Workflow:
 User registers with a designated role $\rightarrow$ Backend issues JWT access token $\rightarrow$ Role-specific dashboard loads.

### Data Ingestion & Aggregation Workflow: 
Social media accounts (YouTube, Instagram, TikTok, Facebook, X, LinkedIn) connect via OAuth2/API keys $\rightarrow$ Scheduled background jobs fetch raw metrics $\rightarrow$ Data is normalized and stored in PostgreSQL.

### Performance & Engagement Calculation Workflow:
 Raw metrics (views, likes, comments, shares, saves, watch_time) are processed to compute Engagement Rate = ((Likes + Comments + Shares + Saves) / Reach) \* 100.

### Monetization & Reporting Workflow:
 Creators log ad revenue, sponsorships, and affiliate payouts $\rightarrow$ Dashboard aggregates monthly revenue trends $\rightarrow$ Users export filtered KPI reports to PDF or Excel.
