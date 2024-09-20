export const isEmojiOnly = (text) => {
  const regex = /^[\p{Emoji_Presentation}\p{Emoji}\u200d\u20e3\ufe0f]*$/gu;
  return regex.test(text);
};