import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Quote} from "@/lib/models/quote.ts";
import toast from "react-hot-toast";
import axios from "@/lib/axios.ts";
import QuoteCard from "@/components/ui/quote/quote.tsx";
import EmptyQuote from "@/components/ui/quote/empty-quote.tsx";
import {Button} from "@/components/ui/button/button.tsx";
import {Edit, Plus, Trash} from "lucide-react";
import usePermissions from "@/hooks/usePermissions.ts";
import UpdateQuoteDialog, {UpdateQuoteDialogRef} from "@/pages/quote/components/dialogs/update-quote-dialog.tsx";
import QuoteItems from "@/pages/quote/components/quote-items.tsx";
import {currencyFormat} from "@/lib/utils.ts";
import {Item} from "@/lib/models/item.ts";
import CreateItemDialog, {CreateItemDialogRef} from "@/pages/quote/components/dialogs/create-item-dialog.tsx";
import UpdateItemDialog, {UpdateItemDialogRef} from "@/pages/quote/components/dialogs/update-item-dialog.tsx";

const QuoteIndex = () => {
  const { id } = useParams()
  const { can } = usePermissions()

  const [quote, setQuote] = useState<Quote | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if(id == undefined || isNaN(parseInt(id))) {
      toast.error("ID inválido!")
      return
    }

    axios.get(`/quotes/${id}`).then(res => setQuote(res.data.quote)).catch(() => toast.error('Error al obtener la cotización!'))
  }, [id]);

  const updateQuoteDialogRef = useRef<UpdateQuoteDialogRef>(null)
  const destroy = () => toast.promise(axios.delete(`/quotes/${id}`), {
    loading: 'Eliminando cotización...',
    success: () => {
      navigate('/')
      return 'Cotización eliminada!'
    },
    error: err => err.response?.data || 'Error al eliminar la cotización!',
  })
  const handleSaveQuote = (quote: Quote) => {
    toast.promise(axios.patch(`/quotes/${quote.id}`, quote), {
      loading: 'Guardando cotización...',
      success: () => {
        setQuote(quote)
        return 'Cotización guardada!'
      },
      error: 'Error al guardar la cotización!',
    }).then()
  }
  const updateItemDialogRef = useRef<UpdateItemDialogRef>(null)
  const createItemDialogRef = useRef<CreateItemDialogRef>(null)
  const handleCreateItem = (item: Item) => {
    if(quote == null) return
    toast.promise(axios.post(`/quotes/${quote.id}/items`, item), {
      loading: 'Guardando elemento...',
      success: (res) => {
        setQuote(() => ({
          ...quote,
          Item: [...quote.Item, res.data.item]
        }))
        return 'Elemento guardado!'
      },
      error: 'Error al guardar el elemento!',
    }).then()
  }
  const handleUpdateItem = (item: Item) => {
    if(quote == null) return
    toast.promise(axios.patch(`/quotes/${quote.id}/items/${item.id}`, item), {
      loading: 'Guardando elemento...',
      success: (res) => {
        setQuote(() => ({
          ...quote,
          Item: quote.Item.map(i => i.id === item.id ? res.data.item : i)
        }))
        return 'Elemento guardado!'
      },
      error: 'Error al guardar el elemento!',
    }).then()
  }

  return <div className={"flex flex-col items-center justify-center w-full"}>
    <div className={"flex flex-col w-full"}>
      {quote == null ? <EmptyQuote/> : <QuoteCard quote={quote}/>}

      <div className={"flex items-center justify-between mt-5"}>
        <div className={"flex items-center gap-2"}>
          {can('items.create') && quote && <Button variant={"success"} onClick={() => createItemDialogRef.current?.open()}>
              <Plus className={"w-4 h-4 mr-2.5"}/>
              Agregar Elemento
          </Button>}

          {can('quotes.update') && quote && <Button onClick={() => updateQuoteDialogRef.current?.open(quote)}>
              <Edit className={"w-4 h-4 mr-2.5"}/>
              Editar Cotización
          </Button>}
        </div>

        {can('quotes.destroy') && quote && <Button onClick={destroy} variant={"danger"}>
            <Trash className={"w-4 h-4 mr-2.5"}/>
            Eliminar Cotización
        </Button>}
      </div>

      {/* Items */}
      {quote && quote.Item?.length > 0 && <div className={"mt-5"}>
          <h2 className={"text-lg font-semibold"}>Elementos</h2>
          <div className={"mt-2"}>
              <QuoteItems quote={quote} setQuote={setQuote} editItem={(item) => updateItemDialogRef.current?.open(item)}/>
          </div>

          {quote.Item?.length > 0 && <div className={"flex items-center justify-between py-2 border-b border-gray-200 mt-20"}>
              <div className={"flex flex-col items-start justify-start"}>
                  <h3 className={"text-sm font-semibold"}>Total</h3>
              </div>
              <div>
                  <p className={"text-sm font-semibold"}>{currencyFormat.format(quote.Item.reduce((acc, item) => acc + item.amount, 0))}</p>
              </div>
          </div>}
      </div>}
    </div>

    <UpdateItemDialog onSave={handleUpdateItem} ref={updateItemDialogRef}/>
    <CreateItemDialog onSave={handleCreateItem} ref={createItemDialogRef}/>
    <UpdateQuoteDialog onSave={handleSaveQuote} ref={updateQuoteDialogRef}/>
  </div>
}

export default QuoteIndex