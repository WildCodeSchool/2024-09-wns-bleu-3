// Get status style based on status code

export const getStatusStyle = (statusCode: number, isSelected = false) => {
    if (isSelected) return "bg-white text-black"
  
    if (statusCode >= 200 && statusCode < 300) return "bg-emerald-600 text-white"
    if (statusCode >= 400 && statusCode < 500) return "bg-amber-500 text-white"
    if (statusCode >= 500) return "bg-rose-600 text-white"
    return "bg-gray-400 text-white"
  }
  
  