import { useState } from 'react';

import EmojiPicker from 'emoji-picker-react';
import SmileEmoji from '@assets/smile.png';

interface Props {
  onEmojiClick?: (emoji: string) => void;
}

export default function InputEmoji(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="form-input__emoji-picker">
      <button
        className="btn btn--icon"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img width={20} src={SmileEmoji} alt="Emoji" />
      </button>
      <div className="form-input__emoji-picker__wrapper">
        {isOpen && (
          <div className="form-input__emoji-picker__wrapper__content">
            <EmojiPicker
              onEmojiClick={({ emoji }) => {
                props.onEmojiClick?.(emoji);
                setIsOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
