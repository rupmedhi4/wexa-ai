/**
 * Utility Formatters
 */

export const escapeText = (str) => {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, (match) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return map[match];
  });
};

export const formatPlural = (count, singular, plural = `${singular}s`) => {
  return `${count} ${count === 1 ? singular : plural}`;
};
