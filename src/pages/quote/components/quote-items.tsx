import {Quote} from "@/lib/models/quote.ts";
import {currencyFormat} from "@/lib/utils.ts";
import {Item} from "@/lib/models/item.ts";
import usePermissions from "@/hooks/usePermissions.ts";
import {Button} from "@/components/ui/button/button.tsx";
import {Edit, Trash} from "lucide-react";
import axios from "@/lib/axios.ts";
import toast from "react-hot-toast";

export type QuoteItemsProps = {
  quote: Quote;
  setQuote: (quote: Quote) => void;
  editItem: (item: Item) => void;
}

const QuoteItems = ({ quote, setQuote, editItem } : QuoteItemsProps) => {
  const { can } = usePermissions()
  const destroyItem = (item: Item) => {
    if (quote == null) return
    toast.promise(axios.delete(`/quotes/${quote.id}/items/${item.id}`), {
      loading: 'Eliminando item...',
      success: 'Item eliminado!',
      error: 'Error al eliminar el elemento!',
    }).then(() => setQuote({
      ...quote,
      Item: quote.Item?.filter(i => i.id !== item.id)
    }))
  }

  return (
    <div className="flex flex-col space-y-4">
      {(quote.Item || []).map(item => (
        <div key={item.id} className={"flex items-center justify-between py-2 border-b border-gray-200"}>
          <div className={"flex flex-col items-start justify-start"}>
            <h3 className={"text-sm font-semibold"}>{ item.name }</h3>
            <p className={"text-sm text-gray-500"}>{ item.description }</p>
          </div>
          <div className={"flex items-center justify-center gap-2"}>
            <p className={"text-sm font-semibold"}>{ currencyFormat.format(item.amount) }</p>
            {can('items.update') && <Button onClick={() => editItem(item)} size={"sm"}><Edit className={"w-6 h-6"}/></Button>}
            {can('items.destroy') && <Button onClick={() => destroyItem(item)} variant={"danger"} size={"sm"}><Trash className={"w-6 h-6"}/></Button>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuoteItems