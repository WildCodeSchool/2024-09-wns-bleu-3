export const getLastScannedAt = (start: string | Date): string => {
    const past = new Date(start).getTime();
    const now = Date.now();
    const minutes = Math.floor((now - past) / 60000);

    if (minutes < 60) return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
};
