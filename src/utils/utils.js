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
    id: 1,
    name: "홈",
    iconCode: <AiOutlineHome />,
    path: "/",
  },
  {
    id: 2,
    name: "탐색",
    iconCode: <FaRegCompass />,
  },
  {
    id: 3,
    name: "릴스",
    iconCode: <BiMoviePlay />,
  },
  {
    id: 4,
    name: "저장됨",
    iconCode: <FaRegBookmark />,
    path: "/detail",
  },
  {
    id: 5,
    name: "메시지",
    iconCode: <IoPaperPlaneOutline />,
  },
  {
    id: 6,
    name: "만들기",
    iconCode: <FaRegSquarePlus />,
    // path: "/new",
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
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  exits: {
    opacity: 0,
    scale: 0.5,
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
