// ─── Design tokens (mirrored from DigitalLanding) ────────────────────────────
export const TEAL = '#00B8A0';
export const ORANGE = '#F5921E';
export const LIME = '#D4F565';

// ─── Product data ─────────────────────────────────────────────────────────────
export const DIGITAL_PRODUCTS = [
  {
    slug: 'voice-intake-concierge',
    category: 'Voice AI',
    industry: 'Voice AI / Franchise Operations',
    timeline: '14 Days to First Deployment',
    accentColor: TEAL,
    name: 'Voice Intake Concierge',
    heroDesc:
      'An always-on AI voice agent built for franchise and multi-location businesses. It picks up every call, qualifies every lead, and handles every intake workflow — across every location, at any hour, without adding a single person to your team.',
    sections: [
      {
        num: '01',
        tag: 'Challenge',
        heading:
          'Multi-location operators were losing customers every time a call went unanswered after hours.',
        body: 'Running locations across multiple time zones creates a coverage problem no hiring plan fully solves. Calls after 6pm go to voicemail. Weekend inquiries pile up unanswered. Busy periods overwhelm whoever is at the front desk. The business is entirely dependent on a person being present, alert, and available at the exact moment a customer reaches out. That dependency costs revenue every single day.',
      },
      {
        num: '02',
        tag: 'Approach',
        heading:
          'We built a voice AI that sounds human, works around the clock, and deploys across every location at once.',
        body: 'Voice Intake Concierge answers inbound calls the way a trained staff member would — it greets callers, asks the right questions, qualifies their needs, answers FAQs, handles basic intake, and routes complex situations appropriately. It layers on top of your existing phone system across every location simultaneously. No ripping out infrastructure, no retraining staff, no downtime during rollout.',
      },
      {
        num: '03',
        tag: 'Result',
        heading:
          'Zero missed calls. Every lead captured. No new headcount across any location.',
        body: 'Operators roll out coverage to new locations and new inquiry types without touching their phone team size. The calls that previously went to voicemail now have outcomes. The leads that used to disappear overnight now convert.',
      },
      {
        num: '04',
        tag: 'Takeaway',
        heading:
          'The businesses that scale are the ones that stop tying revenue to human availability.',
        body: 'Coverage is not a staffing problem. It is an infrastructure problem. Once you solve it with infrastructure, it stays solved — regardless of how many locations you open next.',
      },
    ],
  },

  {
    slug: 'ai-native-lms',
    category: 'Education AI',
    industry: 'Education AI / Adaptive Learning',
    timeline: '14 Days to First Cohort Live',
    accentColor: LIME,
    name: 'AI-Native LMS',
    heroDesc:
      'A learning and onboarding platform built from the ground up on AI — not a traditional LMS with AI features bolted on. Every learner gets a personalised path, adaptive pacing, and intelligent reinforcement built into the experience by default.',
    sections: [
      {
        num: '01',
        tag: 'Challenge',
        heading:
          'Traditional learning platforms were built for the person uploading content, not the person trying to learn.',
        body: 'Off-the-shelf LMS platforms are dense, rigid, and designed around content management workflows. They give administrators great dashboards and give learners a static, one-size-fits-all experience. There is no adaptation to individual pace. No logic that adjusts when someone is struggling. No reinforcement that responds to how a specific learner actually retains information. The result is high drop-off rates and low completion.',
      },
      {
        num: '02',
        tag: 'Approach',
        heading:
          'We built an intelligence layer that adjusts to each learner automatically — pace, content, sequencing, and reinforcement.',
        body: 'AI-Native LMS is built around one principle: the platform adapts to the learner, not the other way around. Personalised learning paths, content sequencing based on demonstrated progress, and AI-driven reinforcement loops are part of the core architecture — not optional add-ons. Every learner moves through a different version of the same programme based on how they are actually performing.',
      },
      {
        num: '03',
        tag: 'Result',
        heading: 'Completion rates that consistently outperform what static platforms deliver.',
        body: 'Learners who disengaged from rigid course formats complete personalised adaptive pathways at rates the market has not seen from standard off-the-shelf solutions. The difference is not motivation. It is the experience adapting to meet them.',
      },
      {
        num: '04',
        tag: 'Takeaway',
        heading:
          'A platform that does not adapt to the learner is a content library, not a learning system.',
        body: 'Intelligence is not a feature you add to learning infrastructure. It is the foundation the infrastructure has to be built on from day one.',
      },
    ],
  },

  {
    slug: 'legal-recovery-ai',
    category: 'Legal Tech',
    industry: 'Legal Tech / Debt Recovery Automation',
    timeline: '14 Days to First Automated Recovery',
    accentColor: TEAL,
    name: 'Legal Recovery AI',
    heroDesc:
      'An AI platform that automates legal process workflows and debt recovery operations in a single system. It negotiates with debtors, manages documentation, tracks compliance requirements, and drives recovery outcomes — without requiring a human agent on every interaction.',
    sections: [
      {
        num: '01',
        tag: 'Challenge',
        heading:
          'Legal and recovery teams were burning capacity on high-volume, repeatable work that required neither legal expertise nor negotiation skill.',
        body: 'Practices sitting at the intersection of legal process management and debt recovery share the same structural problem: enormous volumes of routine work that consume human capacity without requiring human judgment. Debt negotiation calls follow predictable scripts. Legal documents follow standard templates. Every single interaction still requires a person — and at scale, the cost becomes unsustainable and the consistency suffers.',
      },
      {
        num: '02',
        tag: 'Approach',
        heading:
          'We built an AI agent that negotiates, documents, and resolves cases end-to-end without a human on every call.',
        body: 'Legal Recovery AI handles the complete debt negotiation workflow autonomously. The agent contacts debtors, presents repayment terms, handles objections, works toward agreed outcomes, and creates a compliant record of every interaction automatically. Legal workflows — document generation, deadline tracking, filing sequences — run through the same platform. Human involvement is reserved for escalations and final approvals.',
      },
      {
        num: '03',
        tag: 'Result',
        heading:
          'More consistent recovery outcomes than teams running purely human-driven interactions.',
        body: 'Recovery rates improve not because more contacts are made, but because every contact is executed correctly — same framework, every time, regardless of volume.',
      },
      {
        num: '04',
        tag: 'Takeaway',
        heading:
          'Consistency in execution outperforms experience in execution when the volume is high enough.',
        body: 'The AI never deviates from the framework, never makes unauthorised concessions, and never has a bad interaction day. At scale, that consistency is the edge.',
      },
    ],
  },

  {
    slug: 'facility-operations-ai',
    category: 'Field Operations',
    industry: 'Field Operations / Facility Management',
    timeline: '14 Days to First Field Deployment',
    accentColor: ORANGE,
    name: 'Facility Operations AI',
    heroDesc:
      'An AI intelligence layer built for facility management and field service operators. It gives every field technician instant, conversational access to full property history, service records, and operational context on any device — so they arrive informed and equipped, not guessing.',
    sections: [
      {
        num: '01',
        tag: 'Challenge',
        heading:
          'Field teams were showing up to jobs without the information they needed to perform them well.',
        body: 'Most facility management and field service businesses run on a patchwork of CRMs, spreadsheets, and service logs that were never designed to be accessed in the field. A technician arriving on site has no practical way to pull up what was last done at that property, when, or what the client\'s specific requirements are. The information exists somewhere in the system. The problem is that it is not accessible in real time, in the field, when it is actually needed.',
      },
      {
        num: '02',
        tag: 'Approach',
        heading:
          'We built an AI layer that surfaces the full property and service history the moment a technician needs it — on any device.',
        body: 'Facility Operations AI connects to the operator\'s existing CRM and service records and makes that data conversationally accessible. A technician on site calls the AI agent and asks what was last done at this address, when, and what the client\'s notes say — and gets an immediate, accurate answer. The same layer handles inbound client queries, booking requests, and service scheduling without routing everything through a human dispatcher.',
      },
      {
        num: '03',
        tag: 'Result',
        heading:
          'Technicians arrive informed on every job. Dispatcher call volume drops from the first month.',
        body: 'Field agents resolve queries directly through the AI layer rather than calling the office. Client satisfaction improves as response times shorten and service consistency increases across locations. Dispatchers handle fewer interruptions and focus on exceptions.',
      },
      {
        num: '04',
        tag: 'Takeaway',
        heading:
          'Field operations do not fail because of poor technicians. They fail because good technicians do not have the right information at the right time.',
        body: 'The data is almost always there. The barrier is making it accessible in real time to the person who needs it — not the person sitting behind a desk.',
      },
    ],
  },

  {
    slug: 'contact-center-intelligence',
    category: 'Call Centre AI',
    industry: 'Call Centre AI / Contact Operations',
    timeline: '14 Days to First Live Deployment',
    accentColor: TEAL,
    name: 'Contact Center Intelligence',
    heroDesc:
      'An AI layer deployed inside live call centre operations. The moment a call connects, full caller context surfaces on the agent\'s screen — account history, previous interactions, open issues — so agents skip the opening minute and start with the conversation that actually matters.',
    sections: [
      {
        num: '01',
        tag: 'Challenge',
        heading:
          'Agents were spending the first ninety seconds of every call doing something that had nothing to do with helping the customer.',
        body: 'Every call centre interaction opens the same way: find the account, pull the history, confirm identity. None of that serves the caller. All of it frustrates them and reduces the number of calls an agent can handle each hour. The data is in the CRM. The problem is that nobody built the layer to surface it automatically at the exact moment a call connects.',
      },
      {
        num: '02',
        tag: 'Approach',
        heading:
          'We built an AI layer that puts the full caller context in front of the agent before the first word is spoken.',
        body: 'Contact Center Intelligence integrates directly into existing telephony and CRM infrastructure. The moment a call connects, the system automatically retrieves the caller\'s complete account history, prior interactions, unresolved issues, and relevant notes — and surfaces everything on the agent\'s screen in real time. We also built a centralised transcript dashboard so supervisors can review interactions, monitor quality, and spot coaching opportunities without listening to recordings one by one.',
      },
      {
        num: '03',
        tag: 'Result',
        heading:
          'Average handle time drops in the first week. Agent and caller satisfaction both improve.',
        body: 'Agents report less frustration at the start of each call. Callers reach resolution faster. Supervisors gain operational visibility that previously required manual call monitoring — with a fraction of the effort.',
      },
      {
        num: '04',
        tag: 'Takeaway',
        heading:
          'The most expensive part of a call centre interaction is the part that adds no value to the person calling.',
        body: 'The opening minute is not a customer service problem. It is a data accessibility problem. Solve the data problem and the service problem largely solves itself.',
      },
    ],
  },

  {
    slug: 'horizontal-ai-agents',
    category: 'Cross-Industry AI Agents',
    industry: 'Any company / Workflow Automation',
    timeline: 'Live in Under 14 Days',
    accentColor: LIME,
    isFeatured: true,
    name: 'Horizontal AI Agents',
    heroDesc:
      'A coordinated system of AI agents deployed across your business. Pre-built agent roles adapted to your workflows and orchestrated as one unified system — live in days, not months. Six specialised agents sharing one context window, so your business runs as a single intelligent operation instead of six disconnected tools.',
    sections: [
      {
        num: '01',
        tag: 'Challenge',
        heading: 'Every team runs separate tools. No system shares context. Every workflow still requires a person in the middle.',
        body: 'Sales reps open five tabs before they can have one informed conversation. Marketing teams make decisions off stale data because the live numbers are buried in dashboards no one checks. Operations managers spend Monday mornings manually pulling reports from systems that should talk to each other automatically. The tools exist across the business. The intelligence between them does not.',
      },
      {
        num: '02',
        tag: 'Approach',
        heading: 'We deploy six coordinated agents that share one context window — so every part of your business knows what every other part knows.',
        body: 'The agents do not operate in silos. They share a unified context window, which means a prospect who engages on LinkedIn and then responds to an outbound email is recognised as the same person, with full history, across every touchpoint. That shared awareness is what turns a set of automations into a genuine revenue and operations system.',
      },
      {
        num: '03',
        tag: 'Result',
        heading: 'Sales teams reclaim 60% of admin time. Marketing runs on live data. Operations gains visibility without adding overhead.',
        body: 'The system compounds over time. Every interaction builds domain-specific intelligence that makes the next interaction more effective. The version of the system running in month six materially outperforms the version you deployed in month one — without anyone adjusting it manually.',
      },
      {
        num: '04',
        tag: 'Takeaway',
        heading: 'A campaign ends when the budget runs out. Infrastructure compounds.',
        body: 'This is a production-grade AI system that integrates directly into your existing tools — your CRM, your inbox, your calendar. It does not sit alongside your stack as another tool to manage. It runs inside it and makes everything already there work better.',
      },
    ],
    agents: [
      {
        num: '001',
        name: 'Sales Intelligence Agent',
        desc: 'Handles prospect research, lead enrichment, pipeline summaries, and customer history retrieval on demand. Your sales team stops spending hours preparing for calls and starts spending that time having them.',
        output: 'Sales reps reclaim 60% of their admin time.',
      },
      {
        num: '002',
        name: 'Marketing Intelligence Agent',
        desc: 'Tracks audience behaviour, competitor movement, and campaign performance continuously. Surfaces actionable insights and growth opportunities without requiring a dedicated analyst on the team.',
        output: 'Marketing decisions backed by live data, not gut feel.',
      },
      {
        num: '003',
        name: 'Operations Agent',
        desc: 'Monitors operational performance across the business, identifies inefficiencies before they compound, and produces structured reports automatically. No more manually pulling numbers from five different systems every Monday morning.',
        output: 'Operations visibility without operations overhead.',
      },
      {
        num: '004',
        name: 'AI Collections & Dunning Agent',
        desc: 'Automates payment reminders, escalation sequences, negotiation flows, and payment plan offers — all in sync with your billing systems and without requiring a collections specialist on every account.',
        output: 'Recovery rates improve with every cycle.',
      },
      {
        num: '005',
        name: 'AI Vendor Management Agent',
        desc: 'Manages vendor onboarding, tracks SLA performance, flags cost variances, compares supplier metrics, and handles contract renewal timelines with built-in compliance checks throughout.',
        output: 'Vendor risk reduced without adding headcount.',
      },
      {
        num: '006',
        name: 'The Jarvis Layer',
        desc: 'The coordination layer that sits above every other agent. It maintains full awareness of what each agent knows and what each department is doing — so you can ask one question and get an answer that draws from the entire business.',
        output: 'Full organisational intelligence, accessible in a single conversation.',
        isSpecial: true,
      },
    ],
    differentiators: [
      { label: 'No SDR Required', desc: 'The agents handle everything a human SDR does — prospect research, outreach sequencing, follow-up — 24 hours a day, at a fraction of the cost.' },
      { label: 'Cross-Channel by Default', desc: 'Outbound, LinkedIn, community, content, and SEO/AEO agents share one context window and coordinate automatically. No manual handoffs between tools.' },
      { label: 'Live in Under 14 Days', desc: 'First agents deployed within two weeks of engagement start. First measurable results visible within 30 days.' },
      { label: 'Gets Smarter Every Month', desc: 'Every interaction adds domain-specific intelligence to the system. The version running in month six outperforms month one automatically, with no manual retraining.' },
    ],
  },

  {
    slug: 'caflow-practice-management',
    category: 'Practice Management',
    industry: 'Accounting & Bookkeeping Firms / CPA Practices / Fintech',
    timeline: '30 Days to First Paying Firm',
    accentColor: ORANGE,
    name: 'CaFlow',
    heroDesc:
      'An end-to-end practice management platform for accounting firms in the US and UAE. CaFlow replaces TaxDome, Dext, and Karbon with one platform — automating document collection over email and WhatsApp, tracking every compliance deadline, and pushing structured data directly into QuickBooks, Xero, and Zoho Books.',
    sections: [
      {
        num: '01',
        tag: 'The Problem',
        heading:
          'US and UAE accounting firms are paying for four tools to do one job — and none of them talk to each other.',
        body: 'A mid-size CPA firm in the US runs TaxDome for client workflows at $800 per user annually, Dext for receipt capture at $37.50 per month, SmartVault or Box for document storage at $45 per user, and QuickBooks Online for the actual accounting. In the UAE, the same firm runs Zoho Books or TallyPrime for VAT and corporate tax compliance, a separate document folder in Google Drive, WhatsApp threads to chase clients for invoices, and a manual calendar to track FTA filing deadlines. Neither firm has a single place where client documents arrive, get classified, and flow into their accounting software without someone copying and pasting. The tools exist. The integration does not. Every workflow gap costs hours that partners and staff cannot bill for.',
      },
      {
        num: '02',
        tag: 'Specific Pains',
        heading:
          'The pains are not abstract. They happen every single week inside every firm.',
        body: 'In the US: TaxDome charges $800 per user upfront annually — firms commit before knowing if the tool fits. Karbon costs $59 to $99 per user per month and still requires Dext separately for document capture. Document requests go out via a client portal that clients consistently ignore, log into once, and never open again. Tax season becomes a scramble because document collection was never systematised before deadline pressure arrived. In the UAE: Corporate tax was introduced in 2023 at 9% — most SMEs and their accountants are still building compliant workflows from scratch. Clients send purchase invoices on WhatsApp because that is how business is done in the Gulf. Zoho Books and TallyPrime handle the accounting but neither collects documents, chases clients, or tracks which filings are pending across a portfolio. FTA requires 5 years of document retention — most firms store these in disconnected Google Drive folders with no systematic naming or retrieval.',
      },
      {
        num: '03',
        tag: 'Approach',
        heading:
          'CaFlow replaces the entire fragmented stack with one platform built around how accounting firms actually operate.',
        body: 'US firms get automated document collection via structured email sequences — no client portal login required, no app to download. Clients receive clear requests, reply with attachments, and documents land in a structured inbox tagged by client and filing type. The compliance calendar tracks every federal and state deadline across every client simultaneously — quarterly estimates, annual returns, payroll filings — surfacing exactly what is due in the next 7 and 30 days. Extracted data pushes directly into QuickBooks Online or Xero with one click. UAE firms get the same workflow over WhatsApp. VAT return cycles, corporate tax filings, and FTA document retention requirements are built into the compliance calendar natively. Documents flow into Zoho Books or TallyPrime automatically with a 5-year retention policy and an audit-ready trail. Both markets get one monthly price — no annual commitment, no per-user penalty for growing headcount, no integration setup fee.',
      },
      {
        num: '04',
        tag: 'Result',
        heading:
          'Firms replaced three tools with one, cut document collection time in half, and grew their client base without adding staff.',
        body: 'A US CPA firm managing 100 clients previously ran TaxDome, Dext, and SmartVault simultaneously — paying over $150 per user per month across the stack and still manually moving data between them. With CaFlow, the entire document-to-filing workflow runs inside one platform at a fraction of the combined cost. Tax season no longer begins with a scramble — documents arrive on a schedule because reminders are consistent, automatic, and impossible to ignore. A UAE accounting firm serving 60 SME clients manages VAT and CT filings for every client from a single dashboard, with WhatsApp document collection running in the background and FTA-compliant records stored automatically. Neither firm hired an additional team member to handle the volume increase.',
      },
      {
        num: '05',
        tag: 'Takeaway',
        heading:
          'The accounting firms winning in the US and UAE are not buying more tools. They are replacing fragmented stacks with one system that works end to end.',
        body: 'TaxDome is powerful but expensive and disconnected from document capture. Karbon is excellent for workflow but requires Dext on top. Dext captures documents but does nothing with practice management. Zoho Books and TallyPrime handle compliance accounting in the UAE but leave document collection and client communication entirely unaddressed. CaFlow closes every gap in one platform — document collection over email and WhatsApp, compliance deadline tracking, AI-assisted document classification, and direct push to the accounting software already in use. No ripping out existing tools. No annual lock-in. No integration consulting fee.',
      },
    ],
  },
];

export function getProductBySlug(slug) {
  return DIGITAL_PRODUCTS.find((p) => p.slug === slug) || null;
}
