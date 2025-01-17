import Card from "@/components/Card";
import Search from "@/components/Search";
import Image from "next/image";

export default function Home() {
  const data = Array(100).fill(0);
  return (
  <>
      <div className="px-32">
        <Search/>
        <div className="flex flex-wrap gap-5 justify-center scrollbar-hide">
        {data.map((e,i)=><div key={i} className="flex justify-center">
            <Card />
          </div>)}
        </div>
      </div>
  </>
  );
}
