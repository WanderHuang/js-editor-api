export default {
  createRoot(el: string) {
    let root = document.querySelector(el);
    if (root) {
      let el = document.createElement('div');
      el.style.width = '100%';
      el.style.height = '100%';

      root.append(el);

      return el;
    } else {
      throw new Error(`No available el \`${el}\` found`);
    }
  },

}