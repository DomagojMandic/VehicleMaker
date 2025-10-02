import { useSearchParams } from 'react-router';

import { useEffect, useState, type ChangeEvent } from 'react';

import VehicleGrid from '../components/layout/VehicleGrid';
import StyledVehicleGridCompound from '../components/layout/StyledVehicleGrid';
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner';
// import Pagination from '../components/UI/Pagination/Pagination';

import {
  useGetVehicleMakeNamesQuery,
  useGetVehicleModelsQuery,
} from '../store/vehicleApiSlice';
import { StyledOption, StyledSelect } from '../components/UI/Inputs/FormSelect';
import { sortModelTemplate } from '../utils/formTemplates/sortFilterTemplates';
import Container from '../components/UI/Container/Container';
import FormInput from '../components/UI/Inputs/FormInput';
import {
  loadFilters,
  saveFilters,
  VEHICLE_MODEL_FILTERS_KEY,
} from '../utils/localStorage/FilterState';

/* This version is not in use because in the newer version we eliminated the
 useEffect for setting initial state because it ended up causing issues in returning to
 the page while using the application */

function VehicleModel() {
  /* COMPONENT STATE */
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<string | undefined>(
    searchParams.get('sortBy') ?? undefined,
  );
  const [userFilter, setUserFilter] = useState<string | undefined>(
    searchParams.get('filterByInput') ?? '',
  );
  const [selectFilter, setSelectFilter] = useState<string | undefined>(
    searchParams.get('filterBySelect') ?? '',
  );

  /* API QUERY */

  /* We destructure the query so that we have direct access to VehicleMakes Array */
  const {
    data: { items: vehicleModels } = { items: [], count: 0 },
    isLoading,
  } = useGetVehicleModelsQuery({
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    sortBy,
    filterByInput: userFilter,
    filterBySelect: selectFilter,
  });

  /* EVENT HANDLERS */

  function handleSortChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setSortBy(value);

    setSearchParams((prevParams) => {
      if (value !== (prevParams.get('sortBy') ?? '')) {
        prevParams.set('page', '1');
      }

      if (value) {
        prevParams.set('sortBy', value);
      } else {
        prevParams.delete('sortBy');
      }

      return prevParams;
    });
  }

  const handleFilterInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserFilter(value);
  };

  const handleFilterSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectFilter(value);

    setSearchParams((prevParams) => {
      prevParams.set('page', '1');

      if (value) {
        prevParams.set('filterBySelect', value);
      } else {
        prevParams.delete('filterBySelect');
      }

      return prevParams;
    });
  };

  /* FILTERING - the filtering implemented is by vehicle make based on the
  URL search params. Additionally, the user can manually enter a value and filter
  the models by their name, abrv, or carMaker properties */

  /* Here we are handling the input as a controlled element so that we can later
  on debounce the input */

  /* useEffect - Mount logic */

  useEffect(() => {
    // If URL doesn't have any params, we check the local storage for them and set them in the params.
    const storedFilters = loadFilters(VEHICLE_MODEL_FILTERS_KEY);

    if (storedFilters) {
      setSearchParams((prevParams) => {
        /* Had to use newParams because prevParams wasn't working as expected */
        const newParams = new URLSearchParams(prevParams.toString());

        if (!newParams.get('page') && storedFilters?.page) {
          newParams.set('page', storedFilters.page);
        }
        if (!newParams.get('sortBy') && storedFilters?.sortBy) {
          newParams.set('sortBy', storedFilters.sortBy);
          setSortBy(storedFilters.sortBy);
        }
        if (!newParams.get('filterByInput') && storedFilters?.filterByInput) {
          newParams.set('filterByInput', storedFilters.filterByInput);
          setUserFilter(storedFilters.filterByInput);
        }

        if (!newParams.get('filterBySelect') && storedFilters?.filterBySelect) {
          newParams.set('filterBySelect', storedFilters.filterBySelect);
          setSelectFilter(storedFilters.filterBySelect);
        }

        return newParams;
      });
    }
  }, []);

  /* useEffect - localStorage logic  */

  useEffect(() => {
    const currentFilters = {
      sortBy: searchParams.get('sortBy') ?? undefined,
      filterByInput: searchParams.get('filterByInput') ?? undefined,
      filterBySelect: searchParams.get('filterBySelect') ?? undefined,
      page: searchParams.get('page') ?? undefined,
    };

    saveFilters(VEHICLE_MODEL_FILTERS_KEY, currentFilters);
  }, [searchParams]);

  /* SORTING - the sorting implemented is by vehicle make and model based on the
  URL search params. There are 5 different values that can be assigned in the params */

  /* useEffect - Debounced Input Filter */

  useEffect(() => {
    /* Since we are using Redux Toolkit Query, we do not need abort controller */
    const debounceTimeout = setTimeout(() => {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams.toString());

        // Reset page only if filter value changed
        if (
          (userFilter || undefined) !==
          (newParams.get('filterByInput') || undefined)
        ) {
          newParams.set('page', '1');
        }

        if (userFilter) {
          newParams.set('filterByInput', userFilter);
        } else {
          newParams.delete('filterByInput');
        }

        /* sortBy and selectFilter is not in the dependency array because this shouldn't
        re-render on change. We set this manually because if we have sortBy in 
        localStorage and we want to move for example from:
        http://localhost:5173/models?page=1&filterBy=a&sortBy=name-desc
        to
        http://localhost:5173/models
        
        Local storage will not retain the sort parameter and we will lose it.
        */
        if (sortBy) {
          newParams.set('sortBy', sortBy);
        }

        if (selectFilter) {
          newParams.set('filterBySelect', selectFilter);
        }

        return newParams;
      });
    }, 300);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [userFilter]);

  const { data: vehicleModelsByMake = [] } = useGetVehicleMakeNamesQuery();

  if (isLoading) {
    return <LoadingSpinner text="Loading models" />;
  }

  return (
    <>
      <Container $width="50%" $direction="column">
        {vehicleModelsByMake?.length > 0 && (
          <>
            {/* User input field */}
            <FormInput
              placeholder="Search for a vehicle model"
              value={userFilter}
              onChange={(event) => handleFilterInputChange(event)}
            />
            {/* Filter by select field with mapped options of vehicle models */}
            <StyledSelect
              onChange={(event) => handleFilterSelectChange(event)}
              value={selectFilter}
            >
              {vehicleModelsByMake?.map((make) => (
                <StyledOption key={make.name} value={make.name}>
                  {make.name}
                </StyledOption>
              ))}
            </StyledSelect>
          </>
        )}

        {/* Sort by select field with mapped options of ascending and descending */}
        <StyledSelect
          onChange={(event) => handleSortChange(event)}
          value={sortBy}
        >
          {sortModelTemplate.map((option) => {
            return (
              <StyledOption key={option.value} value={option.value}>
                {option.label}
              </StyledOption>
            );
          })}
        </StyledSelect>
      </Container>
      {/* Results grid */}
      {vehicleModels?.length > 0 && (
        <>
          <VehicleGrid>
            {vehicleModels?.map((model) => (
              <StyledVehicleGridCompound.Card
                key={model.id}
                to={`/vehicle/model/${model.id}`}
              >
                <StyledVehicleGridCompound.Content>
                  <StyledVehicleGridCompound.Title>
                    {model.carMaker}
                  </StyledVehicleGridCompound.Title>
                  <StyledVehicleGridCompound.Subtitle>
                    {model.name}
                  </StyledVehicleGridCompound.Subtitle>
                  <StyledVehicleGridCompound.Details>
                    {model.abrv}
                  </StyledVehicleGridCompound.Details>
                </StyledVehicleGridCompound.Content>
              </StyledVehicleGridCompound.Card>
            ))}
          </VehicleGrid>
          {/* Commented out because not in use and expects additional params */}
          {/* <Pagination totalVehicles={count} /> */}
        </>
      )}

      {vehicleModels?.length === 0 && (
        <p style={{ textAlign: 'center' }}>No models found</p>
      )}
    </>
  );
}

export default VehicleModel;
