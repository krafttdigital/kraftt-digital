interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/** Renders one or more JSON-LD blocks. Pass the output of src/components/seo/schemaBuilders.ts. */
export function JsonLd({ data }: JsonLdProps) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        // JSON-LD requires raw <script> content. `block` is always one of our own
        // structured schema objects (see schemaBuilders.ts), never raw user input,
        // so this is not an XSS vector despite using dangerouslySetInnerHTML.
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
      ))}
    </>
  );
}
