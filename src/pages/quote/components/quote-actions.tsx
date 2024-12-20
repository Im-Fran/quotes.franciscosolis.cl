import {Quote} from "@/lib/models/quote.ts";
import EditQuoteButton from "@/pages/quote/components/edit-quote-button.tsx";
import CreateQuoteButton from "@/pages/quote/components/create-quote-button.tsx";
import DeleteQuoteButton from "@/pages/quote/components/delete-quote-button.tsx";

export type QuoteActionsProps = {
  quote: Quote;
  setQuote: (quote: Quote) => void;
}

const QuoteActions = ({ quote, setQuote }: QuoteActionsProps) => <div className={"flex items-center justify-between mt-5"}>
  <div className={"flex items-center gap-2"}>
    <CreateQuoteButton quote={quote} setQuote={setQuote}/>
    <EditQuoteButton quote={quote} setQuote={setQuote}/>
  </div>

  <DeleteQuoteButton quote={quote}/>
</div>

export default QuoteActions