interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export default Modal;
