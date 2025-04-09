import { useState } from 'react';

export function useErrorHandler() {
  const [error, setError] = useState(null);

  const handleError = (err) => {
    console.error('[Frontend Error]', err);
    setError({
      message: err.message || 'Unknown error occurred',
      code: err.statusCode || 500,
    });
  };

  const clearError = () => setError(null);

  return { error, handleError, clearError };
}
