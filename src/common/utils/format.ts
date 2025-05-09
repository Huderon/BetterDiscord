/**
 * Format strings with placeholders (`{{placeholder}}`) into full strings.
 * Quick example: `PluginUtilities.formatString("Hello, {{user}}", {user: "Zerebos"})`
 * would return "Hello, Zerebos".
 * @param string - string to format
 * @param values - object literal of placeholders to replacements
 * @returns the properly formatted string
 */
export default function formatString(string: string, values: Record<string, string | object | number | (() => string) | undefined>) {
    for (const val in values) {
        let replacement = values[val];
        if (typeof replacement === "function") replacement = replacement();
        if (replacement === undefined) continue;
        if (Array.isArray(replacement)) replacement = JSON.stringify(replacement);
        if (typeof (replacement) === "object" && replacement !== null) replacement = replacement.toString();
        string = string.replace(new RegExp(`{{${val}}}`, "g"), replacement.toString());
    }
    return string;
}