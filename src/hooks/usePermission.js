import { useCallback } from 'react';

export default function usePermission() {
  const can = useCallback((_action) => true, []);
  return { can };
}