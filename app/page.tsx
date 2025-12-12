import Image from "next/image";
import Slider from "./components/Slider";
export default function Home() {

    const siteInfo = {
    slider_items: [
      {
        imageUrl: "/banner/banner-1.png",
        alt: "Slide 1",
      },
      {
        imageUrl: "/banner/banner-2.png",
        alt: "Slide 2",
      },
      {
        imageUrl: "/banner/banner-3.png",
        alt: "Slide 3",
      },
      // add more slides as needed
    ],
  };


  return (
    <div className="">
      <main className="mt-[50px]">

         <Slider siteInfo={siteInfo}  autoPlay={true} interval={4000} />
      </main>
    </div>
  );
}
