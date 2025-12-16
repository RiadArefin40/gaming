"use client";
import { useRouter } from "next/navigation";

interface GameItem {
  id: number | string;
  title: string;
  src: string;
}

interface GameGridProps {
  items: GameItem[];
}

// Simple slugify function
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with hyphen
    .replace(/^-+|-+$/g, "");    // remove leading/trailing hyphens
}

export function GameGrid({ items }: GameGridProps) {
  const router = useRouter();

  const handleClick = (title: string) => {
    const slug = slugify(title);
    router.push(`/games/${slug}`);
    
  };

  return (
    <div className="grid grid-cols-2 gap-2 p-4">
      {items.map((item) => (
        <div
          data-card
          key={item.id}
          onClick={() => handleClick(item.title)}
          className="
            pt-2 p-1
            transition-all duration-300 ease-out border
            bg-gradient-to-br from-slate-800 to-slate-900 text-slate-300
            border-slate-700
            cursor-pointer hover:scale-105
          "
        >
          <div className="flex items-center px-4 gap-2">
            <img className="w-8" src={item.src} alt={item.title} />
            <span className="text-sm font-medium">{item.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
