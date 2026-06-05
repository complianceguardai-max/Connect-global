import { supabase } from '../lib/supabase';

/**
 * ComplianceGuard AI - Products Service
 * Handles all product-related database operations with proper error handling
 */

// Valid AI Risk Tiers
export const AI_RISK_TIERS = {
  MINIMAL: 'Minimal',
  LIMITED: 'Limited',
  HIGH: 'High',
  UNACCEPTABLE: 'Unacceptable',
};

/**
 * Fetch all products from the database
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export async function fetchAllProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { data: null, error };
  }
}

/**
 * Fetch products filtered by AI risk tier
 * @param {string} riskTier - One of: 'Minimal', 'Limited', 'High', 'Unacceptable'
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export async function fetchProductsByRiskTier(riskTier) {
  try {
    // Validate risk tier
    const validTiers = Object.values(AI_RISK_TIERS);
    if (!validTiers.includes(riskTier)) {
      throw new Error(
        `Invalid risk tier: ${riskTier}. Must be one of: ${validTiers.join(', ')}`
      );
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('ai_risk_tier', riskTier)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching products by risk tier (${riskTier}):`, error);
    return { data: null, error };
  }
}

/**
 * Fetch products with multiple filters
 * @param {Object} filters - Filter options
 * @param {string} filters.riskTier - AI risk tier to filter by
 * @param {boolean} filters.complianceStatus - Compliance status to filter by
 * @param {string} filters.category - Category to filter by
 * @returns {Promise<{data: Array|null, error: Error|null}>}
 */
export async function fetchProductsWithFilters(filters = {}) {
  try {
    let query = supabase.from('products').select('*');

    // Apply risk tier filter
    if (filters.riskTier) {
      const validTiers = Object.values(AI_RISK_TIERS);
      if (!validTiers.includes(filters.riskTier)) {
        throw new Error(
          `Invalid risk tier: ${filters.riskTier}. Must be one of: ${validTiers.join(', ')}`
        );
      }
      query = query.eq('ai_risk_tier', filters.riskTier);
    }

    // Apply compliance status filter
    if (typeof filters.complianceStatus === 'boolean') {
      query = query.eq('compliance_status', filters.complianceStatus);
    }

    // Apply category filter
    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    // Order by creation date
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching products with filters:', error);
    return { data: null, error };
  }
}

/**
 * Fetch a single product by ID
 * @param {number} productId - The product ID
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function fetchProductById(productId) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    return { data: null, error };
  }
}

/**
 * Create a new product
 * @param {Object} productData - Product data
 * @param {string} productData.name - Product name
 * @param {string} productData.category - Product category
 * @param {string} productData.ai_risk_tier - AI risk tier
 * @param {boolean} productData.compliance_status - Compliance status
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function createProduct(productData) {
  try {
    // Validate required fields
    if (!productData.name || !productData.category || !productData.ai_risk_tier) {
      throw new Error('Missing required fields: name, category, and ai_risk_tier are required');
    }

    // Validate risk tier
    const validTiers = Object.values(AI_RISK_TIERS);
    if (!validTiers.includes(productData.ai_risk_tier)) {
      throw new Error(
        `Invalid risk tier: ${productData.ai_risk_tier}. Must be one of: ${validTiers.join(', ')}`
      );
    }

    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error creating product:', error);
    return { data: null, error };
  }
}

/**
 * Update a product
 * @param {number} productId - The product ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function updateProduct(productId, updates) {
  try {
    // Validate risk tier if provided
    if (updates.ai_risk_tier) {
      const validTiers = Object.values(AI_RISK_TIERS);
      if (!validTiers.includes(updates.ai_risk_tier)) {
        throw new Error(
          `Invalid risk tier: ${updates.ai_risk_tier}. Must be one of: ${validTiers.join(', ')}`
        );
      }
    }

    // Prevent direct modification of audit_log
    if (updates.audit_log) {
      delete updates.audit_log;
      console.warn('audit_log cannot be directly modified - it is immutable and managed by triggers');
    }

    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', productId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error(`Error updating product ${productId}:`, error);
    return { data: null, error };
  }
}

/**
 * Delete a product
 * @param {number} productId - The product ID
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function deleteProduct(productId) {
  try {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error(`Error deleting product ${productId}:`, error);
    return { data: null, error };
  }
}

/**
 * Get product statistics grouped by risk tier
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function getProductStatsByRiskTier() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('ai_risk_tier, compliance_status');

    if (error) throw error;

    // Group and count by risk tier
    const stats = data.reduce((acc, product) => {
      const tier = product.ai_risk_tier;
      if (!acc[tier]) {
        acc[tier] = { total: 0, compliant: 0, nonCompliant: 0 };
      }
      acc[tier].total++;
      if (product.compliance_status) {
        acc[tier].compliant++;
      } else {
        acc[tier].nonCompliant++;
      }
      return acc;
    }, {});

    return { data: stats, error: null };
  } catch (error) {
    console.error('Error fetching product statistics:', error);
    return { data: null, error };
  }
}
