export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-500">
          403 - Unauthorized
        </h1>
        <p className="mt-2 text-gray-600">
          You don't have permission to access this page.
        </p>
      </div>
    </div>
  );
}