import { AiOutlineHome } from "react-icons/ai";
import { FaRegCompass } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegSquarePlus } from "react-icons/fa6";

import { FaGear } from "react-icons/fa6";
import { BsThreads } from "react-icons/bs";
import { LuSunMedium } from "react-icons/lu";

import { BsHeart } from "react-icons/bs";
import { RxMagnifyingGlass } from "react-icons/rx";
import ProfileImg from "../components/Profile/ProfileImg";

export const getFormattedDate = (targetDate) => {
  const year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  month = month < 10 ? `0${month}` : month;
  date = date < 10 ? `0${date}` : date;

  return `${year}-${month}-${date}`;
};

export const menuData = [
  {
    id: 0,
    name: "홈",
    iconCode: <AiOutlineHome />,
    path: "/",
  },
  {
    id: 1,
    name: "탐색",
    iconCode: <FaRegCompass />,
  },
  {
    id: 2,
    name: "릴스",
    iconCode: <BiMoviePlay />,
  },
  {
    id: 3,
    name: "저장됨",
    iconCode: <FaRegBookmark />,
    path: "/detail",
  },
  {
    id: 4,
    name: "메시지",
    iconCode: <IoPaperPlaneOutline />,
  },
  {
    id: 5,
    name: "만들기",
    iconCode: <FaRegSquarePlus />,
    // path: "/new",
  },
];

export const mbMenuData = [
  {
    id: 0,
    name: "홈",
    iconCode: <AiOutlineHome />,
    path: "/",
  },
  {
    id: 1,
    name: "검색",
    iconCode: <RxMagnifyingGlass />,
  },
  {
    id: 2,
    name: "만들기",
    iconCode: <FaRegSquarePlus />,
    path: "/new",
  },
  {
    id: 3,
    name: "릴스",
    iconCode: <BiMoviePlay />,
  },
  {
    id: 4,
    name: "마이 프로필",
    iconCode: (
      <ProfileImg
        size={"38"}
        url={"/images/userImgs/user123456/feedDetail.jpg"}
      />
    ),
    path: "/detail",
  },
];

export const toolData = [
  {
    id: 1,
    name: "setting",
    iconCode: <FaGear />,
  },
  {
    id: 2,
    name: "thread",
    iconCode: <BsThreads />,
  },
  {
    id: 3,
    name: "day",
    iconCode: <LuSunMedium />,
  },
];

export const mouseon = {
  initial: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exits: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
    },
  },
};

export const click = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exits: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const slide = {
  initial: (back) => ({
    x: back ? -800 : 800,
  }),
  visible: {
    x: 0,
    transition: {
      type: "tween",
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1],
    },
  },
  exit: (back) => ({
    x: back ? 800 : -800,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  }),
};
