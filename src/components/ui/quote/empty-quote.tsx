import {Calendar, User} from "lucide-react";
import {ShimmerDiv, ShimmerText, ShimmerTitle} from "shimmer-effects-react";

const EmptyQuote = () => <div className={"flex flex-col gap-2 bg-neutral-300 dark:bg-gray-800 rounded-xl px-5 py-2.5"}>
  <div className={"flex flex-col"}>
    <div className={"flex items-center justify-between w-full"}>
      <ShimmerTitle mode={"light"} line={1} gap={8} width={50} height={25} className={"w-full"}/>

      <ShimmerTitle mode={"light"} line={1} gap={8} width={100} height={25} className={"w-20"}/>
    </div>
    <div className={"flex flex-col gap-2.5 my-2.5"}>
      <span className={"flex gap-2.5 text-md text-neutral-500 dark:text-neutral-400 capitalize"}>
        <Calendar className={"w-6 h-6 text-indigo-600"}/>
        <span>Fecha de Creación:</span>
        <ShimmerDiv mode={"light"} height={20} width={200} rounded={20}/>
      </span>
      <span className={"flex items-center gap-2.5 text-md text-neutral-500 dark:text-neutral-400 capitalize"}>
        <User className={"w-6 h-6 text-indigo-600"}/>
        <span>Creado Por:</span>
        <span className={"flex items-center gap-2"}>
          <ShimmerDiv mode={"light"} height={20} width={20} rounded={100}/>
          <ShimmerDiv mode={"light"} height={20} width={80} rounded={20}/>
        </span>
      </span>
      <span className={"flex items-center gap-2.5 text-md text-neutral-500 dark:text-neutral-400 capitalize"}>
        <User className={"w-6 h-6 text-indigo-600"}/>
        <span>Cliente:</span>
        <span className={"flex items-center gap-2"}>
          <ShimmerDiv mode={"light"} height={20} width={20} rounded={100}/>
          <ShimmerDiv mode={"light"} height={20} width={80} rounded={20}/>
        </span>
      </span>
    </div>
  </div>
  <p className={"text-md text-neutral-700 dark:text-neutral-300"}>
    <ShimmerText mode={"light"} line={4} height={20}/>
  </p>
</div>

export default EmptyQuote