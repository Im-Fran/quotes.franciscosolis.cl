import {Button} from "@/components/ui/button/button.tsx";
import {Edit} from "lucide-react";
import {Quote} from "@/lib/models/quote.ts";
import UpdateQuoteDialog, {UpdateQuoteDialogRef} from "@/pages/quote/components/dialogs/update-quote-dialog.tsx";
import {useRef} from "react";
import toast from "react-hot-toast";
import axios from "@/lib/axios.ts";
import usePermissions from "@/hooks/usePermissions.ts";

export type EditQuoteButtonProps = {
  quote: Quote;
  setQuote: (quote: Quote) => void;
}

const EditQuoteButton = ({ quote, setQuote }: EditQuoteButtonProps) => {
  const { can } = usePermissions()
  const updateQuoteDialogRef = useRef<UpdateQuoteDialogRef>(null)
  const handleSaveQuote = (quote: Quote) => {
    toast.promise(axios.patch(`/quotes/${quote.id}`, quote), {
      loading: 'Guardando cotización...',
      success: (res) => {
        setQuote({
          ...quote,
          Item: [...quote.Item, res.data.item]
        })
        return 'Cotización guardada!'
      },
      error: (err) => err.resonse?.data?.error || 'Error al guardar la cotización!',
    }).then()
  }

  return can('quotes.update') && quote && <>
      <Button onClick={() => updateQuoteDialogRef.current?.open(quote)}>
          <Edit className={"w-4 h-4 mr-2.5"}/>
          Editar Cotización
      </Button>

      <UpdateQuoteDialog onSave={handleSaveQuote} ref={updateQuoteDialogRef}/>
  </>
}

export default EditQuoteButton