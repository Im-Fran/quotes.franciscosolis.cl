import usePermissions from "@/hooks/usePermissions.ts";
import {Label} from "@/components/ui/forms/label.tsx";
import {Input} from "@/components/ui/forms/input.tsx";
import {FormEvent, useState} from "react";
import {clsx} from "clsx";
import {TextArea} from "@/components/ui/forms/text-area.tsx";
import {Button} from "@/components/ui/button/button.tsx";
import axios from "@/lib/axios.ts";
import toast from "react-hot-toast";

type CreateQuoteForm = {
  email: string;
  name: string;
  description: string;
}

export type CreateQuoteProps = {
  className?: string;
  loadQuotes: () => void;
}

const CreateQuote = ({ className, loadQuotes }: CreateQuoteProps) => {

  const {can} = usePermissions()
  const [form, setForm] = useState<CreateQuoteForm>({
    email: '',
    name: '',
    description: '',
  })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    await toast.promise(axios.post('/quotes', form), {
      loading: 'Creando Cotización...',
      success: 'Cotización Creada!',
      error: 'Error al Crear Cotización'
    })

    loadQuotes()
  }

  return can('quotes.create') && <form onSubmit={onSubmit} className={clsx(["flex flex-col items-start justify-start rounded-xl bg-neutral-300 dark:bg-gray-800 p-5 gap-5", className])}>
      <h3 className={"text-xl font-bold"}>Crea una Cotización</h3>

      <div className={"space-y-2 w-full"}>
          <Label htmlFor={"name"}>Nombre</Label>
          <Input
              id={"name"}
              placeholder={"Construcción de Sitio Web"}
              value={form.name}
              onChange={(e) => setForm((prev) => ({...prev, name: e.target.value || ''}))}
              required
          />
      </div>

      <div className={"space-y-2 w-full"}>
          <Label htmlFor={"description"}>Descripción</Label>
          <TextArea
              id={"description"}
              value={form.description}
              placeholder={"Descripción de la cotización"}
              onChange={(e) => setForm((prev) => ({...prev, description: e.target.value || ''}))}
              required
          />
      </div>

      <div className={"space-y-2 w-full"}>
          <Label htmlFor={"client"}>Correo Cliente</Label>
          <Input
              id={"client"}
              value={form.email}
              placeholder={"jdoe@quotes.franciscosolis.cl"}
              onChange={(e) => setForm((prev) => ({...prev, email: e.target.value || ''}))}
              required
          />
      </div>

      <Button className={"w-full mt-2.5"} type={"submit"}>Crear Cotización</Button>
  </form>
}

export default CreateQuote;