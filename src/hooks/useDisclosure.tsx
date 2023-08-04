import { useEffect, useState } from 'react';

type disclosure = {
  close: () => void;
  isOpen: boolean;
  open: () => void;
  toggle: () => void;
};

export const useDisclosure = (initialState = false): disclosure => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  // useEffect(() => {
  //   if (isOpen !== initialState) {
  //     setIsOpen(initialState);
  //   }
  // }, [initialState, isOpen]);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    console.log(isOpen);
    setIsOpen(false);
  };

  const toggle = () => (isOpen ? close() : open());

  return { isOpen, open, close, toggle };
};
