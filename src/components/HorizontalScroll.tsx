import { BannerItem } from "../components/BannerBrowse";
import Card from "../components/Card";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useRef } from "react";

interface HorizontalScrollProps {
  title: string;
  data: BannerItem[];
}

export default function HorizontalScroll({ title, data }: HorizontalScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll(-700)}
            className="text-gray-400 border border-gray-400 rounded-full p-2 shadow-lg transition-colors duration-300 flex items-center justify-center"
            aria-label="Scroll left"
          >
            <MdArrowBack size={15} />
          </button>
          <button
            onClick={() => scroll(700)}
            className="text-gray-400 border border-gray-400 rounded-full p-2 shadow-lg transition-colors duration-300 flex items-center justify-center"
            aria-label="Scroll right"
          >
            <MdArrowForward size={15} />
          </button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 py-2 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {data.map((item, index) => (
          <Card
            key={item.id}
            data={item}
            index={index + 1}
            trending={title === "Trending"} 
          />
        ))}
      </div>
    </div>
  );
}

