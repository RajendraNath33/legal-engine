export const DOCUMENT_CATEGORIES = [
  { value: "judgment", label: "Judgment" },
  { value: "bare_act", label: "Bare Act" },
  { value: "law_book", label: "Law Book" },
  { value: "section_notes", label: "Section/Notes" },
] as const;

export type DocumentCategory = (typeof DOCUMENT_CATEGORIES)[number]["value"];

export function categoryLabel(value: string) {
  return DOCUMENT_CATEGORIES.find((c) => c.value === value)?.label || value;
}
