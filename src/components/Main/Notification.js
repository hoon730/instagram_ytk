import React from 'react'
import styled from 'styled-components'
import NotificationItem from './NotificationItem';

const Wrapper = styled.div`
  width: 380px;
  padding: 20px 20px;
  position: absolute;
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  background: ${({ theme }) => theme.bgColor};
  box-shadow: 0 5px 6px ${({ theme }) => theme.shadowAlpha};
  margin-top: 45px;
  z-index: 1;
`;

const Notification = () => {
  return (
    <Wrapper><NotificationItem type={"like"} userNickName={"lotte_ria"}/></Wrapper>
  )
}

export default Notification