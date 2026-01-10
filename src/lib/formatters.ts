// export function getInitials(name: string): string {
//     return name
//         .split(" ")
//         .map((n) => n[0])
//         .join("")
//         .toUpperCase()
//         .slice(0, 2);
// }
export const getInitials = (name?: string | null) => {
  const safe = (name ?? "").trim();
  if (!safe) return "U";

  return safe
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
};

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function queryStringFormatter(searchParamsObj: {
  [key: string]: string | string[] | undefined;
}): string {
  let queryString = "";
  // {searchTerm: "John", speciality: "Cardiology"}
  // after entries: [ ["searchTerm", "John"], ["speciality", "Cardiology"] ]
  const queryArray = Object.entries(searchParamsObj).map(([key, value]) => {
    if (Array.isArray(value)) {
      // { speciality: ["Cardiology", "Neurology"] }
      // ["Cardiology", "Neurology"]
      // ?speciality=Cardiology&speciality=Neurology
      return value.map((v) => `${key}=${encodeURIComponent(v)}`).join("&");
    } else if (value !== undefined) {
      return `${key}=${encodeURIComponent(value)}`;
    }
    return "";
  });
  queryString = queryArray.filter((q) => q !== "").join("&"); // searchTerm=John&speciality=Cardiology&speciality=Neurology
  return queryString;
}
