type EditorProps = {
  el: string | Element;
}

type EditorEvent = 'enter' | 'change';
type EditorEventListener = (...args: any[]) => void;
type EditorEventListenerStore = {
  [key in EditorEvent]?: EditorEventListener[];
}

type EditorStatus = {
  active: boolean;
}