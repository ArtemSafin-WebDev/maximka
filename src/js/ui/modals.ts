import DialogModal from "../classes/components/DialogModal";

export default function modals() {
  const dialogs = Array.from(
    document.querySelectorAll<HTMLDialogElement>(".js-dialog-modal")
  );

  dialogs.forEach((dialog) => {
    new DialogModal(dialog);
  });
}
