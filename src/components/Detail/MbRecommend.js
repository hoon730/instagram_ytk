import React from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import Button from "../Common/Button";
import { motion, AnimatePresence } from "framer-motion";
import { mouseon } from "../../utils/utils";

const Wrapper = styled(motion.div)`
  padding: 16px;
  overflow: hidden;
  padding-top: 0;
`;
const Title = styled.h3`
  font-size: var(--font-14);
  font-weight: var(--font-bold);
  padding-bottom: 13px;
`;
const RecommendList = styled(motion.div)`
  display: flex;
  gap: 7px;
`;

const RecommendItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 25px;
  border: 2px solid var(--light-gray-color);
  border-radius: var(--border-radius-8);
`;
const Id = styled.span`
  font-size: var(--font-14);
  font-weight: var(--font-bold);
`;
const Desc = styled.p`
  width: 74px;
  padding-bottom: 8px;
  text-align: center;
  font-size: var(--font-10);
`;

const userData = [
  {
    id: 0,
    userNickName: "melina02",
    desc: "hk_morgan",
    imgPath: "/images/userImgs/user123456/followed_1.jpg",
  },
  {
    id: 1,
    userNickName: "big_sean",
    desc: "mk_kim02",
    imgPath: "/images/userImgs/user123456/followed_2.jpg",
  },
  {
    id: 2,
    userNickName: "westside",
    desc: "marcell",
    imgPath: "/images/userImgs/user123456/followed_3.jpg",
  },
  {
    id: 3,
    userNickName: "fabianluiz",
    desc: "iker_monza",
    imgPath: "/images/userImgs/user123456/followed_4.jpg",
  },
  {
    id: 4,
    userNickName: "inner_v",
    desc: "peace",
    imgPath: "/images/userImgs/user123456/followed_5.jpg",
  },
];

const MbRecommend = () => {
  return (
    <AnimatePresence>
      <Wrapper
        variants={mouseon}
        initial="initial"
        animate="visible"
        exit="exits"
      >
        <Title>회원님을 위한 추천</Title>
        <RecommendList drag="x" dragSnapToOrigin>
          {userData.map((it, idx) => (
            <RecommendItem key={idx}>
              <ProfileImg size={"75"} url={it.imgPath} hover={true} />
              <Id>{it.userNickName}</Id>
              <Desc>{it.desc}님이 팔로우 합니다</Desc>
              <Button
                width={"80px"}
                height={"30px"}
                fontSize={"14"}
                type={"positive"}
                text={"팔로우"}
              />
            </RecommendItem>
          ))}
        </RecommendList>
      </Wrapper>
    </AnimatePresence>
  );
};

export default MbRecommend;
