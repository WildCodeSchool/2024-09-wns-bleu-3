// Take a string and return it with the first letter capitalized
export  const capitalizeFirstLetter = (string: string ) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };