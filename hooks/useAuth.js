import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Кастомный хук для использования AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Хук для проверки ролей
export const useRole = (requiredRole) => {
  const { hasRole, isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return { hasAccess: false, loading: true };
  }
  
  const hasAccess = isAuthenticated && (requiredRole ? hasRole(requiredRole) : true);
  
  return { hasAccess, loading };
};

// Хук для защищенных данных
export const useProtectedData = (fetchFunction, options = {}) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      const loadData = async () => {
        try {
          setLoading(true);
          const result = await fetchFunction();
          setData(result);
        } catch (err) {
          setError(err.message || 'Failed to load data');
        } finally {
          setLoading(false);
        }
      };
      
      loadData();
    }
  }, [authLoading, isAuthenticated, fetchFunction]);
  
  return { data, loading: authLoading || loading, error };
};