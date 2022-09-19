import { useState } from 'react';

const useModalDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function toggle() {
    setIsDialogOpen(!isDialogOpen);
  }

  return {
    isDialogOpen,
    toggle,
  }
};

export default useModalDialog;