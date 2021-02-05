import Editor from './lib/Editor';
import { EditorTogglePlugin } from './lib/plugins';
import { appendLog } from './log';
import './index.less';

let playground = document.querySelector("#playground");
let view = document.querySelector("#view");

if (playground) {
  let editor = new Editor({ el: playground });
  editor.addPlugin(new EditorTogglePlugin('#toggle', (_, next) => appendLog(`[编辑器是否可编辑] ${next}`)));
  editor.start();
  editor.on('enter', () => {
    appendLog("[换行]");
  });

  editor.on('change', (_, el) => {
    if (view) {
      view.innerHTML = el.innerHTML;
    }
  })
}