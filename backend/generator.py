import random
import re
from models import StartupBlueprint

# ─────────────────────────────────────────────
# Keyword → domain mapping
# ─────────────────────────────────────────────

DOMAIN_MAP = {
    "health": ["health", "medical", "fitness", "wellness", "doctor", "patient", "clinic", "hospital", "diet", "nutrition", "mental"],
    "finance": ["finance", "money", "payment", "bank", "invest", "crypto", "wallet", "budget", "loan", "insurance", "tax"],
    "education": ["learn", "education", "school", "tutor", "course", "study", "student", "teacher", "training", "skill", "quiz"],
    "ecommerce": ["shop", "store", "sell", "buy", "market", "product", "delivery", "order", "cart", "retail", "commerce"],
    "productivity": ["task", "todo", "productivity", "project", "manage", "team", "work", "collaborate", "organize", "schedule", "calendar"],
    "social": ["social", "community", "connect", "friend", "network", "share", "chat", "message", "forum", "feed"],
    "travel": ["travel", "trip", "hotel", "flight", "book", "vacation", "tour", "explore", "destination", "itinerary"],
    "food": ["food", "recipe", "cook", "meal", "restaurant", "delivery", "nutrition", "diet", "ingredient", "kitchen"],
    "real_estate": ["property", "real estate", "rent", "buy home", "apartment", "house", "listing", "tenant", "landlord"],
    "hr": ["hr", "hire", "recruit", "employee", "talent", "job", "resume", "onboard", "people", "workforce"],
    "analytics": ["data", "analytics", "insight", "dashboard", "report", "metric", "track", "kpi", "monitor", "business intelligence"],
    "security": ["security", "privacy", "encrypt", "protect", "cyber", "fraud", "auth", "identity", "access"],
    "ai": ["ai", "artificial intelligence", "machine learning", "automation", "bot", "nlp", "predict", "model", "gpt"],
    "environment": ["sustainability", "green", "eco", "carbon", "environment", "climate", "recycle", "energy"],
    "logistics": ["logistics", "supply chain", "warehouse", "shipping", "inventory", "track", "freight", "fleet"],
}

