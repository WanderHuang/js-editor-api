import { fromEvent, merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import './index.less';

let playground = document.querySelector("#playground");
let log = document.querySelector("#log");
let toggle = document.querySelector("#toggle");
let view = document.querySelector("#view");

// 响应式变更view
let observer = new MutationObserver((mut) => {
  mut.forEach((item) => {
    if (item.target && (item.target as any).querySelectorAll) {
      let imgs = (item.target as any).querySelectorAll("img");
      if (imgs) {
        imgs.forEach((img: HTMLImageElement) => {
          img.style.maxWidth = "100%";
        });
      }
    }

    // 增加元素
    if (item.addedNodes) {
      item.addedNodes.forEach((node: any) => {
        if (node.tagName === "BR") {
          appendLog("[换行]");
        } else if (node.tagName === "IMG") {
          appendLog("[插入图片]");
        }
      });
    }
    console.log("item >", item);
  });

  if (view) {
    view.innerHTML = playground?.innerHTML || '';

    view.querySelectorAll("img").forEach((img) => {
      img.style.maxWidth = "100%";

    });
  }
});

if (playground) {
  observer.observe(playground, {
    childList: true,
    attributes: false,
    characterData: true,
    subtree: true,
  });

  // 粘贴
  let paste$ = fromEvent<ClipboardEvent>(playground, "paste");
  paste$.subscribe((event) => {
    console.log("==>", event.clipboardData);
  });

  if (toggle) {
    // 切换编辑模式和非编辑模式
    let toggle$ = merge(
      fromEvent<KeyboardEvent>(document, "keyup"),
      fromEvent<MouseEvent>(toggle, "click")
    ).pipe(filter((event) => (event as KeyboardEvent).key === "j" && event.ctrlKey));
    toggle$.subscribe((event) => {
      if (playground) {

        let editable =
          playground.getAttribute("contenteditable") === "true" ? "false" : "true";
        playground.setAttribute("contenteditable", editable);
        if (toggle) {
          toggle.setAttribute(
            "title",
            editable === "true" ? "点击关闭编辑" : "点击打开编辑"
          );
          toggle.innerHTML = editable === "true" ? "✍️" : "👀";
          appendLog(`[编辑器是否可编辑] ${editable}`);
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
