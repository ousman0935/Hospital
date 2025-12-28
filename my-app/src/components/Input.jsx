export default function Input({ className, ...props }) {
  return (
    <input
      {...props}
      className={`w-full p-3 border rounded-xl ${className}`}
    />
  );
}
