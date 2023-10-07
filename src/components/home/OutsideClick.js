import { useEffect } from 'react';

export function useOutsideClick(ref, callback) {
useEffect(() => {
    function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
        callback();
    }
    }

    function handleKeyDown(event) {
    if (event.key === 'Escape') {
        callback();
    }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('keydown', handleKeyDown);
    };
}, [ref, callback]);
}
