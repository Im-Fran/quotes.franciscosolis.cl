import {clsx} from "clsx";
import {Quote} from "@/lib/models/quote.ts";
import {Button} from "@/components/ui/button/button.tsx";
import {useState} from "react";
import QuoteComponent from "@/components/ui/quote/quote.tsx";
import EmptyQuote from "@/pages/home/components/empty-quote.tsx";
import {Link} from "react-router-dom";

export type QuotesProps = {
  className?: string;
  loadMore: ({ skip }: {skip: number}) => Promise<void>;
  hasMore: boolean;
  quotes: Quote[];
}

const Quotes = ({ className, hasMore, loadMore, quotes }: QuotesProps) => {

  const [loadingQuotes, setLoadingQuotes] = useState(false)
  const loadMoreQuotes = async () => {
    if(loadingQuotes) return

    setLoadingQuotes(true)
    await loadMore({ skip: quotes.length })
    setLoadingQuotes(false)
  }

  return <div className={clsx(["flex flex-col gap-5 w-full", className])}>
    {quotes.length == 0 && loadingQuotes ? [0,1,2,3,4,5].map(it => <EmptyQuote key={it}/>) : quotes.map(quote => <Link to={`/quote/${quote.id}`} key={quote.id}><QuoteComponent quote={quote} key={quote.id} /></Link>)}

    {hasMore && <Button onClick={() => loadMoreQuotes()} className={"w-full"}>
      {loadingQuotes ? 'Cargando...' : 'Cargar más'}
    </Button>}
  </div>
}

export default Quotes