DOMAIN_TEMPLATES = {
    "health": {
        "adjectives": ["Intelligent", "Personalized", "Precision", "Proactive", "Holistic"],
        "nouns": ["Health", "Wellness", "Care", "Vitals", "Pulse"],
        "problem_template": "Millions of people struggle to manage their {domain} proactively. Reactive care is expensive, fragmented, and ineffective.",
        "solution_template": "An AI-powered {domain} platform that delivers personalized insights, early warnings, and actionable guidance — right when users need it.",
        "features": [
            "Personalized health dashboard with real-time metrics",
            "AI symptom checker and early warning system",
            "Smart medication reminders and tracking",
            "Integration with wearables (Apple Watch, Fitbit)",
            "Telehealth appointment booking",
            "Progress tracking with trend analytics",
            "Community support groups",
            "Export health reports for your doctor",
        ],
        "users": ["Chronic disease patients", "Health-conscious professionals", "Elderly users and caregivers", "Athletes and fitness enthusiasts", "Insurance providers"],
        "use_cases": [
            "A diabetic patient tracks glucose levels and receives dietary suggestions",
            "A caregiver monitors an elderly parent's vitals remotely",
            "An athlete optimizes recovery based on sleep and activity data",
        ],
        "stack": {"frontend": "React + Tailwind", "backend": "FastAPI + PostgreSQL", "mobile": "React Native", "infra": "AWS ECS + RDS"},
    },
    "finance": {
        "adjectives": ["Smart", "Automated", "Instant", "Secure", "Intelligent"],
        "nouns": ["Finance", "Capital", "Funds", "Wealth", "Pay"],
        "problem_template": "Managing personal and business finances is complex, opaque, and time-consuming. Most tools are either too simple or too complicated.",
        "solution_template": "An AI-first {domain} platform that automates tracking, forecasting, and decisions — making financial clarity effortless.",
        "features": [
            "Automated income and expense categorization",
            "AI-powered cash flow forecasting",
            "Investment portfolio tracking and rebalancing alerts",
            "Bill payment automation and scheduling",
            "Tax optimization suggestions",
            "Fraud detection and spending anomaly alerts",
            "Multi-currency support",
            "Customizable budget rules and goals",
        ],
        "users": ["Freelancers and solopreneurs", "Small business owners", "Young professionals building wealth", "Accountants and financial advisors", "CFOs at growing startups"],
        "use_cases": [
            "A freelancer automatically tracks project income and quarterly tax estimates",
            "A startup CFO forecasts burn rate and runway in real-time",
            "A family manages shared budgets and savings goals",
        ],
        "stack": {"frontend": "Next.js + Tailwind", "backend": "FastAPI + PostgreSQL", "auth": "Auth0", "infra": "GCP Cloud Run"},
    },
    "education": {
        "adjectives": ["Adaptive", "Personalized", "AI-Powered", "Smart", "Next-Gen"],
        "nouns": ["Learn", "Academy", "Skill", "Tutor", "Campus"],
        "problem_template": "Traditional education is one-size-fits-all. Students lose interest, fall behind, and never reach their potential because content doesn't adapt to them.",
        "solution_template": "An adaptive {domain} platform that personalizes the learning journey using AI — adjusting pace, format, and content to each learner.",
        "features": [
            "Adaptive learning paths based on skill gaps",
            "AI tutor for instant doubt resolution",
            "Gamified progress and streak rewards",
            "Video lessons + interactive coding/quizzes",
            "Peer collaboration and study rooms",
            "Spaced repetition flashcard system",
            "Certificate generation and LinkedIn sharing",
            "Parent/teacher progress dashboard",
        ],
        "users": ["K-12 students", "College students", "Working professionals upskilling", "Bootcamp learners", "Corporate L&D teams"],
        "use_cases": [
            "A student struggling in math gets AI-adjusted practice problems",
            "A professional learns a new programming language in evenings at their own pace",
            "A company trains 500 employees on a new compliance framework",
        ],
        "stack": {"frontend": "React + Vite", "backend": "Django + PostgreSQL", "video": "Cloudflare Stream", "infra": "Vercel + Railway"},
    },
    "productivity": {
        "adjectives": ["Unified", "Intelligent", "Async-First", "AI-Native", "Seamless"],
        "nouns": ["Flow", "Forge", "Ops", "Hub", "Work"],
        "problem_template": "Teams waste hours switching between disconnected tools, drowning in meetings, and losing context. Productivity is broken at the systems level.",
        "solution_template": "A unified {domain} workspace that uses AI to cut context-switching, automate routine work, and keep teams in a state of deep flow.",
        "features": [
            "Unified inbox for tasks, messages, and docs",
            "AI meeting summarizer and action extractor",
            "Smart task prioritization engine",
            "Automated status updates to stakeholders",
            "Deep work mode with focus timer",
            "Cross-tool integrations (Slack, Notion, Jira)",
            "Weekly AI-generated productivity insights",
            "Team workload balancing dashboard",
        ],
        "users": ["Remote-first engineering teams", "Product managers", "Agency project leads", "Founders and solopreneurs", "Operations managers"],
        "use_cases": [
            "A PM gets AI-extracted action items from every standup",
            "A remote team syncs async without scheduling meetings",
            "A founder gets a weekly clarity digest on top priorities",
        ],
        "stack": {"frontend": "React + Tailwind", "backend": "FastAPI + PostgreSQL", "realtime": "Supabase Realtime", "infra": "Railway + Vercel"},
    },
    "ecommerce": {
        "adjectives": ["Hyper-Personalized", "Intelligent", "Conversion-First", "Social", "AI-Driven"],
        "nouns": ["Shop", "Market", "Commerce", "Store", "Cart"],
        "problem_template": "Online stores are losing revenue to poor personalization, cart abandonment, and slow operations. Shoppers want curated experiences, not generic catalogs.",
        "solution_template": "An AI-powered {domain} engine that personalizes discovery, automates operations, and maximizes conversion at every touchpoint.",
        "features": [
            "AI product recommendation engine",
            "Dynamic pricing based on demand signals",
            "Smart cart recovery with personalized offers",
            "Visual search — upload a photo to find products",
            "Real-time inventory and supplier sync",
            "Loyalty and rewards program engine",
            "One-click checkout with saved preferences",
            "Analytics dashboard for GMV, LTV, and churn",
        ],
        "users": ["D2C brand owners", "Marketplace sellers", "Fashion and lifestyle brands", "Dropshipping operators", "B2B wholesale buyers"],
        "use_cases": [
            "A fashion brand increases AOV 30% through AI-styled outfit bundles",
            "A dropshipper automates supplier sync and order fulfillment",
            "A B2B buyer places bulk orders with tiered pricing automation",
        ],
        "stack": {"frontend": "Next.js + Tailwind", "backend": "Node.js + PostgreSQL", "payments": "Stripe", "infra": "Vercel + PlanetScale"},
    },
    "social": {
        "adjectives": ["Interest-Based", "Niche", "Authentic", "Real-Time", "Creator-First"],
        "nouns": ["Connect", "Circle", "Commons", "Tribe", "Hub"],
        "problem_template": "Mainstream social platforms are noisy, algorithmically manipulated, and hostile to genuine community. People crave meaningful connections around shared interests.",
        "solution_template": "A niche {domain} platform that builds authentic communities around interests — with tools for creators, moderators, and members.",
        "features": [
            "Interest-based community spaces",
            "Long-form post and thread discussions",
            "Creator monetization tools (subscriptions, tips)",
            "Event hosting and live sessions",
            "Cross-community discovery engine",
            "AI-powered content moderation",
            "Private circles and invite-only rooms",
            "Mobile-first real-time notifications",
        ],
        "users": ["Niche hobbyists and enthusiasts", "Indie creators and writers", "Professional networks", "Local community organizers", "Online course cohorts"],
        "use_cases": [
            "A woodworker community shares projects and gets expert feedback",
            "A creator monetizes a premium newsletter community",
            "A local neighborhood organizes events and discussions",
        ],
        "stack": {"frontend": "React + Tailwind", "backend": "FastAPI + PostgreSQL", "realtime": "Pusher", "infra": "Render + Cloudflare"},
    },
    "default": {
        "adjectives": ["Intelligent", "AI-Powered", "Next-Gen", "Smart", "Unified"],
        "nouns": ["AI", "Labs", "Studio", "Hub", "OS"],
        "problem_template": "The existing solutions for {domain} are outdated, fragmented, or too complex for modern users. There's a clear gap between what people need and what's available.",
        "solution_template": "A modern, AI-first platform that solves {domain} with intelligent automation, beautiful UX, and a workflow built for how people actually work today.",
        "features": [
            "Intelligent onboarding that adapts to user goals",
            "AI-powered recommendations and insights engine",
            "Real-time collaboration and team workspaces",
            "Automated reporting and digest summaries",
            "Integrations with your existing tools",
            "Role-based access and permissions",
            "Mobile-first responsive design",
            "Analytics dashboard with actionable KPIs",
        ],
        "users": ["Early adopters and tech-forward professionals", "Small to mid-size teams", "Founders and operators", "Freelancers and consultants", "Enterprise power users"],
        "use_cases": [
            "A team automates their most repetitive workflows in minutes",
            "A founder gets instant clarity on their key metrics",
            "A freelancer delivers better work faster with AI assistance",
        ],
        "stack": {"frontend": "React + Tailwind", "backend": "FastAPI + PostgreSQL", "auth": "Clerk", "infra": "Render + Vercel"},
    },
}

