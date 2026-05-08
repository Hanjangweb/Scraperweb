export default function ProtectedRoute({ children, isAuthenticated, redirectTo = '/login' }) {
  if (!isAuthenticated) {
    window.location.href = redirectTo;
    return null;
  }

  return children;
}
