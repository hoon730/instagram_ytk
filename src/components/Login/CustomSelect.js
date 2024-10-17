import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import React from "react";

const colors = {
  sub2: "#6228D7",
  warning: "#FF5C2B",
  lightGray: "#EEEEEE",
  gray: "#BFBFBF",
  darkGray: "#7E7E7E",
  font: "#2B2B2B",
  bgLight: "#ffffff",
};

const SelectContainer = styled.div`
  position: relative;
  width: fit-content;
`;

const SelectedOption = styled.div`
  display: flex;
  color: ${colors.darkGray};
  gap: 5px;
  padding-right: 10px;
  cursor: pointer;
`;

const Dropdown = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 47px;
  left: -13px;
  width: fit-content;
  background-color: white;
  border: 1px solid ${colors.gray};
  border-radius: 5px;
  z-index: 10;
  max-height: 180px;
  overflow-y: auto;
  @media (max-width: 370px) {
    top: auto;
    bottom: 45px;
  }
`;

const DropdownOption = styled.li`
  background-color: ${(props) =>
    props.isHovered
      ? colors.lightGray
      : props.isSelected
      ? colors.lightGray
      : "transparent"};
  color: ${colors.darkGray};
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.lightGray};
  }
`;
const CustomSelect = React.forwardRef(
  (
    {
      options,
      selectedOption,
      onOptionSelect,
      isDropdownOpen,
      toggleDropdown,
      handleOptionHover,
      hoveredOption,
    },
    ref
  ) => {
    return (
      <SelectContainer>
        <SelectedOption
          ref={ref}
          className="dropdown-toggle"
          onClick={toggleDropdown}
        >
          {selectedOption.code} <IoIosArrowDown />
        </SelectedOption>
        {isDropdownOpen && (
          <Dropdown>
            {options.map((option, index) => (
              <DropdownOption
                key={index}
                onClick={() => onOptionSelect(option)}
                onMouseEnter={() => handleOptionHover(option)}
                isHovered={hoveredOption && option.name === hoveredOption.name}
                isSelected={selectedOption.name === option.name}
              >
                {option.name}
              </DropdownOption>
            ))}
          </Dropdown>
        )}
      </SelectContainer>
    );
  }
);

export default CustomSelect;
