import { useMemo, useState } from 'react';
import AppSettingsModalContext from './AppSettingsModalContext';

export default function AppSettingsModalProvider({ children }: any) {
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  const memoProvider = useMemo(
    () => ({
      openSettingsModal,
      setOpenSettingsModal,
    }),
    [openSettingsModal, setOpenSettingsModal]
  );

  return <AppSettingsModalContext.Provider value={memoProvider}>{children}</AppSettingsModalContext.Provider>;
}
