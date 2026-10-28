import { Fragment } from "react";
import { InlineHeart } from "@/components/decorations/Doodles";

/**
 * Renders text, drawing every "♡" as a little hand-drawn heart. The space
 * before a heart becomes non-breaking so a heart never wraps onto a line alone.
 */
export function RichText({ text, heartClassName }: { text: string; heartClassName?: string }) {
  const parts = text.split("♡");
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i < parts.length - 1 ? part.replace(/ $/, " ") : part}
          {i < parts.length - 1 && <InlineHeart className={heartClassName} />}
        </Fragment>
      ))}
    </>
  );
}
