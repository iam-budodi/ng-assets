export interface IDialog {
  cancelButtonLabel: string;
  confirmButtonLabel: string;
  dialogHeader: string;
  dialogContent: string;
  callbackMethod: () => void;
}
