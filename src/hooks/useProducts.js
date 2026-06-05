import { useState, useEffect, useCallback } from 'react';
import {
  fetchAllProducts,
  fetchProductsByRiskTier,
  fetchProductsWithFilters,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStatsByRiskTier,
} from '../services/productsService';

/**
 * Custom hook for fetching products with loading and error states
 * @param {Object} options - Hook options
 * @param {string} options.riskTier - Filter by specific risk tier
 * @param {Object} options.filters - Additional filters (complianceStatus, category)
 * @param {boolean} options.autoFetch - Whether to fetch data automatically on mount (default: true)
 * @returns {Object} - Products data, loading state, error, and refetch function
 */
export function useProducts(options = {}) {
  const { riskTier, filters, autoFetch = true } = options;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let result;

      if (filters) {
        // Use filters if provided
        result = await fetchProductsWithFilters(filters);
      } else if (riskTier) {
        // Use risk tier filter if provided
        result = await fetchProductsByRiskTier(riskTier);
      } else {
        // Fetch all products
        result = await fetchAllProducts();
      }

      if (result.error) {
        setError(result.error);
        setProducts([]);
      } else {
        setProducts(result.data || []);
      }
    } catch (err) {
      setError(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [riskTier, filters]);

  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [autoFetch, fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}

/**
 * Custom hook for fetching a single product by ID
 * @param {number} productId - The product ID
 * @param {boolean} autoFetch - Whether to fetch data automatically on mount (default: true)
 * @returns {Object} - Product data, loading state, error, and refetch function
 */
export function useProduct(productId, autoFetch = true) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    if (!productId) {
      setProduct(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchProductById(productId);

      if (result.error) {
        setError(result.error);
        setProduct(null);
      } else {
        setProduct(result.data);
      }
    } catch (err) {
      setError(err);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (autoFetch) {
      fetchProduct();
    }
  }, [autoFetch, fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
}

/**
 * Custom hook for product statistics
 * @param {boolean} autoFetch - Whether to fetch data automatically on mount (default: true)
 * @returns {Object} - Statistics data, loading state, error, and refetch function
 */
export function useProductStats(autoFetch = true) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getProductStatsByRiskTier();

      if (result.error) {
        setError(result.error);
        setStats(null);
      } else {
        setStats(result.data);
      }
    } catch (err) {
      setError(err);
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchStats();
    }
  }, [autoFetch, fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
}

/**
 * Custom hook for product mutations (create, update, delete)
 * @returns {Object} - Mutation functions with loading and error states
 */
export function useProductMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = useCallback(async (productData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createProduct(productData);

      if (result.error) {
        setError(result.error);
        return { success: false, data: null, error: result.error };
      }

      return { success: true, data: result.data, error: null };
    } catch (err) {
      setError(err);
      return { success: false, data: null, error: err };
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (productId, updates) => {
    setLoading(true);
    setError(null);

    try {
      const result = await updateProduct(productId, updates);

      if (result.error) {
        setError(result.error);
        return { success: false, data: null, error: result.error };
      }

      return { success: true, data: result.data, error: null };
    } catch (err) {
      setError(err);
      return { success: false, data: null, error: err };
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (productId) => {
    setLoading(true);
    setError(null);

    try {
      const result = await deleteProduct(productId);

      if (result.error) {
        setError(result.error);
        return { success: false, data: null, error: result.error };
      }

      return { success: true, data: result.data, error: null };
    } catch (err) {
      setError(err);
      return { success: false, data: null, error: err };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    create,
    update,
    remove,
    loading,
    error,
  };
}
