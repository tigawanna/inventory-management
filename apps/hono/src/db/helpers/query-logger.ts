import { ANSIColors } from "@/shared/utils/text";


export function formatSqlQuery(query: string): string {
  const keywords = [
    "SELECT",
    "INSERT",
    "UPDATE",
    "DELETE",
    "CREATE",
    "FROM",
    "WHERE",
    "VALUES",
    "INTO",
    "LEFT JOIN",
    "RETURNING",
    "RIGHT JOIN",
    "INNER JOIN",
    "OUTER JOIN",
    "ON",
    "AND",
    "OR",
    "GROUP BY",
    "ORDER BY",
    "HAVING",
    "LIMIT",
    "OFFSET",
    "LATERAL",
    "COALESCE",
    "JSON_AGG",
    "JSON_BUILD_ARRAY",
  ];
  const firstKeywords = keywords.slice(0, 4);

  
    // Remove extra spaces and trim the query
  let formattedQuery = query.replace(/\s+/g, " ").trim();

  // Replace spaces inside double quotes with a placeholder
  formattedQuery = formattedQuery.replace(/"([^"]+)"/g, (match) => {
    return match.replace(/\s+/g, "_SPACE_");
  });

  // Highlight the first set of keywords and add a newline after them
  firstKeywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    formattedQuery = formattedQuery.replace(
      regex,
      `${ANSIColors.FgGreen}${keyword}${ANSIColors.Reset}`,
    );
  });

  // Highlight other SQL keywords and add a newline before them
  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    if (!firstKeywords.includes(keyword)) {
    formattedQuery = formattedQuery.replace(
      regex,
      `\n${ANSIColors.FgYellow}${keyword}${ANSIColors.Reset}\n`,
    );
    }
  });

  // Add a newline after every comma
  // formattedQuery = formattedQuery.replace(/,/g, ",\n");

  // Replace the placeholder with spaces again
  formattedQuery = formattedQuery.replace(/_SPACE_/g, " ");

  const lines = formattedQuery.split("\n");
  let indentLevel = 0;
  formattedQuery = lines
    .map((line) => {
      line = line.trim();
   

      // Decrease indent level if the line starts with a closing parenthesis
      if (line.startsWith(")")) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      // Add indentation based on the current indent level
      const indentedLine = "  ".repeat(indentLevel) + line;

      // Increase indent level if the line contains an opening parenthesis without a closing parenthesis
      if (line.includes("(") && !line.includes(")")) {
        indentLevel++;
      }

      return indentedLine;
    })
    .join("\n");

  return formattedQuery;
}
