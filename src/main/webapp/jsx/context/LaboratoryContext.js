import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Action types for the laboratory context
const LAB_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_PATIENT: 'SET_PATIENT',
  REFRESH_TEST_ORDERS: 'REFRESH_TEST_ORDERS',
  REFRESH_SAMPLE_VERIFICATION: 'REFRESH_SAMPLE_VERIFICATION',
  REFRESH_RESULT_REPORTING: 'REFRESH_RESULT_REPORTING',
  REFRESH_ALL: 'REFRESH_ALL',
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  SET_SELECTED_ORDER: 'SET_SELECTED_ORDER',
  CLEAR_SELECTED_ORDER: 'CLEAR_SELECTED_ORDER',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Initial state
const initialState = {
  loading: false,
  patient: null,
  activeTab: 'test-orders', // 'test-orders', 'sample-verification', 'result-reporting'
  selectedOrder: null,
  refreshFlags: {
    testOrders: 0,
    sampleVerification: 0,
    resultReporting: 0
  },
  error: null,
  lastAction: null
};

// Reducer function
const laboratoryReducer = (state, action) => {
  switch (action.type) {
    case LAB_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case LAB_ACTIONS.SET_PATIENT:
      return {
        ...state,
        patient: action.payload,
        // Reset refresh flags when patient changes
        refreshFlags: {
          testOrders: 0,
          sampleVerification: 0,
          resultReporting: 0
        },
        selectedOrder: null
      };

    case LAB_ACTIONS.REFRESH_TEST_ORDERS:
      console.log("Reducer: Refreshing test orders, current timestamp:", Date.now());
      return {
        ...state,
        refreshFlags: {
          ...state.refreshFlags,
          testOrders: Date.now()
        },
        selectedOrder: null, // Clear selected order when refreshing
        lastAction: 'test-orders-refreshed'
      };

    case LAB_ACTIONS.REFRESH_SAMPLE_VERIFICATION:
      console.log("Reducer: Refreshing sample verification, current timestamp:", Date.now());
      return {
        ...state,
        refreshFlags: {
          ...state.refreshFlags,
          sampleVerification: Date.now()
        },
        selectedOrder: null, // Clear selected order when refreshing
        lastAction: 'sample-verification-refreshed'
      };

    case LAB_ACTIONS.REFRESH_RESULT_REPORTING:
      console.log("Reducer: Refreshing result reporting, current timestamp:", Date.now());
      return {
        ...state,
        refreshFlags: {
          ...state.refreshFlags,
          resultReporting: Date.now()
        },
        selectedOrder: null, // Clear selected order when refreshing
        lastAction: 'result-reporting-refreshed'
      };

    case LAB_ACTIONS.REFRESH_ALL:
      const timestamp = Date.now();
      return {
        ...state,
        refreshFlags: {
          testOrders: timestamp,
          sampleVerification: timestamp,
          resultReporting: timestamp
        },
        selectedOrder: null, // Clear selected order when refreshing all
        lastAction: 'all-refreshed'
      };

    case LAB_ACTIONS.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
        selectedOrder: null // Clear selected order when changing tabs
      };

    case LAB_ACTIONS.SET_SELECTED_ORDER:
      return {
        ...state,
        selectedOrder: action.payload
      };

    case LAB_ACTIONS.CLEAR_SELECTED_ORDER:
      return {
        ...state,
        selectedOrder: null
      };

    case LAB_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };

    case LAB_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

// Create the context
const LaboratoryContext = createContext();

// Provider component
export const LaboratoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(laboratoryReducer, initialState);

  // Action creators
  const setLoading = useCallback((loading) => {
    dispatch({ type: LAB_ACTIONS.SET_LOADING, payload: loading });
  }, []);

  const setPatient = useCallback((patient) => {
    dispatch({ type: LAB_ACTIONS.SET_PATIENT, payload: patient });
  }, []);

  const refreshTestOrders = useCallback(() => {
    console.log("Context: Refreshing test orders");
    dispatch({ type: LAB_ACTIONS.REFRESH_TEST_ORDERS });
  }, []);

  const refreshSampleVerification = useCallback(() => {
    console.log("Context: Refreshing sample verification");
    dispatch({ type: LAB_ACTIONS.REFRESH_SAMPLE_VERIFICATION });
  }, []);

  const refreshResultReporting = useCallback(() => {
    console.log("Context: Refreshing result reporting");
    dispatch({ type: LAB_ACTIONS.REFRESH_RESULT_REPORTING });
  }, []);

  const refreshAll = useCallback(() => {
    dispatch({ type: LAB_ACTIONS.REFRESH_ALL });
  }, []);

  const setActiveTab = useCallback((tab) => {
    dispatch({ type: LAB_ACTIONS.SET_ACTIVE_TAB, payload: tab });
  }, []);

  const setSelectedOrder = useCallback((order) => {
    dispatch({ type: LAB_ACTIONS.SET_SELECTED_ORDER, payload: order });
  }, []);

  const clearSelectedOrder = useCallback(() => {
    dispatch({ type: LAB_ACTIONS.CLEAR_SELECTED_ORDER });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: LAB_ACTIONS.SET_ERROR, payload: error });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: LAB_ACTIONS.CLEAR_ERROR });
  }, []);

  // Helper function to refresh based on action type
  const refreshBasedOnAction = useCallback((actionType) => {
    switch (actionType) {
      case 'sample-collection':
        refreshTestOrders();
        break;
      case 'sample-verification':
        refreshSampleVerification();
        break;
      case 'result-reporting':
        refreshResultReporting();
        break;
      case 'all':
        refreshAll();
        break;
      default:
        refreshAll();
    }
  }, [refreshTestOrders, refreshSampleVerification, refreshResultReporting, refreshAll]);

  const value = {
    // State
    ...state,
    
    // Actions
    setLoading,
    setPatient,
    refreshTestOrders,
    refreshSampleVerification,
    refreshResultReporting,
    refreshAll,
    refreshBasedOnAction,
    setActiveTab,
    setSelectedOrder,
    clearSelectedOrder,
    setError,
    clearError
  };

  return (
    <LaboratoryContext.Provider value={value}>
      {children}
    </LaboratoryContext.Provider>
  );
};

// Custom hook to use the laboratory context
export const useLaboratory = () => {
  const context = useContext(LaboratoryContext);
  if (!context) {
    throw new Error('useLaboratory must be used within a LaboratoryProvider');
  }
  return context;
};

// Export action types for reference
export { LAB_ACTIONS }; 