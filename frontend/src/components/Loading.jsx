export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="space-y-2">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-600 dark:text-gray-400 text-center">Loading...</p>
      </div>
    </div>
  );
}
