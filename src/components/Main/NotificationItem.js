import React from 'react'
import styled from 'styled-components'
import ProfileImg from '../Profile/ProfileImg'
import UserId from '../User/UserId'
import Button from '../Common/Button'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`

const UserDetail = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`

const UserDesc = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Text = styled.div`
  display: flex;
  gap: 4px;
`;

const NotificationItem = ({type, feedbackUser, userNickName, url, comment}) => {

  return (
    <Wrapper>
      <UserDetail>
        <ProfileImg size={50} url={url} hover={"noHover"}/>
        <UserDesc>
        <Text>
          {feedbackUser} 님이 {type === "like" ? "회원님의 게시물을 좋아합니다." : type === "follow" ? "회원님을 팔로우하기 시작했습니다." : `댓글을 남겼습니다. ${<span>{userNickName}</span>} ${comment}}`}
          </Text>
        </UserDesc>
      </UserDetail>
    </Wrapper>
  )
};

export default NotificationItem;