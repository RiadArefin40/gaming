"use client";

import { useEffect, useRef, useState } from "react";

import { ExclusiveGrid } from "./ExclusiveGrid";



type Category = {
  id: number;
  title: string;
  image_url: string;
  position: number;
};


export default function CategorySlider() {
  const [selected, setSelected] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);



useEffect(()=>{
        const fetchData = async () => {
      try {  
        // const res = await fetch("https://api.spcwin.info/users/game-categories");
        const res = await fetch("https://ex-api-demo-yy.568win.com/web-root/restricted/information/get-game-list.aspxs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
  "CompanyKey": "F38A19A3FFDD4DF89A243A8ED8ACC6C6",
  "ServerId": "spcwin1234",
  "GpId": 1,
  "IsGetAll": true
})})
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const json = await res.json();
        console.log('json-new', json)
        setCategories(json);
       
      } catch (err: any) {
        console.error(err);
    
      }
    };
    fetchData()

},[])

const normalizeCategories = (data: Category[]) => {
  const used = new Set<number>();
  let next = 0;

  return [...data]
    .sort((a, b) => a.position - b.position)
    .map(item => {
      let serial = item.position;

      while (used.has(serial)) {
        serial = next++;
      }

      used.add(serial);
      next = Math.max(next, serial + 1);

      return {
        ...item,
        serial, // 👈 final unique serial
      };
    });
};
 const normalizedCategories = normalizeCategories(categories);
const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
useEffect(() => {
  if (normalizedCategories.length > 0) {
    setSelectedCategory(normalizedCategories[0].id);
  }
}, [normalizedCategories]);

const [provider, setProvider] = useState([])
const [category, setCategory] = useState([])
  const handleSelect = async (idx: number, id: number) => {
    setSelected(idx);
    setSelectedCategory(id)
    const container = containerRef.current;
    const item = container?.children[idx] as HTMLElement;
    item?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });

        try {
        const res = await fetch(`https://api.spcwin.info/users/game-categories/${id}/games`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const json = await res.json();
        console.log('json', json)
        setProvider(json.games);
        setCategory(json.category_title)
       
      } catch (err: any) {
        console.error(err);
    
      }
  };

  useEffect(() => {
  // Wrap async function inside useEffect
  const fetchGames = async () => {
    try {
      const res = await fetch(`https://api.spcwin.info/users/game-categories/${2}/games`);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const json = await res.json();
      console.log("json", json);
      setProvider(json.games);
       setCategory(json.category_title)
    } catch (err: any) {
      console.error("Fetch error:", err);
    }
  };

  fetchGames();
}, [2]);
  return (
    <div
      className="py-4 px-0 max-w-screen                                                 
     z-50 -mt-4"
    >
      <div
        ref={containerRef}
        className="
        flex gap-3
        overflow-x-auto 
        scroll-smooth
        snap-x snap-mandatory
        touch-pan-x
        overscroll-x-contain
        max-w-screen
        px-1
bg-yellow-300 rounded-sm bg-gradient-to-t from-black/20 to-transparent
        no-scrollbar
      pt-3
      pb-1
     
        "
      >
    {normalizedCategories.length > 0 &&
  normalizedCategories.map((item, idx) => {
    const isActive = idx === selected;

    return (
      <div
        key={item.id}
        className="relative rounded-xl max-w-screen -mt-2 pb-[0px] animate-gradient-glow"
      >
        <div className="rounded-sm overflow-hidden">
          <div
            onClick={() => handleSelect(idx, item.id)}
            className={`
              snap-center
              flex-shrink-0
              w-[85px]
              pt-[6px]
              flex flex-col items-center justify-center
              cursor-pointer select-none py-1
              ${isActive ? "bg-slate-800 rounded-sm" : ""}
            `}
          >
            {/* ICON */}
            <div
              className={`
                flex items-center justify-center mb-1
                rounded-full transition-all duration-300
                ${
                  isActive
                    ? "text-yellow-300 hover:translate-y-[-2px]"
                    : "text-slate-900 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]"
                }
              `}
            >
              <img
                className={`
                  ${isActive ? "bg-yellow-300 w-[40px] h-[40px] rounded-full p-[1px]" : "w-[40px] h-[40px]"}
                `}
                src={
                  item.image_url
                    ? `https://api.spcwin.info${item.image_url}`
                    : ""
                }
                alt={item.title || "category"}
              />
            </div>

            {/* TITLE */}
            <span
              className={`
                text-xs uppercase font-medium
                ${isActive ? "text-yellow-300" : "text-slate-900"}
              `}
            >
              {item.title}
            </span>
          </div>
        </div>
      </div>
    );
  })}

      </div>

      { provider.length > 0  && <ExclusiveGrid items={provider} cat = {category}  />}


    </div>
  );
}
