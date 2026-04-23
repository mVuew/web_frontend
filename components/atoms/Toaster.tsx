import React, { useEffect } from "react";
import colors from "../../constants/colors";

type ToastType = "success" | "error" | "info";

type ToasterProps = {
  type?: ToastType;
  message: string;
  visible: boolean;
  onClose?: () => void;
};

const toastMap: Record<ToastType, string> = {
  success: colors.toastSuccess,
  error: colors.toastError,
  info: colors.toastInfo,
};

export default function Toaster({
  type = "success",
  message,
  visible,
  onClose,
}: ToasterProps) {
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50`} style={{ backgroundColor: colors.background }}>
      <div
        className={`
          max-w-sm px-4 py-3 rounded-lg shadow-lg text-sm font-medium
          transition-all duration-300
          ${toastMap[type]}`}>
        {message}
      </div>
    </div>
  );
}