import { useSearchParams } from 'react-router';
import { useEffect, useState, type ChangeEvent } from 'react';

import { useGetVehicleMakesQuery } from '../store/vehicleApiSlice';

import StyledVehicleGridCompound from '../components/layout/StyledVehicleGrid';
import VehicleGrid from '../components/layout/VehicleGrid';
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner';
// import Pagination from '../components/UI/Pagination/Pagination';
import { StyledOption, StyledSelect } from '../components/UI/Inputs/FormSelect';

import { sortMakeTemplate } from '../utils/formTemplates/sortFilterTemplates';
import FormInput from '../components/UI/Inputs/FormInput';
import Container from '../components/UI/Container/Container';
import {
  loadFilters,
  saveFilters,
  VEHICLE_MAKE_FILTERS_KEY,
} from '../utils/localStorage/FilterState';

/* This version is not in use because in the newer version we eliminated the
 useEffect for setting initial state because it ended up causing issues in returning to
 the page while using the application */

function VehicleMake() {
  /* COMPONENT STATE */
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<string | undefined>(
    searchParams.get('sortBy') ?? undefined,
  );
  const [userFilter, setUserFilter] = useState<string | undefined>(
    searchParams.get('filterBy') ?? '',
  );

  /* API QUERIES */

  /* We destructure the query so that we have direct access to VehicleMakes Array */
  const { data: { items: vehicleMakes } = { items: [], count: 0 }, isLoading } =
    useGetVehicleMakesQuery({
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      sortBy: searchParams.get('sortBy') ?? undefined,
      filterByInput: searchParams.get('filterBy') ?? undefined,
    });

  /* EVENT HANDLERS */
  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserFilter(value);
  };

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

  /* We will try to get the filter and sort params with a fallback to local storage and
   to default values. They will also be utilized in comparisons.
   */

  /* FILTERING - here we will only implement the filter logic based on user
  input because we want to filter the vehicle makes by their name or abbreviation
  */

  /* Here we are handling the input as a controlled element so that we can later
  on debounce the input */

  /* This useEffect only runs on mount and sets up the Params */

  /* useEffect - Mount logic */

  useEffect(() => {
    // If URL doesn't have any params, we check the local storage for them and set them in the params.
    const storedFilters = loadFilters(VEHICLE_MAKE_FILTERS_KEY);

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
        if (!newParams.get('filterBy') && storedFilters?.filterBy) {
          newParams.set('filterBy', storedFilters.filterBy);
          setUserFilter(storedFilters.filterBy);
        }

        return newParams;
      });
    }
  }, []);

  /* useEffect - localStorage logic */

  /* This useEffect saves data into the local storage upon params change */

  useEffect(() => {
    const currentFilters = {
      sortBy: searchParams.get('sortBy') ?? undefined,
      filterBy: searchParams.get('filterBy') ?? undefined,
      page: searchParams.get('page') ?? undefined,
    };

    saveFilters(VEHICLE_MAKE_FILTERS_KEY, currentFilters);
  }, [searchParams]);

  /* useEffect - Debounced Input Filter */

  useEffect(() => {
    /* Since we are using Redux Toolkit Query, we do not need abort controller */
    const debounceTimeout = setTimeout(() => {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams.toString());

        if (
          (userFilter || undefined) !== (newParams.get('filterBy') || undefined)
        ) {
          newParams.set('page', '1');
        }

        if (userFilter) {
          newParams.set('filterBy', userFilter);
        } else {
          newParams.delete('filterBy');
        }

        /* sortBy is not in the dependency array because this shouldn't re-render on change.
        We set this manually because if we have sortBy in localStorage and we want to move
        for example from:
        http://localhost:5173/makes?page=1&filterBy=a&sortBy=name-desc
        to
        http://localhost:5173/makes
        
        Local storage will not retain the sort parameter and we will lose it.
        */
        if (sortBy) {
          newParams.set('sortBy', sortBy);
        }

        return newParams;
      });
    }, 300);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [userFilter]);

  /* SORTING - is simple because it only makes sense to sort by one field.
  Here we use nullish because searchParams can return a value or null
  */

  if (isLoading) {
    return <LoadingSpinner text="Loading models" />;
  }

  return (
    <>
      <Container
        $width="50%"
        $justify="space-between"
        $gap="2rem"
        $align="center"
      >
        {/* User input field */}
        <FormInput
          placeholder="Filter by name or abbreviation"
          value={userFilter}
          onChange={(event) => handleFilterChange(event)}
        />

        {/* Sort by select field with mapped options */}
        <StyledSelect
          onChange={(event) => handleSortChange(event)}
          value={sortBy}
        >
          {sortMakeTemplate.map((option) => {
            return (
              <StyledOption key={option.value} value={option.value}>
                {option.label}
              </StyledOption>
            );
          })}
        </StyledSelect>
      </Container>

      {/* Results grid */}
      {vehicleMakes?.length > 0 && (
        <>
          <VehicleGrid>
            {vehicleMakes?.map((make) => (
              <StyledVehicleGridCompound.Card
                key={make.id}
                to={`/vehicle/make/${make.id}`}
              >
                <StyledVehicleGridCompound.Content>
                  <StyledVehicleGridCompound.Title>
                    {make.name}
                  </StyledVehicleGridCompound.Title>
                  <StyledVehicleGridCompound.Subtitle>
                    {make.abrv}
                  </StyledVehicleGridCompound.Subtitle>
                </StyledVehicleGridCompound.Content>
              </StyledVehicleGridCompound.Card>
            ))}
          </VehicleGrid>
          {/* Commented out because not in use and expects additional params */}

          {/* <Pagination totalVehicles={count} />{' '} */}
        </>
      )}

      {vehicleMakes?.length === 0 && (
        <p style={{ textAlign: 'center' }}>No makes found</p>
      )}
    </>
  );
}

export default VehicleMake;
