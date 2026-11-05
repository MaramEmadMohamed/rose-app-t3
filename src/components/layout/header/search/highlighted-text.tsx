type HighlightedTextProps = {
  text: string;
  highlight: string;
};

// Characters like "." or "(" mean something in a RegExp, so they are escaped
// to be matched as plain text.
function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Colors every part of `text` that matches `highlight`, ignoring case.
export function HighlightedText({ text, highlight }: HighlightedTextProps) {
  // Variables
  const searchTerm = highlight.trim();

  if (!searchTerm) return text;

  // Splitting with a capturing group keeps the matches at the odd indexes.
  const parts = text.split(new RegExp(`(${escapeRegExp(searchTerm)})`, "gi"));

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <mark
        key={index}
        className="bg-transparent text-maroon-600 dark:text-soft-pink-200"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}
