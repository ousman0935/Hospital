export default function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`bg-blue-600 text-white p-3 rounded-xl font-semibold w-full ${className}`}
    >
      {children}
    </button>
  );
}
