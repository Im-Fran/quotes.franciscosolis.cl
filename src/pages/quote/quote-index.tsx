import {useParams,useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Quote} from "@/lib/models/quote.ts";
import toast from "react-hot-toast";
import axios from "@/lib/axios.ts";
import QuoteComponent from "@/components/ui/quote/quote.tsx";
import EmptyQuote from "@/pages/home/components/empty-quote.tsx";
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
  const [price, setPrice] = useState<number | undefined>()
  const navigate = useNavigate()

  useEffect(() => {
    if(id == undefined) {
      toast.error("ID inválido!")
      return
    }

    if(isNaN(parseInt(id))) {
      toast.error("ID inválido!")
      return
    }

    axios.get(`/quotes/${id}`).then(res => {

      axios.get(`/quotes/${id}/items`).then(itemsRes => {
        setQuote(() => ({
          ...res.data.quote,
          items: itemsRes.data.items as Item[]
        }))
      });
    }).catch(() => toast.error("Error al obtener esa cotización! Revisa el ID."))
  }, [id]);

  useEffect(() => {
    setPrice(() => (quote?.items || []).reduce((acc, item) => acc + item.amount, 0))
  }, [quote]);

  const updateQuoteDialogRef = useRef<UpdateQuoteDialogRef>(null)
  const openUpdateDialog = () => {
    if(quote == null) return
    updateQuoteDialogRef.current?.open(quote)
  }
  const destroy = () => {
    if(quote == null) return
    toast.promise(axios.delete(`/quotes/${quote.id}`), {
      loading: 'Eliminando cotización...',
      success: 'Cotización eliminada!',
      error: 'Error al eliminar la cotización!',
    }).then(() => {
      navigate('/')
    })
  }
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
  const openCreateItemDialog = () => createItemDialogRef.current?.open()
  const handleCreateItem = (item: Item) => {
    if(quote == null) return
    toast.promise(axios.post(`/quotes/${quote.id}/items`, item), {
      loading: 'Guardando elemento...',
      success: () => {
        axios.get(`/quotes/${quote.id}/items`).then(itemsRes => {
          setQuote(() => ({
            ...quote,
            items: itemsRes.data.items as Item[]
          }))
        });
        return 'Elemento guardado!'
      },
      error: 'Error al guardar el elemento!',
    }).then()
  }
  const handleUpdateItem = (item: Item) => {
    if(quote == null) return
    toast.promise(axios.patch(`/quotes/${quote.id}/items/${item.id}`, item), {
      loading: 'Guardando elemento...',
      success: () => {
        axios.get(`/quotes/${quote.id}/items`).then(itemsRes => {
          setQuote(() => ({
            ...quote,
            items: itemsRes.data.items as Item[]
          }))
        });
        return 'Elemento guardado!'
      },
      error: 'Error al guardar el elemento!',
    }).then()
  }

  return <div className={"flex flex-col items-center justify-center w-full"}>
    <div className={"flex flex-col w-full"}>
      {quote == null ? <EmptyQuote/> : <QuoteComponent quote={quote} price={price}/>}

      <div className={"flex items-center justify-between mt-5"}>
        <div className={"flex items-center gap-2"}>
          {can('items.create') && <Button variant={"success"} onClick={openCreateItemDialog}>
              <Plus className={"w-4 h-4 mr-2.5"}/>
              Agregar Elemento
          </Button>}

          {can('quotes.update') && <Button onClick={openUpdateDialog}>
              <Edit className={"w-4 h-4 mr-2.5"}/>
              Editar Cotización
          </Button>}
        </div>

        {can('quotes.destroy') && <Button onClick={destroy} variant={"danger"}>
            <Trash className={"w-4 h-4 mr-2.5"}/>
            Eliminar Cotización
        </Button>}
      </div>

      {/* Items */}
      {quote && quote.items?.length > 0 && <div className={"mt-5"}>
          <h2 className={"text-lg font-semibold"}>Elementos</h2>
          <div className={"mt-2"}>
              <QuoteItems quote={quote} setQuote={setQuote} editItem={(item) => updateItemDialogRef.current?.open(item)}/>
          </div>

          {price && <div className={"flex items-center justify-between py-2 border-b border-gray-200 mt-20"}>
              <div className={"flex flex-col items-start justify-start"}>
                  <h3 className={"text-sm font-semibold"}>Total</h3>
              </div>
              <div>
                  <p className={"text-sm font-semibold"}>{currencyFormat.format(price)}</p>
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