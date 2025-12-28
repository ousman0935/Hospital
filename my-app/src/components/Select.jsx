export default function Select({ children, className, ...props }) {
  return (
    <select
      {...props}
      className={`w-full p-3 border rounded-xl ${className}`}
    >
      {children}
    </select>
  );
}
