
import dom from './Dom';
import { IEditorPlugin } from './interface';
export default class Editor {
  private props: EditorProps;
  private el: Element;
  private mutation?: MutationObserver;
  private active = true;
  private listeners: EditorEventListenerStore = {};
  private plugins: IEditorPlugin[] = [];

  constructor(props: EditorProps) {
    this.props = props;

    if (typeof props.el === 'string') {
      this.el = dom.createRoot(props.el);
    } else {
      this.el = props.el;
    }
  }

  /**
   * 启动
   */
  start() {
    this.mutation = new MutationObserver(records => {
      records.forEach(item => {
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
              this.callEvent('enter', node);
            } else if (node.tagName === "IMG") {
            }
          });
        }
      });

      this.callEvent('change', records, this.el);
    });

    this.mutation.observe(this.el, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true,
    });

    this.plugins.forEach(plugin => plugin.init(this))
  }

  /**
   * 注册事件回调
   * @param event 事件名
   * @param fn 回调函数
   */
  on(event: EditorEvent, fn: EditorEventListener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [fn];
    }

    let called = false;
    return () => {
      if (!called && this.listeners[event]) {
        this.listeners[event] = this.listeners[event]?.filter(listener => listener !== fn);
        called = true;
      }
    }
  }

  private callEvent(event: EditorEvent, ...args: any[]) {
    if (this.listeners[event]) {
      this.listeners[event]?.forEach(listener => listener(...args))
    }
  }

  /**
   * 添加插件
   * @param plugin 
   */
  addPlugin(plugin: IEditorPlugin) {
    this.plugins.push(plugin);

    // remove
    return () => {
      this.plugins = this.plugins.filter(p => p !== plugin);
    }
  }

  setStatus({ active }: Partial<EditorStatus>) {

    if (active !== undefined) {
      this.active = active;
      this.el.setAttribute('contenteditable', active ? 'true' : 'false');
    }
  }

  getStatus(): EditorStatus {
    return {
      active: this.active
    }
  }

}