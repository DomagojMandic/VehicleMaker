import { useState } from 'react';

import { useSearchParams } from 'react-router';
import { loadFilters, type FilterState } from '../localStorage/FilterState';

interface FilterConfig {
  hasSelectFilter?: boolean;
  inputParamName?: string;
  selectParamName?: string;
}

// helper function for accessing FilterState properties
function getStoredFilterValue(
  filters: FilterState | null,
  paramName: string,
): string | undefined {
  if (!filters) return undefined;

  switch (paramName) {
    case 'filterBy':
      return filters.filterBy;
    case 'filterByInput':
      return filters.filterByInput;
    case 'filterBySelect':
      return filters.filterBySelect;
    case 'sortBy':
      return filters.sortBy;
    default:
      return undefined;
  }
}

export function useVehicleFilters(
  filterStorageKey: string,
  config: FilterConfig = {},
) {
  const {
    hasSelectFilter = false,
    inputParamName = 'filterBy', // VehicleMake default
    selectParamName = 'filterBySelect',
  } = config;

  const [searchParams, setSearchParams] = useSearchParams();
  const storedFilters = loadFilters(filterStorageKey);

  const [sortBy, setSortBy] = useState(() => {
    return (
      searchParams.get('sortBy') ??
      getStoredFilterValue(storedFilters, 'sortBy') ??
      undefined
    );
  });

  const [userFilter, setUserFilter] = useState(() => {
    return (
      searchParams.get(inputParamName) ??
      getStoredFilterValue(storedFilters, inputParamName) ??
      ''
    );
  });

  const [selectFilter, setSelectFilter] = useState(() => {
    if (!hasSelectFilter) return undefined;
    return (
      searchParams.get(selectParamName) ??
      getStoredFilterValue(storedFilters, selectParamName) ??
      ''
    );
  });

  return {
    sortBy,
    setSortBy,
    userFilter,
    setUserFilter,
    ...(hasSelectFilter && { selectFilter, setSelectFilter }),
    searchParams,
    setSearchParams,
    config,
  };
}
