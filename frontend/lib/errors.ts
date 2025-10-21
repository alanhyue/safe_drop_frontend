import rawErrors from "../../shared/error_codes.json";

// Transform to { key: zh_translation }
const zh_errors: Record<string, string> = Object.fromEntries(
  Object.entries(rawErrors).map(([key, value]) => [key, value.zh])
);

export default zh_errors;
