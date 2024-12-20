import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Quote} from "@/lib/models/quote.ts";
import toast from "react-hot-toast";
import axios from "@/lib/axios.ts";
import QuoteCard from "@/components/ui/quote/quote.tsx";
import EmptyQuote from "@/components/ui/quote/empty-quote.tsx";
import QuoteElements from "@/pages/quote/components/quote-elements.tsx";
import QuoteActions from "@/pages/quote/components/quote-actions.tsx";

const QuoteIndex = () => {
  const { id } = useParams()
  const [quote, setQuote] = useState<Quote>()

  useEffect(() => {
    if(id == undefined || isNaN(parseInt(id))) {
      toast.error("ID inválido!")
      return
    }

    axios.get(`/quotes/${id}`).then(res => setQuote(res.data.quote)).catch((err) => toast.error(err.resonse?.data?.error || 'Error al obtener la cotización!'))
  }, [id]);


  return <div className={"flex flex-col items-center justify-center w-full"}>
    <div className={"flex flex-col w-full"}>
      {quote == null ? <EmptyQuote/> : <QuoteCard quote={quote}/>}

      {quote && <QuoteActions quote={quote} setQuote={setQuote} />}

      {quote && quote.Item?.length > 0 && <QuoteElements quote={quote} setQuote={setQuote}/>}
    </div>
  </div>
}

export default QuoteIndex