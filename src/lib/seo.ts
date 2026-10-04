// Serializes JSON-LD so a "</script>" inside a title can't close the tag early.
export const jsonLd = (data: Record<string, unknown>) => JSON.stringify(data).replace(/</g, "\\u003c");

export const SITE_NAME = "Cris Jr. T. Fandiño";
