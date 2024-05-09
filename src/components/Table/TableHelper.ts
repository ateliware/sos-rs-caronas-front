export const pageRange = (current: number, totalPages: number): number[] => {
  const buttonToRender = 5; // number of buttons that will render

  if (totalPages <= buttonToRender) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    const pagesBefore = Math.trunc(Math.floor(buttonToRender / 2));
    const pagesAfter = Math.trunc(Math.ceil(buttonToRender / 2) - 1);

    if (current <= pagesBefore) {
      return Array.from({ length: buttonToRender }, (_, i) => i + 1);
    } else if (current + pagesAfter >= totalPages) {
      const start = totalPages - buttonToRender + 1;
      return Array.from({ length: buttonToRender }, (_, i) => i + start);
    } else {
      const start = current - pagesBefore;
      const end = current + pagesAfter;
      return Array.from({ length: end - start + 1 }, (_, i) => i + start);
    }
  }
};
