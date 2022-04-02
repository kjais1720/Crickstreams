/**
 * 
 * @param {string} text The text to truncate
 * @param {number} length The max length of the truncated text
 * @returns string Truncated text with "..." appended to it
 */
export const truncateText = (text, length) => text.slice(0,length+1)+"...";