import "./Button.css";

export function Button({ className, variant = "default", size = "default", ...props }) {
  const classes = `btn btn-${variant} btn-size-${size} ${className || ""}`;
  
  return (
    <button className={classes} {...props}>
      {props.children}
    </button>
  );
}