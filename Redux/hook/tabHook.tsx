import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store'; // Adjust the import path as needed
import { setSelectedTabId } from '../slice/TabSlice/TabSlice';
 
export const useTabState = (pageName: string) => {
  const dispatch = useDispatch();
  const selectedTabId = useSelector((state: RootState) => state.tab[pageName] || '0');
 
  const setTabId = (tabId: string) => {
    dispatch(setSelectedTabId({ pageName, tabId }));
  };
 
  return [selectedTabId, setTabId] as const;
};
 
 