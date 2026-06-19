import React from 'react'

/** Renders card title from CMS (titleLine1/2 or single title). */
export function renderCardTitle(card) {
  if (!card) return null
  if (card.titleLine1) {
    return (
      <>
        {card.titleLine1}
        <br />
        {card.titleLine2}
      </>
    )
  }
  return card.title
}

/** Renders CMS text with line breaks preserved (use \n in admin for <br /> positions). */
export function renderTextWithBreaks(text) {
  if (!text) return null
  const lines = String(text).split('\n')
  return lines.map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < lines.length - 1 && <br />}
    </React.Fragment>
  ))
}
