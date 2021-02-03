import { fromEvent, merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import Editor from './lib/Editor';
import './index.less';

let playground = document.querySelector("#playground");
let log = document.querySelector("#log");
let toggle = document.querySelector("#toggle");
let view = document.querySelector("#view");

if (playground) {
  let editor = new Editor({ el: playground });
  editor.on('enter', () => {
    appendLog("[换行]");
  });

  editor.on('change', (_, el) => {
    if (view) {
      view.innerHTML = el.innerHTML;
    }
  })

  if (toggle) {
    // 切换编辑模式和非编辑模式
    let toggle$ = merge(
      fromEvent<KeyboardEvent>(document, "keyup"),
      fromEvent<MouseEvent>(toggle, "click")
    ).pipe(filter((event) => (event as KeyboardEvent).key === "j" && event.ctrlKey));
    toggle$.subscribe((event) => {
      if (playground) {
        let { active } = editor.getStatus();
        editor.setActive(!active);
        if (toggle) {
          toggle.setAttribute(
            "title",
            active ? "点击关闭编辑" : "点击打开编辑"
          );
          toggle.innerHTML = active ? "✍️" : "👀";
          appendLog(`[编辑器是否可编辑] ${active}`);
        }
      }
    });
  }
}

/// 工具函数

/** 增加日志 */
function appendLog(...args: string[]) {
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
