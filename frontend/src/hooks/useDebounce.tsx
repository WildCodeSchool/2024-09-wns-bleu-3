import { useEffect, useState } from "react";

function useDebounce<T>(value: T, timer: number = 400): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const debounceTimer = setTimeout(() => setDebounced(value), timer)
        return () => clearTimeout(debounceTimer)
    }, [value, timer])

    return debounced
}

export default useDebounce;