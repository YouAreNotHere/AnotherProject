import {create} from "zustand/react";
import type {SroreState} from "../types/ISroreState.ts";

const useStore = create<SroreState>((set)=> ({
    text: "",
    setText: (value)=> set ({text: value}),
    resetText: ()=> set({text: ""}),
}))

export default useStore;