import {forwardRef, useImperativeHandle, useState} from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button/button.tsx";
import {Input} from "@/components/ui/forms/input.tsx";
import {Label} from "@/components/ui/forms/label.tsx";
import {TextArea} from "@/components/ui/forms/text-area.tsx";
import {Item} from "@/lib/models/item.ts";

export type UpdateItemDialogProps = {
  onSave: (item: Item) => void;
}

export type UpdateItemDialogRef = {
  open: (item: Item) => void;
}

const UpdateItemDialog = forwardRef<UpdateItemDialogRef, UpdateItemDialogProps>(({ onSave }, ref) => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<Item | null>(null);

  useImperativeHandle(ref, () => ({
    open: (item: Item) => {
      setItem(item);
      setOpen(true);
    }
  }));

  const handleSave = () => {
    if (item == null) return;
    onSave(item);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-neutral-50">Editar Elemento</DialogTitle>
        </DialogHeader>
        {item && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
                className="col-span-3"
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <TextArea
                id="description"
                value={item.description}
                onChange={(e) => setItem({ ...item, description: e.target.value })}
                className="col-span-3"
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={item.amount}
                onChange={(e) => setItem({ ...item, amount: parseFloat(e.target.value) })}
                className="col-span-3"
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
            </div>
          </div>
        )}
        <DialogFooter className="gap-6">
          <Button variant={"danger"} onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default UpdateItemDialog;