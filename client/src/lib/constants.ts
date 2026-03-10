
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  video: string;
  year: string;
  role: string;
  services: string[];
  about: string;
  extraMedia: string[];

  // Nuove proprietà
  highlight?: string;
  highlightDescription?: string;
}

export const PROJECTS = [
  {
    id: "movie-review",
    title: "Movie Review",
    category: "Full Stack Development",
    description: "A comprehensive platform for reviewing cinema and television series with interactive user ratings.",
    video: "/videos/donna-tramonto.webm",
    year: "2024",
    role: "Lead Developer",
    services: ["Web Design", "App Development", "UI/UX Design"],
    technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "Framer Motion"],
    challenge: "The primary challenge was managing a massive database of films while maintaining sub-second search results and providing a seamless rating experience that felt instantaneous to the user.",
    solution: "We implemented an elastic search architecture combined with optimistic UI updates. This allowed users to interact with the platform without waiting for server confirmations, while the backend handled complex data synchronization in the background.",
    results: [
      "50% increase in user engagement within the first month",
      "Average page load time reduced to under 400ms",
      "Seamless integration with 3rd party movie databases"
    ],
    about: "The Movie Review platform was designed to bridge the gap between casual viewers and passionate film critics, giving every voice equal weight in the conversation. Cinema has always been a communal art — felt together in darkened rooms, debated over late dinners, revisited alone at midnight. We wanted to capture that electricity in a digital space. By building a robust, multi-layered rating system and weaving in interactive social features, we created something more than a database — a living, breathing community-driven space for cinematic discussion and discovery. Every interaction was engineered to feel immediate, every opinion given a stage worthy of the art it celebrates.",
    extraMedia: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=2070"
    ],
    highlight: "A standout feature of the platform",
    highlightDescription: "We implemented a real-time rating system that made user interactions instantaneous."
  },
  {
    id: "nyt-clone",
    title: "NYT Clone",
    category: "Frontend Engineering",
    description: "A pixel-perfect recreation of the New York Times digital interface focusing on high-performance typography.",
    video: "/videos/Carta-giornali.webm",
    year: "2023",
    role: "Frontend Engineer",
    services: ["Web Development", "Performance Optimization"],
    technologies: ["Next.js", "TypeScript", "Styled Components", "Vercel"],
    challenge: "Replicating the intricate layout and typography of a century-old newspaper for the modern web meant overcoming significant challenges in font loading performance and complex CSS grid systems.",
    solution: "I developed a custom font-loading strategy that prioritizes critical typography, coupled with a modular grid system that adapts seamlessly across all viewport sizes without sacrificing the 'newspaper' feel.",
    results: [
      "Perfect 100/100 Lighthouse performance score",
      "Zero layout shift during content loading",
      "Highly accessible reading experience for all users"
    ],
    about: "This project was a deep dive into the intersection of editorial tradition and modern web engineering — a study in controlled obsession. The New York Times has spent over a century perfecting the art of presenting information with authority and grace, and translating that legacy onto the web without losing its soul required extraordinary precision. The goal was not merely to clone an interface, but to understand why every typographic decision exists, why the grid breathes the way it does, why silence on the page is as deliberate as the words themselves. Using modern web technologies and a performance-first architecture, we rebuilt that reading experience from the ground up — ensuring sub-second load times even for text-heavy layouts, and achieving a visual fidelity that blurs the line between original and recreation.",
    extraMedia: [
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1585829365294-bb7c63b3ecda?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1574302088018-84223d6a4005?auto=format&fit=crop&q=80&w=2070"
    ],
    highlight: "Pixel-perfect digital recreation",
    highlightDescription: "Achieved a perfect balance between historical newspaper design and modern web performance, delivering a seamless reading experience."
  },
  {
    id: "lookbook",
    title: "Lookbook",
    category: "Backend Architecture",
    description: "A RESTful API platform built with Node.js and Express for the second-hand clothing marketplace.",
    video: "/videos/donna-balla2.webm",
    year: "2024",
    role: "Backend Architect",
    services: ["API Design", "Database Modeling", "Microservices"],
    technologies: ["Express", "MongoDB", "Redis", "Docker", "AWS"],
    challenge: "Scaling a marketplace that handles thousands of concurrent inventory updates while ensuring data consistency across multiple microservices was the core architectural hurdle.",
    solution: "We implemented a distributed message queue system (Redis) to handle asynchronous updates and moved to a document-oriented database to support highly variable product metadata.",
    results: [
      "Supports 10k+ concurrent active users",
      "99.99% uptime during peak fashion season",
      "Search results delivered in under 50ms"
    ],
    about: "Lookbook was born at the crossroads of fashion culture and high-performance systems engineering — a place where aesthetic intuition meets relentless technical precision. The second-hand clothing market is chaotic by nature: inventory shifts by the second, product metadata is wildly inconsistent, and user expectations for speed are unforgiving. Building a backend capable of holding all of that together without fracturing under pressure required rethinking the architecture from first principles. We moved away from rigid relational structures and embraced a distributed, document-oriented approach that could flex with the data rather than fight it. Complex filtering algorithms were engineered to surface exactly the right garment at exactly the right moment, while real-time inventory tracking ensured that no two users would ever fight over the same pair of vintage Levi's. The result is infrastructure that feels invisible — which is exactly the point.",
    extraMedia: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1490481651871-ab68624d5e17?auto=format&fit=crop&q=80&w=2070"
    ],
    highlight: "Scalable backend for high traffic",
    highlightDescription: "Implemented distributed messaging and document-oriented storage to support thousands of concurrent users with real-time inventory updates."
  },
  {
    id: "zen-garden",
    title: "Zen Garden",
    category: "UI/UX Design",
    description: "A minimalist meditation app designed to provide peace and tranquility through immersive soundscapes.",
    video: "/videos/uomo-deserto.webm",
    year: "2023",
    role: "Product Designer",
    services: ["Mobile Design", "Sound Design", "User Research"],
    technologies: ["Figma", "SwiftUI", "Web Audio API", "Three.js"],
    challenge: "The challenge was to create a digital product that felt 'analog' and calming, avoiding the typical addictive patterns of mobile apps while still being engaging.",
    solution: "We utilized generative audio and slow-motion 3D visuals that react to the user's breathing patterns, creating a biological feedback loop that promotes relaxation.",
    results: [
      "4.9 star rating on the App Store",
      "Average daily session length of 15 minutes",
      "Featured by Apple for 'Apps We Love'"
    ],
    about: "Zen Garden was born from a very simple, very urgent question — what would it feel like if a digital product actively wanted you to put it down? Most apps are engineered for compulsion, wiring every micro-interaction to fire the same dopamine loops that keep us scrolling at 2am. We chose the opposite path entirely. We focused relentlessly on reducing cognitive load, stripping the interface down to its bare essentials until only clarity remained. Every visual decision was stress-tested against a single criterion: does this bring calm or does it add noise? Immersive audio engineering layered generative soundscapes that shift imperceptibly with time of day, while 3D visuals move at the pace of breath rather than the pace of news. The result is a sanctuary — a rare pocket of digital silence in an increasingly loud world, designed not to demand your attention, but to gently return it to yourself.",
    extraMedia: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=2070"
    ]
  },
  {
    id: "eco-store",
    title: "Eco Store",
    category: "E-commerce",
    description: "A sustainable marketplace platform focusing on zero-waste products and ethical consumption.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-white-petals-falling-from-a-tree-in-the-forest-42404-large.mp4",
    year: "2024",
    role: "Full Stack Developer",
    services: ["E-commerce", "Sustainable Design", "Brand Identity"],
    technologies: ["Shopify Plus", "React", "GraphQL", "Python"],
    challenge: "Integrating real-time carbon footprint calculations for a global supply chain was a data engineering feat that required connecting hundreds of disparate data points.",
    solution: "We built a custom middleware using Python to aggregate supply chain data and exposed it via a GraphQL API to the React frontend, allowing for live impact tracking at checkout.",
    results: [
      "Offset 500+ tons of CO2 in the first year",
      "25% conversion rate for eco-conscious shoppers",
      "Successful Series A funding round"
    ],
    about: "Eco Store was never just a place to buy things — it was conceived from the start as an argument, a provocation, a proof that commerce and conscience do not have to be at odds. The premise was radical in its simplicity: every purchase should tell you the full story of what it cost the planet, not just what it cost your wallet. Making that real required solving genuinely hard data engineering problems — stitching together fragmented supply chain data from hundreds of sources into a coherent, real-time picture of environmental impact. We built custom middleware to aggregate that complexity and surfaced it through a GraphQL API that could deliver live carbon footprint calculations directly at the moment of checkout, when it actually matters. The design language was treated with equal seriousness — earthy, unhurried, rooted in the textures and tones of the natural world. Because if you are asking people to shop differently, the experience itself has to feel like it already belongs to a better future.",
    extraMedia: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=2070"
    ]
  }
];
