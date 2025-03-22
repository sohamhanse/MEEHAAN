import { createContext, useContext, useState, useEffect } from 'react';
import rfqs from '../data/rfqs';

const RFQContext = createContext();

export const useRfqs = () => useContext(RFQContext);

export const RFQProvider = ({ children }) => {
  const [allRfqs, setAllRfqs] = useState([]);
  const [filteredRfqs, setFilteredRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    brand: '',
    dateRange: null,
    searchQuery: ''
  });

  // Initialize RFQs from the data file
  useEffect(() => {
    // Check if RFQs were saved to localStorage
    const savedRfqs = localStorage.getItem('rfqs');
    
    if (savedRfqs) {
      setAllRfqs(JSON.parse(savedRfqs));
      setFilteredRfqs(JSON.parse(savedRfqs));
    } else {
      setAllRfqs(rfqs);
      setFilteredRfqs(rfqs);
      // Save to localStorage
      localStorage.setItem('rfqs', JSON.stringify(rfqs));
    }
    
    setLoading(false);
  }, []);

  // Apply filters when filter state changes
  useEffect(() => {
    if (allRfqs.length === 0) return;
    
    let result = [...allRfqs];
    
    // Apply status filter
    if (filters.status) {
      result = result.filter(rfq => rfq.status === filters.status);
    }
    
    // Apply brand filter
    if (filters.brand) {
      result = result.filter(rfq => rfq.brand === filters.brand);
    }
    
    // Apply date range filter
    if (filters.dateRange && filters.dateRange.start && filters.dateRange.end) {
      const start = new Date(filters.dateRange.start).getTime();
      const end = new Date(filters.dateRange.end).getTime();
      
      result = result.filter(rfq => {
        const rfqDate = new Date(rfq.createdAt).getTime();
        return rfqDate >= start && rfqDate <= end;
      });
    }
    
    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        rfq =>
          rfq.brand.toLowerCase().includes(query) ||
          rfq.partNumber.toLowerCase().includes(query) ||
          rfq.customerName.toLowerCase().includes(query) ||
          (rfq.dealerName && rfq.dealerName.toLowerCase().includes(query))
      );
    }
    
    setFilteredRfqs(result);
  }, [filters, allRfqs]);

  // Get unique statuses
  const getStatuses = () => {
    return [...new Set(allRfqs.map(rfq => rfq.status))];
  };
  
  // Get unique brands
  const getBrands = () => {
    return [...new Set(allRfqs.map(rfq => rfq.brand))];
  };
  
  // Get RFQ by ID
  const getRfqById = (id) => {
    return allRfqs.find(rfq => rfq.id === parseInt(id));
  };
  
  // Add a new RFQ
  const addRfq = (rfq) => {
    const newId = Math.max(...allRfqs.map(r => r.id), 0) + 1;
    const now = new Date().toISOString();
    
    const newRfq = { 
      ...rfq, 
      id: newId, 
      createdAt: now, 
      status: rfq.status || "received",
      dealerPrice: rfq.dealerPrice || null,
      dealerName: rfq.dealerName || null,
      customerPrice: rfq.customerPrice || null
    };
    
    const updatedRfqs = [...allRfqs, newRfq];
    setAllRfqs(updatedRfqs);
    localStorage.setItem('rfqs', JSON.stringify(updatedRfqs));
    
    return newRfq;
  };
  
  // Update an RFQ
  const updateRfq = (updatedRfq) => {
    const updatedRfqs = allRfqs.map(rfq => 
      rfq.id === updatedRfq.id ? updatedRfq : rfq
    );
    
    setAllRfqs(updatedRfqs);
    localStorage.setItem('rfqs', JSON.stringify(updatedRfqs));
    
    return updatedRfq;
  };
  
  // Delete an RFQ
  const deleteRfq = (rfqId) => {
    const updatedRfqs = allRfqs.filter(rfq => rfq.id !== rfqId);
    
    setAllRfqs(updatedRfqs);
    localStorage.setItem('rfqs', JSON.stringify(updatedRfqs));
    
    return true;
  };
  
  // Update RFQ status
  const updateRfqStatus = (rfqId, newStatus, additionalData = {}) => {
    const rfqToUpdate = allRfqs.find(rfq => rfq.id === rfqId);
    
    if (!rfqToUpdate) return null;
    
    const updatedRfq = {
      ...rfqToUpdate,
      status: newStatus,
      ...additionalData
    };
    
    return updateRfq(updatedRfq);
  };
  
  // Bulk update RFQ status
  const bulkUpdateRfqStatus = (rfqIds, newStatus, additionalData = {}) => {
    const updatedRfqs = allRfqs.map(rfq => 
      rfqIds.includes(rfq.id) 
        ? { ...rfq, status: newStatus, ...additionalData }
        : rfq
    );
    
    setAllRfqs(updatedRfqs);
    localStorage.setItem('rfqs', JSON.stringify(updatedRfqs));
    
    return rfqIds.map(id => updatedRfqs.find(rfq => rfq.id === id));
  };
  
  // Set filter
  const setFilter = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      status: '',
      brand: '',
      dateRange: null,
      searchQuery: ''
    });
  };
  
  // Group RFQs by status
  const getRfqsByStatus = () => {
    const statusGroups = {
      received: [],
      created: [],
      appliedToDealer: [],
      appliedToCustomer: [],
      converted: [],
      delivered: []
    };
    
    allRfqs.forEach(rfq => {
      if (statusGroups[rfq.status]) {
        statusGroups[rfq.status].push(rfq);
      }
    });
    
    return statusGroups;
  };

  const value = {
    rfqs: filteredRfqs,
    allRfqs,
    loading,
    filters,
    getStatuses,
    getBrands,
    getRfqById,
    addRfq,
    updateRfq,
    deleteRfq,
    updateRfqStatus,
    bulkUpdateRfqStatus,
    setFilter,
    resetFilters,
    getRfqsByStatus
  };

  return (
    <RFQContext.Provider value={value}>
      {children}
    </RFQContext.Provider>
  );
};

export default RFQContext; 