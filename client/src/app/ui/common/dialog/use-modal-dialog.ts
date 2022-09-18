import { useState } from 'react';

const useModalDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return {
    isOpen,
    toggle,
  }
};

export default useModalDialog;