import { useState } from 'react';

export default function useModal() {
  const [isOpen, setisOpen] = useState(false);

  function toggle(): void {
    setisOpen(!isOpen);
  }

  return {
    isOpen,
    toggle,
  };
}
