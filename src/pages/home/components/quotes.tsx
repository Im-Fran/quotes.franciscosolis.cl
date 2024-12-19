import {clsx} from "clsx";
import {Quote} from "@/lib/models/quote.ts";
import {Button} from "@/components/ui/button/button.tsx";
import {useState} from "react";
import QuoteCard from "@/components/ui/quote/quote.tsx";
import EmptyQuote from "@/components/ui/quote/empty-quote.tsx";
import {Link} from "react-router-dom";

export type QuotesProps = {
  className?: string;
  loadMore: ({ skip }: {skip: number}) => Promise<void>;
  hasMore: boolean;
  quotes: Quote[];
  loadingQuotes: boolean
}

const Quotes = ({ className, hasMore, loadMore, quotes, loadingQuotes }: QuotesProps) => {

  const [loadingMoreQuotes, setLoadingMoreQuotes] = useState(false)
  const loadMoreQuotes = async () => {
    if(loadingMoreQuotes) return

    setLoadingMoreQuotes(true)
    await loadMore({ skip: quotes.length })
    setLoadingMoreQuotes(false)
  }

  return <div className={clsx(["flex flex-col gap-5 w-full", className])}>
    {loadingQuotes ? [0,1,2,3,4,5].map(it => <EmptyQuote key={it}/>) : (quotes.length > 0 ? quotes.map(quote => <Link to={`/quote/${quote.id}`} key={quote.id}><QuoteCard quote={quote} key={quote.id} /></Link>) : (<div className={"text-center text-gray-500"}>No hay cotizaciones</div>))}

    {hasMore && <Button onClick={() => loadMoreQuotes()} className={"w-full"}>
      {loadingMoreQuotes ? 'Cargando...' : 'Cargar más'}
    </Button>}
  </div>
}

export default Quotes