import {Quote} from "@/lib/models/quote.ts";
import {Item} from "@/lib/models/item.ts";
import QuoteItems from "@/pages/quote/components/quote-items.tsx";
import {currencyFormat} from "@/lib/utils.ts";
import UpdateItemDialog, {UpdateItemDialogRef} from "@/pages/quote/components/dialogs/update-item-dialog.tsx";
import {useRef} from "react";
import toast from "react-hot-toast";
import axios from "@/lib/axios.ts";

export type QuoteElementsProps = {
  quote: Quote;
  setQuote: (quote: Quote) => void;
}

const QuoteElements = ({ quote, setQuote } : QuoteElementsProps) => {

  const updateItemDialogRef = useRef<UpdateItemDialogRef>(null)
  const handleUpdateItem = (item: Item) => {
    if(!quote) return
    toast.promise(axios.patch(`/quotes/${quote.id}/items/${item.id}`, item), {
      loading: 'Guardando elemento...',
      success: (res) => {
        setQuote({
          ...quote,
          Item: quote.Item.map(i => i.id === item.id ? res.data.item : i),
        })
        return 'Elemento guardado!'
      },
      error: (err) => err.resonse?.data?.error || 'Error al guardar el elemento!',
    }).then()
  }

  return <>
    <div className={"mt-5"}>
      <h2 className={"text-lg font-semibold"}>Elementos</h2>
      <div className={"mt-2"}>
        <QuoteItems quote={quote} setQuote={setQuote} editItem={(item) => updateItemDialogRef.current?.open(item)}/>
      </div>

      {quote.Item?.length > 0 &&
          <div className={"flex items-center justify-between py-2 border-b border-gray-200 mt-20"}>
              <div className={"flex flex-col items-start justify-start"}>
                  <h3 className={"text-sm font-semibold"}>Total</h3>
              </div>
              <div>
                  <p className={"text-sm font-semibold"}>{currencyFormat.format(quote.Item.reduce((acc, item) => acc + item.amount, 0))}</p>
              </div>
          </div>}
    </div>

    <UpdateItemDialog onSave={handleUpdateItem} ref={updateItemDialogRef}/>
  </>
}

export default QuoteElements