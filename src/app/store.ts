import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import VirtualTableApi from '../features/virtual-table/VirtualTableApi';
import { setupListeners } from '@reduxjs/toolkit/query';



export const store = configureStore({
  reducer: {
    [VirtualTableApi.reducerPath]: VirtualTableApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(VirtualTableApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
