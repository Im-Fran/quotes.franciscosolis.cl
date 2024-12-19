import usePermissions from "@/hooks/usePermissions.ts";
import CreateQuote from "@/pages/home/components/create-quote.tsx";
import {clsx} from "clsx";
import Quotes from "@/pages/home/components/quotes.tsx";
import {useEffect, useState} from "react";
import {Quote} from "@/lib/models/quote.ts";
import axios from "@/lib/axios.ts";

const Home = () => {

  const { can } = usePermissions()
  const [loadingQuotes, setLoadingQuotes] = useState(false)
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [hasMore, setHasMore] = useState(false)

  const loadQuotes = async ({ skip }: { skip?: number}) => {
    const res = await axios.get('/quotes', {
      params: {
        skip,
        take: 10
      }
    })

    const { quotes, hasMore } = res.data

    setQuotes(prev => skip == 0 ? quotes : [...prev, ...quotes])
    setHasMore(hasMore)
  }

  useEffect(() => {
    setLoadingQuotes(true)
    loadQuotes({ skip: 0 }).then(() => setLoadingQuotes(false))
  }, [])

  return <div className={"py-5 flex flex-col gap-5"}>
    <div className={clsx([
      "grid",
      {
        "grid-cols-1 md:grid-cols-10": can('quotes.create'),
        "grid-cols-1": !can('quotes.create')
      },
      "gap-0 md:gap-5",
    ])}>
      <CreateQuote loadQuotes={() => loadQuotes({ skip: 0 })} className={"col-span-3 h-[28rem] mb-5 md:mb-0"}/>
      <Quotes loadingQuotes={loadingQuotes} hasMore={hasMore} loadMore={loadQuotes} quotes={quotes} className={"col-span-7"}/>
    </div>
  </div>
};

export default Home;
