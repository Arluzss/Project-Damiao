import "./Input.css";

export function Input({ className = "", type = "text", ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={`ui-input ${className}`}
      {...props}
    />
  );
}
