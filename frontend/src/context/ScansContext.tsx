import { ScansContextType } from "../@types/scanContext"
import { createContext } from "react"

export const ScansContext = createContext<ScansContextType | undefined>(undefined)