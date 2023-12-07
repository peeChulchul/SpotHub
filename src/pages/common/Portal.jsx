import { createPortal } from 'react-dom';
import { useRef, useState, useEffect } from 'react';

export default function Portal({ children }) {
  const [mount, setMount] = useState(false);
  const body = useRef(null);

  const domNode = document.getElementById('portal');

  useEffect(() => {
    body.current = domNode;
    setMount(true);
  }, [domNode]);

  if (mount) {
    return createPortal(children, body.current);
  }

  return null;
}
