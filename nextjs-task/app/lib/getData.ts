export function getDateInPLFormat(date: Date){
    return new Date(date).toLocaleString("pl-PL",
        {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        })
}