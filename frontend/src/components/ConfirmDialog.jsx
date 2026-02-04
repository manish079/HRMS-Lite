import { useState } from "react";

/**
 * Reusable Confirmation Dialog Component
 * Replaces window.confirm with a better UX
 */
function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDangerous = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
          {/* Icon */}
          <div
            className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
              isDangerous ? "bg-red-100" : "bg-yellow-100"
            }`}
          >
            {isDangerous ? (
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>

          {/* Content */}
          <div className="mt-3 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{message}</p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button onClick={onCancel} className="flex-1 btn-secondary">
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 ${isDangerous ? "btn-danger" : "btn-primary"}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Custom hook to manage confirmation dialog state
 */
export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const confirm = ({ title, message, onConfirm, isDangerous = false }) => {
    return new Promise((resolve) => {
      setConfig({
        title,
        message,
        isDangerous,
        onConfirm: () => {
          onConfirm?.();
          resolve(true);
          setIsOpen(false);
        },
        onCancel: () => {
          resolve(false);
          setIsOpen(false);
        },
      });
      setIsOpen(true);
    });
  };

  return {
    ConfirmDialog: () => <ConfirmDialog isOpen={isOpen} {...config} />,
    confirm,
  };
};

export default ConfirmDialog;
