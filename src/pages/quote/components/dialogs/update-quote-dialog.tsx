import {Quote} from "@/lib/models/quote.ts";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {forwardRef, useImperativeHandle, useState} from "react";
import {Button} from "@/components/ui/button/button.tsx";
import {Input} from "@/components/ui/forms/input.tsx";
import {Label} from "@/components/ui/forms/label.tsx";
import {TextArea} from "@/components/ui/forms/text-area.tsx";

export type UpdateQuoteDialogProps = {
  onSave: (quote: Quote) => void
}

export type UpdateQuoteDialogRef = {
  open: (quote: Quote) => void;
}

const UpdateQuoteDialog = forwardRef<UpdateQuoteDialogRef, UpdateQuoteDialogProps>(({ onSave }, ref) => {
  const [open, setOpen] = useState(false)
  const [quote, setQuote] = useState<Quote | null>(null)

  useImperativeHandle(ref, () => ({
    open: (quote: Quote) => {
      setQuote(quote)
      setOpen(true)
    }
  }))

  const handleSave = () => {
    if(quote == null) return
    onSave(quote)
    setOpen(false)
  }

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="bg-neutral-800">
      <DialogHeader>
        <DialogTitle className="text-neutral-50">Editar Cotización</DialogTitle>
      </DialogHeader>
      {quote && (
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Nombre</Label>
            <Input
              id="name"
              value={quote.name}
              onChange={(e) => setQuote({ ...quote, name: e.target.value })}
              className="col-span-3"
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Descripción</Label>
            <TextArea
              id="description"
              value={quote.description}
              onChange={(e) => setQuote({ ...quote, description: e.target.value })}
              className="col-span-3"
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>
        </div>
      )}
      <DialogFooter className="gap-6">
        <Button variant={"danger"} onClick={() => setOpen(false)}>Cancelar</Button>
        <Button onClick={handleSave}>Guardar</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
})

export default UpdateQuoteDialog