UI_FLOWS = [
    [
        "1. Landing page — hero CTA + value proposition",
        "2. Onboarding wizard — 3-step setup (goal, profile, preferences)",
        "3. Main dashboard — overview cards + quick actions",
        "4. Core feature page — primary workflow interface",
        "5. Detail/drill-down view — item-level data and actions",
        "6. Settings page — account, notifications, integrations",
        "7. Mobile-optimized bottom nav for key flows",
    ],
    [
        "1. Splash screen with animated logo + tagline",
        "2. Sign-up / sign-in modal with social auth",
        "3. Personalization quiz — 4 questions to tailor experience",
        "4. Home feed — AI-curated content and recommendations",
        "5. Create/action modal — primary value action",
        "6. Profile and history page",
        "7. Notification center and activity log",
    ],
    [
        "1. Marketing landing page with demo video embed",
        "2. Pricing page with tiered plans",
        "3. App shell with collapsible sidebar navigation",
        "4. List view — browse and filter all items",
        "5. Create/edit form — guided multi-step input",
        "6. Results/output view — formatted card layout",
        "7. Export and share options",
    ],
]

BACKEND_ARCHITECTURES = [
    "Monolithic FastAPI service with modular routers, PostgreSQL via SQLAlchemy ORM, Redis for caching hot data, Celery + Redis for background jobs, and S3-compatible storage for file uploads. All deployed as Docker containers behind an Nginx reverse proxy.",
    "Microservices architecture: API Gateway (FastAPI) → Auth Service → Core Domain Service → Notification Service → Analytics Service. Each service has its own PostgreSQL schema. Inter-service communication via async message queue (RabbitMQ). Deployed on Kubernetes.",
    "Serverless-first architecture: Vercel edge functions for API routes, Supabase for PostgreSQL + Auth + Realtime, Cloudflare Workers for edge caching, and S3 for static assets. Zero-ops deployment with automatic scaling.",
    "Event-driven FastAPI backend: REST API layer → Domain event bus → Worker processes. PostgreSQL as primary store, Redis for session/cache, Kafka for high-throughput event streaming. Horizontally scalable on GCP Cloud Run.",
]

