import { useState, useCallback } from 'react';
import api from '../utils/api';

// Кастомный хук для API запросов
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // GET запрос
  const get = useCallback(async (url, config = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(url, config);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Request failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // POST запрос
  const post = useCallback(async (url, data, config = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post(url, data, config);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Request failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // PUT запрос
  const put = useCallback(async (url, data, config = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.put(url, data, config);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Request failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // DELETE запрос
  const del = useCallback(async (url, config = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.delete(url, config);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Request failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // PATCH запрос
  const patch = useCallback(async (url, data, config = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.patch(url, data, config);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Request failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Сброс состояния
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    // Методы
    get,
    post,
    put,
    delete: del,
    patch,
    
    // Состояние
    loading,
    error,
    data,
    
    // Утилиты
    reset,
    setData,
    setError,
    setLoading,
  };
};

// Хук для конкретных запросов
export const useFetch = (url, options = {}) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await api.get(url, options);
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState({
        data: null,
        loading: false,
        error: err.response?.data?.message || err.message || 'Fetch failed',
      });
    }
  }, [url, options]);

  useEffect(() => {
    if (options.skip !== true) {
      fetchData();
    }
  }, [fetchData, options.skip]);

  const refetch = () => {
    fetchData();
  };

  return {
    ...state,
    refetch,
  };
};