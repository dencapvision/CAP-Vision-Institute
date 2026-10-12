import { useEffect, useRef, useState } from 'react';

// Independent React islands share the same popup owner through a window event.
export function useContactPopup(owner: 'ai' | 'line') {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onOpen = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== owner) setIsOpen(false);
    };
    window.addEventListener('cap:contact-open', onOpen);
    return () => window.removeEventListener('cap:contact-open', onOpen);
  }, [owner]);
  useEffect(() => {
    if (!isOpen) return;
    window.dispatchEvent(new CustomEvent('cap:contact-open', { detail: owner }));
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, owner]);
  const close = () => { setIsOpen(false); triggerRef.current?.focus(); };
  return { isOpen, setIsOpen, triggerRef, close };
}
