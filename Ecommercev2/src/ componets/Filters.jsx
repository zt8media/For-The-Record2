import React from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Filters = ({ genres, filter, handleFilterChange }) => {
  return (
    <Sidebar>
      <SidebarTitle>Filters</SidebarTitle>
      <FilterContainer>
        <FilterGroup>
          <Label htmlFor="category">Search:</Label>
          <Input
            type="text"
            id="category"
            placeholder="Artist, Title, Year, Genre"
            onChange={(e) => handleFilterChange('category', e.target.value)}
          />
        </FilterGroup>
        <FilterGroup>
          <Label htmlFor="genre">Genre:</Label>
          <Select id="genre" onChange={(e) => handleFilterChange('genre', e.target.value)}>
            <Option value="">All</Option>
            {genres.map((genre) => (
              <Option key={genre} value={genre}>{genre}</Option>
            ))}
          </Select>
        </FilterGroup>
        <FilterGroup>
          <Label>Price:</Label>
          <Slider
            range
            min={0}
            max={50}
            defaultValue={[0, 50]}
            onChange={(value) => handleFilterChange('price', value)}
            trackStyle={{ backgroundColor: 'red' }}
            handleStyle={{ borderColor: 'red' }}
          />
          <PriceRange>{`$${filter.price[0]} - $${filter.price[1]}`}</PriceRange>
        </FilterGroup>
      </FilterContainer>
    </Sidebar>
  );
};

export default Filters;

const Sidebar = styled.aside`
  width: 100%;
  max-width: 100vh;
  height:100vh;
  padding: 20px;
  background-color: transparent;
  border:solid red 2px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  font-size:20px;

  @media (max-width: 768px) {
   height:35vh;
   padding:10px;

  }
`;

const SidebarTitle = styled.h2`
  color: white;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: white;
  }

  input[type="checkbox"] {
    margin-right: 10px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    vertical-align: middle;
    cursor: pointer;
    border: 1px solid #ccc;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: white;
  }

  input[type="checkbox"]:checked {
    background-color: rgb(215,70,51);
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M20.292 5.292a1 1 0 0 1 0 1.414l-11 11a1 1 0 0 1-1.414 0l-5-5a 1 1 0 1 1 1.414-1.414L9 15.586l10.292-10.293a1 1 0 0 1 1.414 0z"/></svg>');
    background-position: center;
    background-repeat: no-repeat;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: white;
  font-size:20px;
`;

const Select = styled.select`
  width: 94%;
  padding: 25px;
  border-radius: 5px;
  font-size:20px
  @media (max-width: 768px) {
   padding:15px;
   font-size:10px;
   }
`;

const Option = styled.option``;

const Input = styled.input`
  width: 80%;
  padding: 25px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size:20px;
  @media (max-width: 768px) {
    padding:15px;
 
    }
`;

const PriceRange = styled.div`
  margin-top: 10px;
  color: white;
`;
