import { ANSIColors } from "@/shared/utils/text";

export function formatSqlQuery(query: string): string {
  const keywords = [
    "SELECT",
    "FROM",
    "WHERE",
    "LEFT JOIN",
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

  // Remove extra spaces and trim the query
  let formattedQuery = query.replace(/\s+/g, " ").trim();

  // Replace spaces inside double quotes with a placeholder
  formattedQuery = formattedQuery.replace(/"([^"]+)"/g, (match) => {
    return match.replace(/\s+/g, "_SPACE_");
  });

  // Highlight the SELECT keyword and add a newline after it
  formattedQuery = formattedQuery.replace(
    /\bSELECT\b/i,
    `${ANSIColors.FgPurple}SELECT\n ${ANSIColors.Reset}`,
  );

  // Highlight other SQL keywords and add a newline before them
  keywords.forEach((keyword) => {
    if (keyword !== "SELECT") {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      formattedQuery = formattedQuery.replace(
        regex,
        `\n${ANSIColors.FgYellow}${keyword}${ANSIColors.Reset}`,
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
