// Generic loading spinner component for async operations
export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      {/* Spinning border animation using Tailwind */}
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-burgundy-700"></div>
    </div>
  );
}
