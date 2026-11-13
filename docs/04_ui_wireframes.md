# CreatorIQ — UI Wireframes & Dashboard Workflow Plan

## 1. User Navigation Flow
`Landing / Login (/login)` $\rightarrow$ `Role Verification (JWT)` $\rightarrow$ `Overview Dashboard (/dashboard)` $\rightarrow$ `Module Views (Content, Audience, Revenue, Integrations)`

---

## 2. Screen 1: Authentication (`/login` & `/register`)
**Purpose:** Allows Creators, Agencies, Marketing Teams, and Admins to register and log in with Role-Based Access Control (RBAC).

```text
+-------------------------------------------------------+
|                      CreatorIQ                        |
|        Creator Analytics & Performance Platform       |
|                                                       |
|   +-----------------------------------------------+   |
|   |  Create Account / Sign In                     |   |
|   |                                               |   |
|   |  Full Name:   [ Aaditya Sharma              ] |   |
|   |  Email:       [ aaditya@example.com         ] |   |
|   |  Password:    [ ••••••••••••                ] |   |
|   |  Select Role: [ Creator                  v ] |   |
|   |               (Creator / Agency / Marketing)  |   |
|   |                                               |   |
|   |  [           Continue to Dashboard          ] |   |
|   +-----------------------------------------------+   |
+-------------------------------------------------------+




+------------------+-------------------------------------------------------------------+
|  CreatorIQ       |  Overview Dashboard         [All Platforms v] [Last 30 Days v]  |
|  [Role: Creator] |                                                       [Logout]    |
+------------------+-------------------------------------------------------------------+
|                  |                                                                   |
| > Overview       |  +---------------+ +---------------+ +-------------+ +----------+ |
|   Content        |  | Followers     | | Total Views   | | Engagement  | | Revenue  | |
|   Audience       |  | 1,24,500      | | 8,42,100      | | 6.4%        | | ₹85,400  | |
|   Growth/Trends  |  | +4.2%         | | +12.8%        | | +0.8%       | | +15.0%   | |
|   Revenue        |  +---------------+ +---------------+ +-------------+ +----------+ |
|   Integrations   |                                                                   |
|   Reports        |  +---------------------------------+ +--------------------------+ |
|                  |  | Views & Follower Growth (Line)  | | Engagement Split (Bar)   | |
|                  |  |       /\      /\                | |   |   |                    | |
|                  |  |  /\  /  \  /\/  \               | |   |   |   |   |            | |
|                  |  | /  \/    \/      \              | |   |   |   |   |   |   |    | |
|                  |  | Mon Tue Wed Thu Fri Sat Sun     | |  Likes Comments Shares     | |
|                  |  +---------------------------------+ +--------------------------+ |
|                  |                                                                   |
|                  |  +--------------------------------------------------------------+ |
|                  |  | Top Performing Content                                       | |
|                  |  | Title                  | Platform  | Views   | Eng. Rate     | |
|                  |  | FastAPI Full Tutorial  | YouTube   | 1,45,000| 7.8%          | |
|                  |  | React 19 Tips Reel     | Instagram | 92,400  | 8.2%          | |
|                  |  +--------------------------------------------------------------+ |
+------------------+-------------------------------------------------------------------+

+------------------+-------------------------------------------------------------------+
|  CreatorIQ       |  Connected Social Media Accounts                                  |
+------------------+-------------------------------------------------------------------+
|                  |                                                                   |
|   Overview       |  +---------------------------+   +-----------------------------+  |
|   Content        |  | YouTube                   |   | Instagram                   |  |
|   Audience       |  | Handle: @AadityaTech      |   | Handle: @aaditya.codes      |  |
|   Revenue        |  | Status: [● Connected]     |   | Status: [● Connected]       |  |
| > Integrations   |  | Last Sync: 10 mins ago    |   | Last Sync: 25 mins ago      |  |
|                  |  | [ Sync Now ]              |   | [ Sync Now ]                |  |
|                  |  +---------------------------+   +-----------------------------+  |
|                  |                                                                   |
|                  |  +---------------------------+   +-----------------------------+  |
|                  |  | LinkedIn                  |   | X (Twitter)                 |  |
|                  |  | Status: [Not Connected]   |   | Status: [Not Connected]     |  |
|                  |  | [ + Connect Account ]     |   | [ + Connect Account ]       |  |
|                  |  +---------------------------+   +-----------------------------+  |
+------------------+-------------------------------------------------------------------+