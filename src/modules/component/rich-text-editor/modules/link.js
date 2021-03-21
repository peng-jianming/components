function getQuillSelectionIndex(quill) {
  const hasFocus = quill.hasFocus();
  quill.focus();
  const { index } = quill.getSelection();
  if (!hasFocus) quill.blur();
  return index;
}

// export function insertQuillText(quill) {
//   const index = getQuillSelectionIndex(quill);
//   quill.insertText(index, text);
//   quill.setSelection(index + text.length);
// }

export function insertQuillImage(quill, imgUrl) {
  const index = getQuillSelectionIndex(quill);
  quill.insertEmbed(index, 'image', imgUrl);
  quill.setSelection(index + 1);
}

export function insertQuillLink(quill, text, link) {
  const index = getQuillSelectionIndex(quill);
  quill.insertText(index, text, { link });
  quill.setSelection(index + text.length);
}
