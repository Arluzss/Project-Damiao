export function Button({ children, className = "", size = "md", variant = "default", ...props }) {
  const baseStyles = "px-4 py-2 rounded font-medium transition-colors";
  
  const sizes = {
    sm: "text-sm px-2 py-1",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3"
  };
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100"
  };
  
  const classes = `${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
