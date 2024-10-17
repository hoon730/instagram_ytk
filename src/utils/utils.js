import { AiOutlineHome } from "react-icons/ai";
import { FaRegCompass } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { LuBookmark } from "react-icons/lu";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegSquarePlus } from "react-icons/fa6";

import { FaGear } from "react-icons/fa6";
import { BsThreads } from "react-icons/bs";
import { LuSunMedium } from "react-icons/lu";
import { GoBookmark } from "react-icons/go";
import { PiSirenLight } from "react-icons/pi";
import { LuArrowRightLeft } from "react-icons/lu";
import { TbArrowRightFromArc } from "react-icons/tb";

import { RxMagnifyingGlass } from "react-icons/rx";

export const getFormattedDate = (targetDate) => {
  const year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if (month < 10) month = `0${month}`;
  if (date < 10) date = `0${date}`;

  return `${year}-${month}-${date}`;
};

export const extractExtension = (value) => {
  const firstSplit = value.split("?");
  const secondSplit = firstSplit[0].split(".");
  return secondSplit[secondSplit.length - 1].toLowerCase();
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
    path: "/explore",
  },
  {
    id: 2,
    name: "릴스",
    iconCode: <BiMoviePlay />,
    path: "/reels",
  },
  {
    id: 3,
    name: "저장됨",
    iconCode: <LuBookmark />,
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
    path: "/explore",
  },
  {
    id: 2,
    name: "만들기",
    iconCode: <FaRegSquarePlus />,
  },
  {
    id: 3,
    name: "릴스",
    iconCode: <BiMoviePlay />,
    path: "/reels",
  },
  {
    id: 4,
    name: "마이 프로필",
    iconCode: "",
    path: "/profile",
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

export const mobileHeaderMenu = [
  {
    id: 1,
    name: "저장됨",
    iconCode: <GoBookmark />,
  },
  {
    id: 2,
    name: "문제 신고",
    iconCode: <PiSirenLight />,
  },
  {
    id: 3,
    className: "setting",
    name: "설정",
    iconCode: <FaGear />,
  },
  {
    id: 4,
    className: "auth",
    name: "계정 전환",
    iconCode: <LuArrowRightLeft />,
  },
  {
    id: 5,
    className: "logout",
    name: "로그아웃",
    iconCode: <TbArrowRightFromArc />,
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
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  exits: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3,
    },
  },
};

export const videoArr = [
  "mp4",
  "avi",
  "mkv",
  "mov",
  "wmv",
  "flv",
  "webm",
  "m4v",
  "3gp",
  "ogv",
  "m2ts",
  "mts",
  "vob",
  "rmvb",
  "divx",
  "f4v",
  "asf",
  "swf",
  "mxf",
  "dv",
  "ts",
];

export const dontReady = () => {
  alert("준비 중인 기능입니다.");
};
