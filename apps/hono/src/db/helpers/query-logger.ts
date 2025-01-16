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

  let formattedQuery = query.replace(/\s+/g, " ").trim();

  formattedQuery = formattedQuery.replace(/"([^"]+)"/g, (match) => {
    return match.replace(/\s+/g, "_SPACE_");
  });

  formattedQuery = formattedQuery.replace(/\bSELECT\b/i, "SELECT\n");

  keywords.forEach((keyword) => {
    if (keyword !== "SELECT") {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      formattedQuery = formattedQuery.replace(regex, `\n${keyword}`);
    }
  });

  // Add newline after every comma
  formattedQuery = formattedQuery.replace(/,/g, ",\n");

  formattedQuery = formattedQuery.replace(/_SPACE_/g, " ");

  const lines = formattedQuery.split("\n");
  let indentLevel = 0;
  formattedQuery = lines
    .map((line) => {
      line = line.trim();

      if (line.startsWith(")")) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      const indentedLine = "  ".repeat(indentLevel) + line;

      if (line.includes("(") && !line.includes(")")) {
        indentLevel++;
      }

      return indentedLine;
    })
    .join("\n");

  return formattedQuery;
}
