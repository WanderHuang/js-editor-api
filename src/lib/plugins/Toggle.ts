import { merge, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Editor, IEditorPlugin } from '../interface';

type CallFunction = (prev: boolean, next: boolean) => void;

class Toggle implements IEditorPlugin {

  private el: HTMLElement | null;
  private callback?: CallFunction;

  constructor(el: string, callback?: CallFunction) {
    this.el = document.querySelector(el);
    this.callback = callback;
  }
  init(editor: Editor): void {
    if (this.el) {
      merge(
        fromEvent<KeyboardEvent>(document, "keyup"),
        fromEvent<MouseEvent>(this.el, "click")
      ).pipe(
        filter((event) => event instanceof MouseEvent || (event as KeyboardEvent).key === "j" && event.ctrlKey)
      ).subscribe(() => {
        const { active: prev } = editor.getStatus();
        const next = !prev;
        editor.setStatus({ active: next });
        
        if (this.el) {
          this.el.innerHTML = next ? "✍️" : "👀";
          this.callback?.(prev, next);
        }
      })
    }
  }
}

export default Toggle;