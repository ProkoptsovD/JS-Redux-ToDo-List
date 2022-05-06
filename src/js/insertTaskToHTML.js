export const insertTasktoHTML = (elementRef, markup) => {
  elementRef.innerHTML = '';
  elementRef.insertAdjacentHTML('beforeend', markup);
};
