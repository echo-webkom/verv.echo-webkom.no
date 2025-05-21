"use client";

import { useEffect, useState, useTransition } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { X } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { Group } from "@/lib/constants";
import { Question } from "@/lib/db/schemas";
import { cn } from "@/lib/utils";
import { changeQuestionOrderAction, deleteQuestionAction } from "../actions";

type QuestionsDndProps = {
  groupId: Group;
  questions: Array<Question>;
};

export const QuestionsDnd = ({ groupId, questions }: QuestionsDndProps) => {
  const [items, setItems] = useState(questions.sort((a, b) => a.order - b.order));
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  useEffect(() => {
    setItems(questions.sort((a, b) => a.order - b.order));
  }, [questions]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((q) => q.id === active.id);
    const newIndex = items.findIndex((q) => q.id === over?.id);

    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);

    const ids = newItems.map((q) => q.id);
    startTransition(async () => {
      await changeQuestionOrderAction(groupId, ids);
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((q) => q.id)} strategy={verticalListSortingStrategy}>
        <div suppressHydrationWarning>
          {items.map((question) => (
            <SortableItem
              key={question.id}
              id={question.id}
              label={question.label}
              isPending={isPending}
              onRemove={removeItem}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

type SortableItemProps = {
  id: string;
  label: string;
  isPending: boolean;
  onRemove: (id: string) => void;
};

const SortableItem = ({ id, label, isPending, onRemove }: SortableItemProps) => {
  const { toast } = useToast();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDeleteQuestion = async () => {
    const { result, message } = await deleteQuestionAction(id);
    if (result === "error") {
      toast({
        title: "Noe gikk galt",
        description: message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Spørsmål slettet",
        description: message,
        variant: "default",
      });
      onRemove(id);
    }
  };

  return (
    <div
      className="mb-4 flex items-center gap-4 rounded border bg-white p-4"
      style={style}
      suppressHydrationWarning
    >
      <div
        ref={setNodeRef}
        {...(isPending ? {} : attributes)}
        {...(isPending ? {} : listeners)}
        className={cn({
          "opacity-50": isPending,
          "cursor-grab": !isPending,
          "cursor-not-allowed": isPending,
        })}
      >
        <DragHandleDots2Icon className="size-6" />
      </div>

      <h2 className="text-lg font-bold">{label}</h2>

      <div className="ml-auto flex items-center gap-4">
        <button
          type="button"
          onClick={handleDeleteQuestion}
          className="text-gray-600 hover:text-red-600"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
};
