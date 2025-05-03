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

import EmojiPicker, { EmojiStyle } from "emoji-picker-react"; // make sure to use default import if you exported default

export function NodeDialogCard() {
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("Select emoji");
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (emojiData: any) => {
    setEmoji(emojiData.emoji);
    setShowPicker(false);
  };

  const handleSave = () => {
    console.log("Title:", title);
    console.log("Selected emoji:", emoji);
    // Add save logic here (e.g., API call)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
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
            <Button
              type="button"
              onClick={() => {
                setShowPicker(true);
              }}
            >
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
            <Button type="button" onClick={handleSave} size={"lg"}>
              Save changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
