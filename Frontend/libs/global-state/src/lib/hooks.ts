import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./global-state";

export const useGlobalDispatch = () => useDispatch<AppDispatch>();
export const useGlobalSelector: TypedUseSelectorHook<RootState> = useSelector;
