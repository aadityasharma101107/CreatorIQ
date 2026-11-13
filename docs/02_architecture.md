# System Architecture 

flowchart TB
    subgraph Clients["1. Client Layer (Frontend)"]
        UI["React.js + Tailwind CSS + Recharts<br/>(Creator, Agency, Marketing, Admin Views)"]
    end

    subgraph Security["2. API Gateway & Auth"]
        API["FastAPI Backend (REST API)"]
        AUTH["JWT & OAuth2 RBAC Middleware"]
    end

    subgraph External["3. Social Media Data Sources"]
        YT["YouTube Data API"]
        IG["Instagram Graph API"]
        TT["TikTok / X / LinkedIn / Facebook APIs"]
    end

    subgraph Processing["4. Analytics & Background Workers"]
        ENG["Content & Audience Analytics Engine"]
        REV["Revenue & Trend Forecasting Engine"]
        CEL["Celery Scheduled Sync Workers"]
    end

    subgraph Storage["5. Data Storage Layer"]
        PG[("PostgreSQL<br/>(Users, Accounts, Metrics, Revenue)")]
        MG[("MongoDB<br/>(Raw API Payloads & Logs)")]
        RD[("Redis<br/>(Dashboard KPI Cache & Broker)")]
    end

    UI <-->|Axios JSON + Bearer Token| API
    API <--> AUTH
    API <--> ENG
    API <--> REV
    CEL <--> External
    CEL --> PG
    CEL --> MG
    ENG <--> PG
    REV <--> PG
    API <--> RD