import AppCard from "../../components/AppCard";

const placeholderApps = [
  {
    name: "Vaultly",
    blurb: "A secure, nerdy password manager for all your secrets.",
    icon: "🔐",
    githubUrl: "https://github.com/rocketmobster/vaultly"
  },
  {
    name: "ForceFoundry",
    blurb: "Create, collect, and share custom Star Wars/Trek characters.",
    icon: "🛸",
    githubUrl: "https://github.com/rocketmobster/forcefoundry",
    previewUrl: "https://rocketmobster.github.io/forcefoundry/"
  },
  {
    name: "StarPath",
    blurb: "Track your RC hobby projects and repairs with ease.",
    icon: "🚗",
    githubUrl: "https://github.com/rocketmobster/starpath"
  },
  {
    name: "NicheVendor",
    blurb: "Find, track, and manage niche vendors for your business or hobby.",
    icon: "📦",
    githubUrl: "https://github.com/rocketmobster/nichevendor",
    previewUrl: "https://rocketmobster.github.io/nichevendor/"
  },
  {
    name: "Vendorly",
    blurb: "Manage vendors and small business contacts, mobile-first.",
    icon: "🏪",
    githubUrl: "https://github.com/rocketmobster/vendorly"
  },
];

export default function AppsPage() {
  return (
    <main className="container mx-auto py-8 px-2">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-400 drop-shadow">Apps Showcase</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {placeholderApps.map((app) => (
          <AppCard key={app.name} {...app} />
        ))}
      </div>
    </main>
  );
}
