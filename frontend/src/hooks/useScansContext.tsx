import { ScansContext } from "../context/ScansContext";
import { useContext } from "react";

export const useScansContext = () => {
    const context = useContext(ScansContext);
    if (!context) {
        throw new Error("useScansContext must be used within a ScansProvider");
    }
    return context;
};