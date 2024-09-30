import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 305px;
  height: 65px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: var(--border-radius-12);

  &.active {
    background: var(--font-black-color);
    color: var(--bg-white-color);
    font-weight: var(--font-bold);
  }

  &:hover {
    color: var(--gray-color);
  }
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  svg {
    font-size: 20px;
  }
`;
const MenuText = styled.span`
  font-size: 20px;
`;

const MenuItem = ({ name, iconCode, path, isActive, setIsActive, onClick }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (path) navigate(`${path}`);
    setIsActive(false);
  };

  const showNew = () => {
    if (name === "만들기") onClick();
  };

  return (
    <Wrapper
      className={isActive ? "active" : ""}
      onClick={() => {
        handleOnClick();
        showNew();
      }}
    >
      <IconWrapper>{iconCode}</IconWrapper>
      <MenuText>{name}</MenuText>
    </Wrapper>
  );
};

export default MenuItem;
