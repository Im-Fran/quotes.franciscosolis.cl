import { ShimmerTitle, ShimmerText } from "react-shimmer-effects";

const EmptyQuote = () => <div className={"flex flex-col gap-2 bg-neutral-300 dark:bg-gray-800 rounded-xl px-5 py-2.5"}>
  <div className={"flex flex-col"}>
    <h1 className={"text-2xl font-bold"}><ShimmerTitle/></h1>
    <div className={"flex flex-col gap-2.5 my-2.5"}>
      <ShimmerTitle line={3}/>
    </div>
  </div>
  <p className={"text-md text-neutral-700 dark:text-neutral-300"}><ShimmerText line={3}/></p>
</div>

export default EmptyQuote