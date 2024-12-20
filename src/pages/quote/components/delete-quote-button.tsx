import {Quote} from "@/lib/models/quote.ts";
import {Button} from "@/components/ui/button/button.tsx";
import {Trash} from "lucide-react";
import toast from "react-hot-toast";
import axios from "@/lib/axios.ts";
import usePermissions from "@/hooks/usePermissions.ts";
import {useNavigate} from "react-router-dom";

export type DeleteQuoteButtonProps = {
  quote: Quote;
}

const DeleteQuoteButton = ({ quote }: DeleteQuoteButtonProps) => {
  const { can } = usePermissions()
  const navigate = useNavigate()

  const destroy = () => toast.promise(axios.delete(`/quotes/${quote.id}`), {
    loading: 'Eliminando cotización...',
    success: () => {
      navigate('/')
      return 'Cotización eliminada!'
    },
    error: err => err.response?.data?.error || 'Error al eliminar la cotización!',
  })


  return can('quotes.destroy') && quote && <Button onClick={destroy} variant={"danger"}>
      <Trash className={"w-4 h-4 mr-2.5"}/>
      Eliminar Cotización
  </Button>
}

export default DeleteQuoteButton

