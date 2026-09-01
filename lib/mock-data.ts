export type KnowledgeItem = {
  id: string; title: string; source: "YouTube" | "Instagram"; date: string; tag: string;
  summary: string; thumbnail: string; status?: "processing"; progress?: number;
  url: string; takeaways: string[]; concepts: string[]; insights: string[];
};

export const knowledgeItems: KnowledgeItem[] = [
  { id: "watchmaking", title: "Why Is Watchmaking So Difficult?", source: "YouTube", date: "Today", tag: "Craft", thumbnail: "from-amber-100 to-orange-50", summary: "A close look at the microscopic precision, patient assembly, and accumulated expertise behind mechanical watches.", url: "https://youtube.com", takeaways: ["Precision comes from many small, repeatable decisions.", "Mechanical movements are engineered to manage friction and energy."], concepts: ["Escapement", "Tolerance", "Power reserve"], insights: ["Complex work becomes approachable when each system has a clear purpose."] },
  { id: "naval-wealth", title: "How Naval Thinks About Wealth", source: "Instagram", date: "Yesterday", tag: "Career", thumbnail: "from-sky-100 to-blue-50", summary: "Wealth is created by owning scalable assets, developing specific knowledge, and playing long-term games.", url: "https://instagram.com", takeaways: ["Specific knowledge is difficult to train for and hard to replace.", "Leverage lets your judgment travel further."], concepts: ["Leverage", "Specific knowledge", "Accountability"], insights: ["Choose work that compounds your skills and reputation over time."] },
  { id: "docker", title: "Understanding Docker Containers", source: "YouTube", date: "Aug 28", tag: "Technology", thumbnail: "from-cyan-100 to-teal-50", summary: "Containers package an application and its dependencies into a predictable, isolated environment.", url: "https://youtube.com", takeaways: ["Images are immutable templates; containers are running instances.", "Containers share the host kernel while isolating processes."], concepts: ["Image", "Container", "Volume"], insights: ["Start with a small Dockerfile and add only what the application needs."] },
  { id: "compound-interest", title: "How Compound Interest Actually Works", source: "YouTube", date: "Aug 24", tag: "Finance", thumbnail: "from-lime-100 to-emerald-50", summary: "Returns build on both your original amount and prior gains—making time a powerful part of the equation.", url: "https://youtube.com", takeaways: ["Money grows on principal and accumulated interest.", "Time can matter more than the initial amount."], concepts: ["Compound interest", "Principal", "Time horizon"], insights: ["Consistency makes long-term plans more resilient than perfect timing."] },
  { id: "design-systems", title: "A Practical Guide to Design Systems", source: "Instagram", date: "Aug 20", tag: "Design", thumbnail: "from-violet-100 to-fuchsia-50", summary: "A design system is a shared language of decisions, not simply a collection of interface components.", url: "https://instagram.com", takeaways: ["Tokens bring consistency across product surfaces.", "Documentation makes patterns useful to a wider team."], concepts: ["Design tokens", "Components", "Accessibility"], insights: ["Begin by noticing repeat decisions before standardising them."] },
];

export const pricingPlans: { name: string; price: string; captures: string; featured?: boolean; features: string[] }[] = [
  { name: "Free", price: "₹0", captures: "15 captures / month", features: ["Instagram capture", "YouTube capture", "Knowledge cards", "Basic library"] },
  { name: "Plus", price: "₹199", captures: "100 captures / month", featured: true, features: ["Everything in Free", "Full knowledge cards", "Search and editing", "Review and more AI processing"] },
  { name: "Pro", price: "₹399", captures: "400 captures / month", features: ["Everything in Plus", "Advanced AI features", "Advanced review", "Priority processing"] },
];

export const useCases = [
  ["Students", "Turn lectures, tutorials and educational videos into revision-ready knowledge."],
  ["Developers", "Capture useful coding tutorials and technical explanations."],
  ["Young Professionals", "Turn career content into a searchable knowledge base."],
  ["Lifelong Learners", "Build a personal library from everything useful you discover online."],
  ["Founders & Creators", "Keep ideas, frameworks and insights out of the saved folder."],
] as const;

export const blogPosts = [
  ["Learning", "Why your saved folder never becomes a learning system", "Saved links are a starting point. A usable knowledge system creates a reason to return.", "5 min read", "Aug 30, 2026"],
  ["Guides", "How to actually learn from YouTube", "A calmer way to turn a long watch list into notes you will genuinely use.", "6 min read", "Aug 22, 2026"],
  ["Ideas", "The difference between consuming information and retaining it", "What changes when a fleeting insight has a place to live.", "4 min read", "Aug 15, 2026"],
  ["Behind Reteno", "Why we built Reteno", "The personal learning system we wanted whenever we found something worth remembering.", "3 min read", "Aug 8, 2026"],
  ["Learning", "How to turn passive scrolling into active learning", "Capture is only the first step; gentle retrieval is where knowledge starts to stick.", "7 min read", "Aug 1, 2026"],
] as const;

export const faqs = [
  ["What is Reteno?", "Reteno is a personal learning system for turning useful videos and Reels you discover into structured knowledge you can revisit."],
  ["How does Reteno work?", "You send content through the capture channels, then Reteno presents it as an organized knowledge card in your library."],
  ["How do I send an Instagram Reel?", "The intended experience is to send a Reel to Reteno through Instagram DM. Capture-channel setup is coming with account connectivity."],
  ["How do I send a YouTube video?", "The intended experience is to share a YouTube link to Reteno through WhatsApp."],
  ["Do I need to install another app?", "No additional capture app is planned. Reteno is designed around the apps you already use."],
  ["Where does my knowledge go?", "Processed content appears as knowledge cards in your Reteno library."],
  ["Can I edit my knowledge cards?", "Editing is part of the planned library experience. This prototype shows the interface for it."],
  ["Can I search my saved knowledge?", "Search is included in the planned Plus experience and is represented in this prototype."],
  ["How does Reteno process videos?", "It is designed to extract and structure the useful ideas from shared content. Processing details will be published as the product develops."],
  ["What happens if processing fails?", "The product will clearly show processing status and offer a way to retry when this capability is available."],
  ["Is there a free plan?", "Yes. The current proposed Free plan includes 15 captures per month. Prices and limits may change."],
] as const;
