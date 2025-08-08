interface AppCardProps {
  name: string;
  blurb: string;
  cta?: string;
  icon?: string;
  githubUrl?: string;
  previewUrl?: string;
}

export default function AppCard({ name, blurb, cta = "Learn More", icon = "🛠️", githubUrl, previewUrl }: AppCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow hover:scale-105 transition-transform min-h-[180px]">
      <span className="text-3xl mb-2">{icon}</span>
      <h3 className="font-bold text-lg mb-1 text-pink-300">{name}</h3>
      <p className="text-gray-300 text-sm mb-4 text-center">{blurb}</p>
      {githubUrl ? (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-all text-sm text-center w-full"
        >
          {cta}
        </a>
      ) : (
        <button className="mt-auto bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-all text-sm">
          {cta}
        </button>
      )}
      {previewUrl && (
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-all text-sm text-center w-full"
        >
          Preview
        </a>
      )}
    </div>
  );
}
