import MeetingModal from "../classes/components/MeetingModal";

export default function meetingModals() {
  const dialogs = Array.from(
    document.querySelectorAll<HTMLDialogElement>(".js-meeting-modal")
  );

  dialogs.forEach((dialog) => {
    new MeetingModal(dialog);
  });
}
