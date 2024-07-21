import React from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// Filters component that accepts genres, filter state, and handleFilterChange function as props
const Filters = ({ genres, filter, handleFilterChange }) => {
  return (
    <Sidebar>
      <SidebarTitle>Filters</SidebarTitle>
      <FilterContainer>
        {/* Filter for searching by category */}
        <FilterGroup>
          <Label htmlFor="category">Search:</Label>
          <Input
            type="text"
            id="category"
            placeholder="Artist, Title, Year, Genre"
            // Call handleFilterChange when the input value changes
            onChange={(e) => handleFilterChange('category', e.target.value)}
          />
        </FilterGroup>
        
        {/* Filter for selecting a genre */}
        <FilterGroup>
          <Label htmlFor="genre">Genre:</Label>
          <Select id="genre" onChange={(e) => handleFilterChange('genre', e.target.value)}>
            {/* Default option to show all genres */}
            <Option value="">All</Option>
            {/* Dynamically generate genre options from the genres array */}
            {genres.map((genre) => (
              <Option key={genre} value={genre}>{genre}</Option>
            ))}
          </Select>
        </FilterGroup>
        
        {/* Filter for selecting a price range using a slider */}
        <FilterGroup>
          <Label>Price:</Label>
          <Slider
            range
            min={0}
            max={50}
            defaultValue={[0, 50]}
            // Call handleFilterChange when the slider value changes
            onChange={(value) => handleFilterChange('price', value)}
            trackStyle={{ backgroundColor: 'red' }}
            handleStyle={{ borderColor: 'red' }}
          />
          {/* Display the selected price range */}
          <PriceRange>{`$${filter.price[0]} - $${filter.price[1]}`}</PriceRange>
        </FilterGroup>
      </FilterContainer>
    </Sidebar>
  );
};

export default Filters;

// Styled-components for styling the filter component
const Sidebar = styled.aside`
  padding: 20px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  font-size: 20px;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const SidebarTitle = styled.h2`
  color: white;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterGroup = styled.div`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    margin-bottom: 10px;
    max-width: 100%;
  }

  label {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: white;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: white;

  @media (max-width: 768px) {
    margin-bottom: 8px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    margin-bottom: 5px;
    font-size: 12px;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 12px;
  }
`;

const Option = styled.option``;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 12px;
  }
`;

const PriceRange = styled.div`
  margin-top: 10px;
  color: white;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