DEPLOYMENT_SUGGESTIONS = [
    "Deploy backend on Render (free tier available), frontend on Vercel. Use Render's managed PostgreSQL for production. Add a custom domain via Cloudflare for SSL and CDN.",
    "Containerize with Docker Compose for local dev. Push to GitHub, enable CI/CD via GitHub Actions. Deploy to Railway (backend + DB) and Vercel (frontend) with zero-downtime deploys.",
    "Use Fly.io for the backend (auto-scaling, global regions). Netlify for frontend with edge caching. Supabase for managed PostgreSQL. Total infra cost: ~$0-20/month at early stage.",
    "Single VPS setup on Hetzner/DigitalOcean (~$6/month). Docker Compose for all services. Caddy as reverse proxy with automatic HTTPS. GitHub Actions for CI/CD with SSH deploy.",
]


def detect_domain(idea: str) -> str:
    idea_lower = idea.lower()
    scores = {}
    for domain, keywords in DOMAIN_MAP.items():
        score = sum(1 for kw in keywords if kw in idea_lower)
        if score > 0:
            scores[domain] = score
    if not scores:
        return "default"
    return max(scores, key=scores.get)


def generate_name(idea: str, template: dict) -> str:
    words = re.findall(r'\b[A-Za-z]{4,}\b', idea)
    core_word = random.choice(words).capitalize() if words else "Launch"
    adj = random.choice(template["adjectives"])
    noun = random.choice(template["nouns"])
    patterns = [
        f"{core_word}{noun}",
        f"{adj} {core_word}",
        f"{core_word} {noun}",
        f"{adj}{noun}",
    ]
    return random.choice(patterns)


def generate_blueprint(idea: str, industry: str = None, target_audience: str = None) -> StartupBlueprint:
    domain = industry if industry and industry in DOMAIN_TEMPLATES else detect_domain(idea)
    template = DOMAIN_TEMPLATES.get(domain, DOMAIN_TEMPLATES["default"])

    name = generate_name(idea, template)
    domain_label = domain.replace("_", " ")

    problem = template["problem_template"].format(domain=domain_label)
    solution = template["solution_template"].format(domain=domain_label)

    features = random.sample(template["features"], min(6, len(template["features"])))

    users = template["users"]
    if target_audience:
        users = [target_audience] + users[:3]

    use_cases = template["use_cases"]
    ui_flow = random.choice(UI_FLOWS)
    backend_arch = random.choice(BACKEND_ARCHITECTURES)
    deployment = random.choice(DEPLOYMENT_SUGGESTIONS)

    stack = template["stack"]

    sample_endpoints = [
        {"method": "POST", "path": "/auth/register", "description": "Register a new user account"},
        {"method": "POST", "path": "/auth/login", "description": "Authenticate and return JWT token"},
        {"method": "GET", "path": f"/api/{domain_label.replace(' ','_')}", "description": f"List all {domain_label} items for the user"},
        {"method": "POST", "path": f"/api/{domain_label.replace(' ','_')}", "description": f"Create a new {domain_label} entry"},
        {"method": "GET", "path": f"/api/{domain_label.replace(' ','_')}/{{id}}", "description": "Get a specific item by ID"},
        {"method": "PUT", "path": f"/api/{domain_label.replace(' ','_')}/{{id}}", "description": "Update an existing item"},
        {"method": "DELETE", "path": f"/api/{domain_label.replace(' ','_')}/{{id}}", "description": "Delete an item"},
        {"method": "GET", "path": "/api/analytics/summary", "description": "Return aggregated analytics for the user's account"},
    ]

    elevator_pitch = f"{name} helps {users[0].lower()} {solution.split('.')[0].lower().replace('an ai-first', '').replace('an ai-powered', '').replace('a modern, ai-first', '').strip()} — so they can focus on what actually matters."

    return StartupBlueprint(
        startup_name=name,
        elevator_pitch=elevator_pitch,
        problem=problem,
        solution=solution,
        core_features=features,
        target_users=users,
        use_cases=use_cases,
        ui_ux_flow=ui_flow,
        backend_architecture=backend_arch,
        sample_api_endpoints=sample_endpoints,
        tech_stack=stack,
        deployment_suggestion=deployment,
    )
