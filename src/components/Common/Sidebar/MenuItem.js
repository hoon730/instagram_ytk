import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 65px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: var(--border-radius-12);

  &.active {
    background: ${({ theme }) => theme.fontColor};
    color: ${({ theme }) => theme.bgColor};
    font-weight: var(--font-bold);
  }

  &:hover {
    color: var(--gray-color);
  }

  @media screen and (max-width: 1024px) {
    width: 55px;
    height: 55px;
    padding-left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      display: none;
    }
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

  console.log(isActive, setIsActive);

  return (
    <Wrapper
      className={isActive ? "active" : ""}
      onClick={() => {
        handleOnClick();
        showNew();
      }}
    >
      <IconWrapper>{iconCode}</IconWrapper>
      <MenuText className="text">{name}</MenuText>
    </Wrapper>
  );
};

export default MenuItem;
