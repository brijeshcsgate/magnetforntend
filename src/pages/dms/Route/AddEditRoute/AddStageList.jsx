import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { KeyboardSensor, PointerSensor } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { GripHorizontalIcon, Trash2Icon } from 'lucide-react';
import CustomFormikDropdownInput from '@/components/ui/CustomFormikDropdownInput';

export default function AddStageList({
  addStage,
  deleteStageHandler,
  setAddStage,
  selectOptions,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setAddStage((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={addStage} strategy={verticalListSortingStrategy}>
        <section className="flex flex-col gap-2 my-2 px-4 overflow-hidden">
          {addStage?.map((item, index) => (
            <StageData
              item={item}
              index={index}
              setAddStage={setAddStage}
              selectOptions={selectOptions}
              key={item.id}
              id={item.id}
              deleteStageHandler={deleteStageHandler}
            />
          ))}
          {addStage?.length === 0 && (
            <div className="text-center text-sm font-medium text-gray-400 w-full flex items-center justify-center md:h-full pt-2">
              No Stages
            </div>
          )}
        </section>
      </SortableContext>
    </DndContext>
  );
}

function StageData({
  item,
  index,
  setAddStage,
  selectOptions,
  id,
  deleteStageHandler,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="flex items-center justify-start gap-2 w-full "
      key={item.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div className="cursor-grab" {...listeners}>
        <GripHorizontalIcon className="w-5 h-5 text-gray-100" />
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        <div className="col-span-3">
          <CustomFormikDropdownInput
            className="w-full"
            label={`Stage ${index + 1}`}
            name={`Stage${item.id}`}
            placeholder={`Stage ${index + 1}`}
            defaultValue={item.stage.value}
            callback={(stage) => {
              setAddStage((prev) =>
                prev?.map((s) =>
                  s.id === item.id
                    ? {
                        ...s,
                        stage: stage,
                      }
                    : s
                )
              );
            }}
            options={selectOptions}
            labelColor="!text-white"
            useFormik={false}
          />
        </div>
      </div>

      <div
        className="cursor-pointer p-2 mt-auto rounded-md bg-white/20"
        onClick={() => {
          deleteStageHandler(item.id);
        }}
      >
        <Trash2Icon className="w-4 h-4 text-white" />
      </div>
    </div>
  );
}
