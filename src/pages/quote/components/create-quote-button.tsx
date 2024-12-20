import {Quote} from "@/lib/models/quote.ts";
import {Button} from "@/components/ui/button/button.tsx";
import {Plus} from "lucide-react";
import CreateItemDialog, {CreateItemDialogRef} from "@/pages/quote/components/dialogs/create-item-dialog.tsx";
import {useRef} from "react";
import {Item} from "@/lib/models/item.ts";
import toast from "react-hot-toast";
import axios from "@/lib/axios.ts";
import usePermissions from "@/hooks/usePermissions.ts";

export type CreateQuoteButtonProps = {
  quote: Quote;
  setQuote: (quote: Quote) => void;
}

const CreateQuoteButton = ({ quote, setQuote }: CreateQuoteButtonProps) => {

  const { can } = usePermissions()
  const createItemDialogRef = useRef<CreateItemDialogRef>(null)
  const handleCreateItem = (item: Item) => {
    if(!quote) return
    toast.promise(axios.post(`/quotes/${quote.id}/items`, item), {
      loading: 'Guardando elemento...',
      success: (res) => {
        setQuote({
          ...quote,
          Item: [...quote.Item, res.data.item]
        })
        return 'Elemento guardado!'
      },
      error: (err) => err.resonse?.data?.error || 'Error al guardar el elemento!',
    }).then()
  }

  return can('items.create') && quote && <>
      <Button variant={"success"} onClick={() => createItemDialogRef.current?.open()}>
          <Plus className={"w-4 h-4 mr-2.5"}/>
          Agregar Elemento
      </Button>

      <CreateItemDialog onSave={handleCreateItem} ref={createItemDialogRef}/>
  </>
}

export default CreateQuoteButton