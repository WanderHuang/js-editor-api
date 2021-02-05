let log = document.querySelector("#log");

export default {
  appendLog
}


/** 增加日志 */
export function appendLog(...args: string[]) {
  let p = document.createElement("p");
  p.appendChild(getText(`${new Date().toLocaleString()} `));
  args.forEach((text) => {
    p.appendChild(getText(text));
    p.appendChild(getText(";"));
  });

  if (log) {
    if (log.children.length) {
      log.insertBefore(p, log.children[0]);
    } else {
      log.appendChild(p);
    }
  }

}

/** 文本元素 */
function getText(text: string) {
  return document.createTextNode(text);
}
