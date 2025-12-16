interface GameItem {
  id: number | string;
  src: string;
}

interface ExclusiveGridProps {
  items: GameItem[];
}

export function ExclusiveGrid({ items }: ExclusiveGridProps) {
  return (
    <>
    <div className="grid grid-cols-3 gap-3 my-4 px-4">
      {items.map((game) => (
        <div
          key={game.id}
          className="flex items-center justify-center rounded-xl"
        >
          <img
            src={game.src}
            alt="exclusive-game"
            className="w-full h-auto object-contain"
          />
        </div>
      ))}
    </div>
      <div className="flex justify-center ">
        <button
          // onClick={() => router.push("/login")}
          className="px-3 w-[172px] h-[55px] py-[6px] text-lg font-medium bg-orange-400 text-white font-medium rounded hover:bg-blue-600 "
        >
          More
        </button>
      </div>
    </>

  );
}
