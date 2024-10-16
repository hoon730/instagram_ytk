import React, { useContext } from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import Button from "../Common/Button";
import { motion, AnimatePresence } from "framer-motion";
import { mouseon } from "../../utils/utils";
import { StateContext } from "../../App";

const Wrapper = styled(motion.div)`
  padding: 20px 15px;
  overflow: hidden;
  padding-bottom: 0;
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
  justify-content: space-between;
  align-items: center;
  padding: 10px 25px;
  border: 2px solid var(--light-gray-color);
  border-radius: var(--border-radius-8);
`;
const Id = styled.span`
  font-size: var(--font-12);
  font-weight: var(--font-bold);
  padding-bottom: 5px;
`;
const Desc = styled.p`
  width: 74px;
  padding-bottom: 8px;
  text-align: center;
  font-size: var(--font-10);
`;

const MbRecommend = () => {
  const { myProfile } = useContext(StateContext);
  const { allProfile } = useContext(StateContext);

  const allProfileUids = allProfile?.map((profile) => profile.uid);
  const followerRecommended = allProfileUids?.filter(
    (allUids) => !myProfile.following.includes(allUids)
  );

  const followersProfile = allProfile.filter((profile) =>
    followerRecommended.includes(profile.uid)
  );

  console.log(followersProfile);

  return (
    <AnimatePresence>
      <Wrapper
        variants={mouseon}
        initial="initial"
        animate="visible"
        exit="exits"
      >
        <Title>회원님을 위한 추천</Title>
        <RecommendList
          drag="x"
          dragConstraints={{ left: -300, right: 0 }}
          whileTap={{ cursor: "grabbing" }}
          onDragEnd={(event, info) => {
            if (info.point.x < -300) {
            } else if (info.point.x > 0) {
            }
          }}
        >
          {followersProfile.map((profile, idx) => (
            <RecommendItem key={idx}>
              <ProfileImg size={"75"} url={profile.profilePhoto} hover={true} />
              <Id>{profile.userName}</Id>
              <Desc>{profile.userId}님이 팔로우 합니다</Desc>
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
