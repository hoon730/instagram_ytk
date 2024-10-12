import { AiOutlineHome } from "react-icons/ai";
import { FaRegCompass } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa6";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegSquarePlus } from "react-icons/fa6";

import { FaGear } from "react-icons/fa6";
import { BsThreads } from "react-icons/bs";
import { LuSunMedium } from "react-icons/lu";

import { RxMagnifyingGlass } from "react-icons/rx";

export const getFormattedDate = (targetDate) => {
  const year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if (month < 10) month = `0${month}`;
  if (date < 10) date = `0${date}`;

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
    name: "메시지",
    iconCode: <IoPaperPlaneOutline />,
  },
  {
    id: 3,
    name: "만들기",
    iconCode: <FaRegSquarePlus />,
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
    iconCode: "",
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
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
  exits: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
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

export const scale = {
  initial: {
    opacity: 0,
    scale: 0.7,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  exits: {
    opacity: 0,
    scale: 0.7,
    transition: {
      duration: 0.3,
    },
  },
};
