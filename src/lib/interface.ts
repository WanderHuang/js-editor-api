export interface Editor {
  getStatus(): EditorStatus;
  setStatus(status: Partial<EditorStatus>): void;
}
export interface IEditorPlugin {
  init(editor: Editor): void;
}