import React from "react";
import styled from "styled-components";
import StoryHeader from "../components/Story/StoryHeader";
import ClickStory from "../components/Story/ClickStory";

const Wrapper = styled.div``;

const StoryHead = styled.div``;

const Story = styled.div``;

const Viewers = styled.div``;

const ShowStory = () => {
  return (
    <Wrapper>
      <StoryHeader>
        1분 표시해주는 바, 유저이름, 시간, 일시정지버튼, 재생버튼, ...(삭제취소)
      </StoryHeader>
      <Story>
        <ClickStory />
      </Story>
      <Viewers>누가 몇명이 봤는지</Viewers>
    </Wrapper>
  );
};

export default ShowStory;
