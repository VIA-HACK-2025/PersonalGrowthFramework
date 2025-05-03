import { useState } from "react";
import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Input } from "../input";

import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { FaPlus } from "react-icons/fa";

interface NodeDialogCardProps {
  className?: string;
  onClick?: (data: { icon: string; title: string }) => any;
  disabled?: boolean;
}

export function NodeDialogCard({
  className,
  onClick,
  disabled,
}: NodeDialogCardProps) {
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("Emoji");
  const [showPicker, setShowPicker] = useState(false);
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emojiData: any) => {
    setEmoji(emojiData.emoji);
    setShowPicker(false);
  };

  const handleSave = () => {
    if (emoji !== "Emoji" || title.trim() !== "") {
      onClick?.({ icon: emoji, title });
    }
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setTitle("");
          setEmoji("Emoji");
          setShowPicker(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <button
          className={className}
          disabled={disabled}
          onClick={() => setOpen(true)}
        >
          <FaPlus />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Node</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="title"
            placeholder="Title (Optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="col-span-3"
          />
          <div className="flex items-center gap-4">
            <Button type="button" onClick={() => setShowPicker(true)}>
              {emoji}
            </Button>
            <div className="absolute z-10">
              {showPicker && (
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  emojiStyle={EmojiStyle.NATIVE}
                />
              )}
            </div>
            <Button type="button" onClick={handleSave} size="lg">
              Save changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
