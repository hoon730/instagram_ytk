import React from "react";

const ShowStory = () => {
  return (
    <Wrapper>
      <StoryHead>
        1분 표시해주는 바, 유저이름, 시간, 미디어 내용(음악이면 가수, 제목
        표시), 일시정지버튼, 재생버튼, ...(삭제취소)
      </StoryHead>
      <Story>스토리내용</Story>
      <Viewers>누가 몇명이 봤는지</Viewers>
    </Wrapper>
  );
};

export default ShowStory;
