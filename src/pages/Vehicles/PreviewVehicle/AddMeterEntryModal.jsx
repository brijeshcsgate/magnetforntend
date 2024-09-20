import { currentTimeIcon, editIcon } from '@/assets/Icons';
import Button from '@/components/common/Button/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
export default function AddMeterEntryModal() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="heading-400-10 text-gray-secondary flex gap-1 p-1 rounded-md  hover:bg-gray-quaternary/10 cursor-pointer items-center justify-center group">
            {currentTimeIcon({ width: 12, height: 12 })}Current Meter Reading
            <div className="group-hover:visible invisible">
              {editIcon({ width: 12, height: 12 })}
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Meter Reading</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4"></div>
          <DialogFooter>
            {/* <Button type="secondary">Cancel</Button>
             */}
            <DialogClose asChild>
              <Button type="secondary">Cancel</Button>
            </DialogClose>
            <Button type="primary">Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
