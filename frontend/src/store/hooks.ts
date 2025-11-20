import { useDispatch, useSelector } from 'react-redux'
import type  { TypedUseSelectorHook  } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// استفاده به‌جای useDispatch عادی
export const useAppDispatch: () => AppDispatch = useDispatch

// استفاده به‌جای useSelector عادی
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector