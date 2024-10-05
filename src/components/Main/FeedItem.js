import React, { useState } from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";

const profile = [
  {
    userId: "lualbvqvQmVWkfDU7JUKJRYdqf3",
    userName: "승Ahhh",
    gender: "woman",
    introduction: "🌸 일상의 작은 행복을 찾는 중, 나만의 스토리 기록하기",
    website: "",
    recommendation: true,
    nondisclosure: false,
    profilePhoto: "/images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/profile.jpg",
    bgPhoto: "/images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/bg.jpg",
    follower: [
      "KWUUuqMImhcKDZ822gc2InH4vSN",
      "VA2MxTOE2O9mN4nVQy4Fw2glB2h",
      "wAKs9uXSWsTJbbJGg2MaErFaKqE",
      "4JhKn3cYHd9dY9muGz1oXiJAruo",
      "EnweBLflxt3pYRGLy8hfJ18MeOm",
      "UtcsfzZbJYxJ0qzD6P6nvqXGFM1",
      "FNUEoSKu7equPIpWvLcKumRz7Pc",
      "Rwkuz4I5TDjog8sfK3rzUCI4Ik6",
      "kdGgFnRk8TyyUVeXQji7vZybpQ1",
      "hCTuFAf5A87ZG7mhWx1poHaNF3Q",
      "BbVEQf8MoEuxL7XREuCVTjUQkSx",
      "z7UhehujghvKX02fUj1ig9gfP7n",
      "vmgb4hOLWStnp2SZwwjMSw29A9i",
      "0aDoIgvbfsQYBX20nWRnuOkNrNh",
      "bIqUJE0DxQa1HdkLfMqh105VOrQ",
    ],
    following: [
      "VA2MxTOE2O9mN4nVQy4Fw2glB2h",
      "4JhKn3cYHd9dY9muGz1oXiJAruo",
      "EnweBLflxt3pYRGLy8hfJ18MeOm",
      "UtcsfzZbJYxJ0qzD6P6nvqXGFM1",
      "FNUEoSKu7equPIpWvLcKumRz7Pc",
      "Rwkuz4I5TDjog8sfK3rzUCI4Ik6",
      "kdGgFnRk8TyyUVeXQji7vZybpQ1",
      "hCTuFAf5A87ZG7mhWx1poHaNF3Q",
      "BbVEQf8MoEuxL7XREuCVTjUQkSx",
      "z7UhehujghvKX02fUj1ig9gfP7n",
      "vmgb4hOLWStnp2SZwwjMSw29A9i",
      "0aDoIgvbfsQYBX20nWRnuOkNrNh",
      "bIqUJE0DxQa1HdkLfMqh105VOrQ",
      "Af4BexYzzRIvqtGjSeYEG3pqZHw",
      "0kW30ovXTfTAwBRyTzHKGvqG398",
      "tePhQ1wQJAwRlEcw1TOWpE4N9JU",
      "1JaMETkLKPzcOLuDpbmRoTpKbgt",
    ],
  },
  {
    userId: "KWUUuqMImhcKDZ822gc2InH4vSN",
    userName: "쏘윤",
    gender: "woman",
    introduction: "✨ 꿈꾸는 소녀, 삶의 아름다움을 함께 나눠요",
    website: "",
    recommendation: false,
    nondisclosure: false,
    profilePhoto: "/images/userImgs/KWUUuqMImhcKDZ822gc2InH4vSN",
    bgPhoto: "/images/userImgs/KWUUuqMImhcKDZ822gc2InH4vSN",
    follower: [
      "VA2MxTOE2O9mN4nVQy4Fw2glB2h",
      "wAKs9uXSWsTJbbJGg2MaErFaKqE",
      "4JhKn3cYHd9dY9muGz1oXiJAruo",
      "EnweBLflxt3pYRGLy8hfJ18MeOm",
      "UtcsfzZbJYxJ0qzD6P6nvqXGFM1",
      "FNUEoSKu7equPIpWvLcKumRz7Pc",
      "Rwkuz4I5TDjog8sfK3rzUCI4Ik6",
      "kdGgFnRk8TyyUVeXQji7vZybpQ1",
      "hCTuFAf5A87ZG7mhWx1poHaNF3Q",
      "BbVEQf8MoEuxL7XREuCVTjUQkSx",
      "z7UhehujghvKX02fUj1ig9gfP7n",
      "vmgb4hOLWStnp2SZwwjMSw29A9i",
      "0aDoIgvbfsQYBX20nWRnuOkNrNh",
      "bIqUJE0DxQa1HdkLfMqh105VOrQ",
      "Af4BexYzzRIvqtGjSeYEG3pqZHw",
    ],
    following: [
      "lualbvqvQmVWkfDU7JUKJRYdqf3",
      "VA2MxTOE2O9mN4nVQy4Fw2glB2h",
      "wAKs9uXSWsTJbbJGg2MaErFaKqE",
      "4JhKn3cYHd9dY9muGz1oXiJAruo",
      "EnweBLflxt3pYRGLy8hfJ18MeOm",
      "UtcsfzZbJYxJ0qzD6P6nvqXGFM1",
      "FNUEoSKu7equPIpWvLcKumRz7Pc",
      "Rwkuz4I5TDjog8sfK3rzUCI4Ik6",
      "kdGgFnRk8TyyUVeXQji7vZybpQ1",
      "hCTuFAf5A87ZG7mhWx1poHaNF3Q",
      "BbVEQf8MoEuxL7XREuCVTjUQkSx",
      "z7UhehujghvKX02fUj1ig9gfP7n",
      "vmgb4hOLWStnp2SZwwjMSw29A9i",
      "0aDoIgvbfsQYBX20nWRnuOkNrNh",
      "bIqUJE0DxQa1HdkLfMqh105VOrQ",
      "Af4BexYzzRIvqtGjSeYEG3pqZHw",
      "0kW30ovXTfTAwBRyTzHKGvqG398",
      "tePhQ1wQJAwRlEcw1TOWpE4N9JU",
      "1JaMETkLKPzcOLuDpbmRoTpKbgt",
    ],
  },
];

const feed = [
  {
    userId: "lualbvqvQmVWkfDU7JUKJRYdqf3",
    feedId: "fd00000001",
    createDate: "2024-10-06",
    type: "img",
    imgPath: ["images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed1.jpg"],
    content:
      "#브런치 먹으러 다녀왔어요! 분위기가 정말 좋고 커피도 맛있었어요 ☕️ #카페투어 #소확행 #힐링",
    hashtag: ["#브런치", "#카페투어", "#소확행", "#힐링"],
    location: "홍대",
    like: [
      "kdGgFnRk8TyyUVeXQji7vZybpQ1",
      "bIqUJE0DxQa1HdkLfMqh105VOrQ",
      "vmgb4hOLWStnp2SZwwjMSw29A9i",
      "wAKs9uXSWsTJbbJGg2MaErFaKqE",
      "VA2MxTOE2O9mN4nVQy4Fw2glB2h",
      "EnweBLflxt3pYRGLy8hfJ18MeOm",
      "4JhKn3cYHd9dY9muGz1oXiJAruo",
      "0aDoIgvbfsQYBX20nWRnuOkNrNh",
      "Rwkuz4I5TDjog8sfK3rzUCI4Ik6",
      "hCTuFAf5A87ZG7mhWx1poHaNF3Q",
      "z7UhehujghvKX02fUj1ig9gfP7n",
    ],
    tagUser: ["UtcsfzZbJYxJ0qzD6P6nvqXGFM1", "FNUEoSKu7equPIpWvLcKumRz7Pc"],
    reply: [
      {
        userId: "hCTuFAf5A87ZG7mhWx1poHaNF3Q",
        content: "브런치 너무 맛있겠어요!",
        createDate: "2024-10-06",
        like: [],
        reReply: [],
        replyId: "rp00000001",
      },
      {
        userId: "BbVEQf8MoEuxL7XREuCVTjUQkSx",
        content: "저도 다음에 가볼게요!",
        createDate: "2024-10-07",
        like: [],
        reReply: [],
        replyId: "rp00000002",
      },
      {
        userId: "BbVEQf8MoEuxL7XREuCVTjUQkSx",
        content: "먹음직 스럽게 찍었네요.",
        createDate: "2024-10-07",
        like: ["BbVEQf8MoEuxL7XREuCVTjUQkSx"],
        reReply: [
          {
            userId: "4JhKn3cYHd9dY9muGz1oXiJAruo",
            content: "언니 저도 여기서 먹어봤어요!!",
            createDate: "2024-10-07",
            like: [
              "FNUEoSKu7equPIpWvLcKumRz7Pc",
              "4JhKn3cYHd9dY9muGz1oXiJAruo",
            ],
            reReplyId: "rr00000001",
          },
          {
            userId: "bIqUJE0DxQa1HdkLfMqh105VOrQ",
            content: "여기 정말 맛있어요.",
            createDate: "2024-10-08",
            like: [
              "0aDoIgvbfsQYBX20nWRnuOkNrNh",
              "z7UhehujghvKX02fUj1ig9gfP7n",
              "UtcsfzZbJYxJ0qzD6P6nvqXGFM1",
            ],
            reReplyId: "rr00000002",
          },
        ],
        replyId: "rp00000003",
      },
    ],
  },
  {
    userId: "KWUUuqMImhcKDZ822gc2InH4vSN",
    feedId: "fd00000002",
    createDate: "2024-10-07",
    type: "img",
    imgPath: [
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed2.jpg",
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed3.jpg",
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed4.jpg",
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed5.jpg",
    ],
    content:
      "#갤러리 다녀왔어요. 오랜만에 작품들 보니까 기분이 너무 좋아요 #힐링 ",
    hashtag: ["#갤러리", "#힐링"],
    location: "더페이지 갤러리",
    like: [
      "4JhKn3cYHd9dY9muGz1oXiJAruo",
      "wAKs9uXSWsTJbbJGg2MaErFaKqE",
      "z7UhehujghvKX02fUj1ig9gfP7n",
      "VA2MxTOE2O9mN4nVQy4Fw2glB2h",
      "FNUEoSKu7equPIpWvLcKumRz7Pc",
      "hCTuFAf5A87ZG7mhWx1poHaNF3Q",
      "EnweBLflxt3pYRGLy8hfJ18MeOm",
      "UtcsfzZbJYxJ0qzD6P6nvqXGFM1",
      "bIqUJE0DxQa1HdkLfMqh105VOrQ",
    ],
    tagUser: [],
    reply: [],
  },
  {
    userId: "lualbvqvQmVWkfDU7JUKJRYdqf3",
    feedId: "fd00000003",
    createDate: "2024-10-08",
    type: "reels",
    imgPath: ["images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/reels1.mp4"],
    content:
      "#이탈리아 로 #여행 다녀왔어요. 이번 달은 #유럽 곳곳을 돌아날일 예정이에요!",
    hashtag: ["#이탈리아", "#여행", "#유럽"],
    location: "Fontana Di Trevi",
    like: [
      "vmgb4hOLWStnp2SZwwjMSw29A9i",
      "FNUEoSKu7equPIpWvLcKumRz7Pc",
      "bIqUJE0DxQa1HdkLfMqh105VOrQ",
      "EnweBLflxt3pYRGLy8hfJ18MeOm",
      "KWUUuqMImhcKDZ822gc2InH4vSN",
      "wAKs9uXSWsTJbbJGg2MaErFaKqE",
      "0aDoIgvbfsQYBX20nWRnuOkNrNh",
      "UtcsfzZbJYxJ0qzD6P6nvqXGFM1",
      "VA2MxTOE2O9mN4nVQy4Fw2glB2h",
      "kdGgFnRk8TyyUVeXQji7vZybpQ1",
      "z7UhehujghvKX02fUj1ig9gfP7n",
    ],
    tagUser: [],
    reply: [
      {
        userId: "kdGgFnRk8TyyUVeXQji7vZybpQ1",
        content: "여기 꼭 가보고 싶네요!",
        createDate: "2024-10-11",
        like: [
          "EnweBLflxt3pYRGLy8hfJ18MeOm",
          "bIqUJE0DxQa1HdkLfMqh105VOrQ",
          "hCTuFAf5A87ZG7mhWx1poHaNF3Q",
        ],
        reReply: [
          {
            userId: "Rwkuz4I5TDjog8sfK3rzUCI4Ik6",
            content: "꼭 가보세요!",
            createDate: "2024-10-13",
            like: [
              "wAKs9uXSWsTJbbJGg2MaErFaKqE",
              "hCTuFAf5A87ZG7mhWx1poHaNF3Q",
            ],
            reReplyId: "rr00000003",
          },
        ],
        replyId: "rp00000004",
      },
    ],
  },
  {
    userId: "KWUUuqMImhcKDZ822gc2InH4vSN",
    feedId: "fd00000004",
    createDate: "2024-10-10",
    type: "img",
    imgPath: [
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed6.jpg",
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed7.jpg",
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed8.jpg",
    ],
    content:
      "늘 편안하고 행복한 공간 #제주도 🩵 #바다 #노을을 보면서 하루를 마무리했어요! ",
    hashtag: ["#제주도", "#바다", "#노을"],
    location: "제주도 서귀포",
    like: [
      "FNUEoSKu7equPIpWvLcKumRz7Pc",
      "EnweBLflxt3pYRGLy8hfJ18MeOm",
      "wAKs9uXSWsTJbbJGg2MaErFaKqE",
      "kdGgFnRk8TyyUVeXQji7vZybpQ1",
      "KWUUuqMImhcKDZ822gc2InH4vSN",
      "VA2MxTOE2O9mN4nVQy4Fw2glB2h",
      "BbVEQf8MoEuxL7XREuCVTjUQkSx",
      "0aDoIgvbfsQYBX20nWRnuOkNrNh",
    ],
    tagUser: [],
    reply: [
      {
        userId: "Rwkuz4I5TDjog8sfK3rzUCI4Ik6",
        content: "여기 꼭 가보고 싶네요!",
        createDate: "2024-10-10",
        like: [
          "bIqUJE0DxQa1HdkLfMqh105VOrQ",
          "vmgb4hOLWStnp2SZwwjMSw29A9i",
          "EnweBLflxt3pYRGLy8hfJ18MeOm",
        ],
        reReply: [
          {
            userId: "EnweBLflxt3pYRGLy8hfJ18MeOm",
            content: "노을이 굉장히 예뻐요!",
            createDate: "2024-10-11",
            like: [
              "FNUEoSKu7equPIpWvLcKumRz7Pc",
              "EnweBLflxt3pYRGLy8hfJ18MeOm",
              "KWUUuqMImhcKDZ822gc2InH4vSN",
            ],
            reReplyId: "rr00000004",
          },
          {
            userId: "Rwkuz4I5TDjog8sfK3rzUCI4Ik6",
            content: "저도 여기서 즐거운 시간 보냈어요!",
            createDate: "2024-10-11",
            like: [],
            reReplyId: "rr00000005",
          },
          {
            userId: "wAKs9uXSWsTJbbJGg2MaErFaKqE",
            content: "저도 꼭 다시 가고 싶어요!",
            createDate: "2024-10-13",
            like: [
              "EnweBLflxt3pYRGLy8hfJ18MeOm",
              "wAKs9uXSWsTJbbJGg2MaErFaKqE",
              "0aDoIgvbfsQYBX20nWRnuOkNrNh",
            ],
            reReplyId: "rr00000006",
          },
        ],
        replyId: "rp00000005",
      },
      {
        userId: "bIqUJE0DxQa1HdkLfMqh105VOrQ",
        content: "여기는 정말 노을이 멋있었어요!",
        createDate: "2024-10-13",
        like: [],
        reReply: [],
        replyId: "rp00000006",
      },
      {
        userId: "FNUEoSKu7equPIpWvLcKumRz7Pc",
        content: "힐링 그 자체네요",
        createDate: "2024-10-13",
        like: ["hCTuFAf5A87ZG7mhWx1poHaNF3Q"],
        reReply: [
          {
            userId: "FNUEoSKu7equPIpWvLcKumRz7Pc",
            content: "저도 이곳에서 좋은 추억이 있어요.",
            createDate: "2024-10-13",
            like: [
              "EnweBLflxt3pYRGLy8hfJ18MeOm",
              "KWUUuqMImhcKDZ822gc2InH4vSN",
              "z7UhehujghvKX02fUj1ig9gfP7n",
            ],
            reReplyId: "rr00000007",
          },
          {
            userId: "UtcsfzZbJYxJ0qzD6P6nvqXGFM1",
            content: "저도 꼭 예쁜 노을을 봤으면 좋겠네요!",
            createDate: "2024-10-13",
            like: [],
            reReplyId: "rr00000008",
          },
        ],
        replyId: "rp00000007",
      },
      {
        userId: "EnweBLflxt3pYRGLy8hfJ18MeOm",
        content: "정말 행복해 보여요",
        createDate: "2024-10-16",
        like: ["EnweBLflxt3pYRGLy8hfJ18MeOm", "Rwkuz4I5TDjog8sfK3rzUCI4Ik6"],
        reReply: [],
        replyId: "rp00000008",
      },
    ],
  },
  {
    userId: "lualbvqvQmVWkfDU7JUKJRYdqf3",
    feedId: "fd00000005",
    createDate: "2024-10-13",
    type: "img",
    imgPath: [
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed9.jpg",
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed10.jpg",
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed11.jpg",
    ],
    content:
      "#반려동물 과의 시간은 언제나 #힐링 이에요🐶 #서귀포 에서의 #일상생활",
    hashtag: ["#반려동물", "#힐링", "#서귀포", "#일상생활"],
    location: "제주도 서귀포",
    like: [
      "BbVEQf8MoEuxL7XREuCVTjUQkSx",
      "FNUEoSKu7equPIpWvLcKumRz7Pc",
      "VA2MxTOE2O9mN4nVQy4Fw2glB2h",
      "hCTuFAf5A87ZG7mhWx1poHaNF3Q",
      "Rwkuz4I5TDjog8sfK3rzUCI4Ik6",
      "kdGgFnRk8TyyUVeXQji7vZybpQ1",
      "vmgb4hOLWStnp2SZwwjMSw29A9i",
      "UtcsfzZbJYxJ0qzD6P6nvqXGFM1",
      "EnweBLflxt3pYRGLy8hfJ18MeOm",
    ],
    tagUser: [],
    reply: [],
  },
  {
    userId: "KWUUuqMImhcKDZ822gc2InH4vSN",
    feedId: "fd00000006",
    createDate: "2024-10-14",
    type: "img",
    imgPath: [
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed12.jpg",
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed13.jpg",
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed14.jpg",
    ],
    content: "역시 일요일엔 #브런치 뇸뇸 너무 맛있오 #카페투어 #맛집투어",
    hashtag: ["#브런치", "#카페투어", "#맛집투어"],
    location: "삼청동",
    like: [
      "KWUUuqMImhcKDZ822gc2InH4vSN",
      "Rwkuz4I5TDjog8sfK3rzUCI4Ik6",
      "BbVEQf8MoEuxL7XREuCVTjUQkSx",
      "bIqUJE0DxQa1HdkLfMqh105VOrQ",
      "4JhKn3cYHd9dY9muGz1oXiJAruo",
      "EnweBLflxt3pYRGLy8hfJ18MeOm",
      "VA2MxTOE2O9mN4nVQy4Fw2glB2h",
      "vmgb4hOLWStnp2SZwwjMSw29A9i",
      "hCTuFAf5A87ZG7mhWx1poHaNF3Q",
      "FNUEoSKu7equPIpWvLcKumRz7Pc",
      "z7UhehujghvKX02fUj1ig9gfP7n",
    ],
    tagUser: [],
    reply: [
      {
        userId: "4JhKn3cYHd9dY9muGz1oXiJAruo",
        content: "사진 속 분위기가 너무 좋아요.",
        createDate: "2024-10-14",
        like: [],
        reReply: [
          {
            userId: "hCTuFAf5A87ZG7mhWx1poHaNF3Q",
            content: "음식 사진이 너무 먹음직 스럽네요!",
            createDate: "2024-10-14",
            like: ["EnweBLflxt3pYRGLy8hfJ18MeOm"],
            reReplyId: "rr00000009",
          },
          {
            userId: "BbVEQf8MoEuxL7XREuCVTjUQkSx",
            content: "여기 정말 맛있어요.",
            createDate: "2024-10-14",
            like: [
              "kdGgFnRk8TyyUVeXQji7vZybpQ1",
              "hCTuFAf5A87ZG7mhWx1poHaNF3Q",
              "wAKs9uXSWsTJbbJGg2MaErFaKqE",
            ],
            reReplyId: "rr00000010",
          },
          {
            userId: "VA2MxTOE2O9mN4nVQy4Fw2glB2h",
            content: "두분 너무 보기 좋네요ㅎㅎ 저도 여기서 맛있게 먹었어요.",
            createDate: "2024-10-15",
            like: ["BbVEQf8MoEuxL7XREuCVTjUQkSx"],
            reReplyId: "rr00000011",
          },
        ],
        replyId: "rp00000009",
      },
    ],
  },
  {
    userId: "lualbvqvQmVWkfDU7JUKJRYdqf3",
    feedId: "fd00000007",
    createDate: "2024-10-16",
    type: "img",
    imgPath: ["images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed15.jpg"],
    content: "#일상생활 모닝 루틴 #강아지 와 #산책",
    hashtag: ["#일상생활", "#강아지", "#산책"],
    location: "강원도 양양",
    like: [
      "EnweBLflxt3pYRGLy8hfJ18MeOm",
      "hCTuFAf5A87ZG7mhWx1poHaNF3Q",
      "Rwkuz4I5TDjog8sfK3rzUCI4Ik6",
      "VA2MxTOE2O9mN4nVQy4Fw2glB2h",
      "BbVEQf8MoEuxL7XREuCVTjUQkSx",
      "vmgb4hOLWStnp2SZwwjMSw29A9i",
      "KWUUuqMImhcKDZ822gc2InH4vSN",
      "UtcsfzZbJYxJ0qzD6P6nvqXGFM1",
      "0aDoIgvbfsQYBX20nWRnuOkNrNh",
      "wAKs9uXSWsTJbbJGg2MaErFaKqE",
      "FNUEoSKu7equPIpWvLcKumRz7Pc",
      "4JhKn3cYHd9dY9muGz1oXiJAruo",
      "kdGgFnRk8TyyUVeXQji7vZybpQ1",
    ],
    tagUser: ["Af4BexYzzRIvqtGjSeYEG3pqZHw", "0kW30ovXTfTAwBRyTzHKGvqG398"],
    reply: [
      {
        userId: "KWUUuqMImhcKDZ822gc2InH4vSN",
        content: "언니 강아지랑 산책하는 모습이 너무 사랑스러워요.",
        createDate: "2024-10-16",
        like: [
          "bIqUJE0DxQa1HdkLfMqh105VOrQ",
          "Rwkuz4I5TDjog8sfK3rzUCI4Ik6",
          "KWUUuqMImhcKDZ822gc2InH4vSN",
        ],
        reReply: [],
        replyId: "rp00000010",
      },
      {
        userId: "0aDoIgvbfsQYBX20nWRnuOkNrNh",
        content: "정말 행복해 보여요!",
        createDate: "2024-10-16",
        like: ["Rwkuz4I5TDjog8sfK3rzUCI4Ik6", "VA2MxTOE2O9mN4nVQy4Fw2glB2h"],
        reReply: [],
        replyId: "rp00000011",
      },
      {
        userId: "BbVEQf8MoEuxL7XREuCVTjUQkSx",
        content: "저도 강아지랑 꼭 한번 가봐야겠어요!",
        createDate: "2024-10-17",
        like: ["VA2MxTOE2O9mN4nVQy4Fw2glB2h"],
        reReply: [
          {
            userId: "hCTuFAf5A87ZG7mhWx1poHaNF3Q",
            content: "꼭 가보세요!",
            createDate: "2024-10-17",
            like: [
              "VA2MxTOE2O9mN4nVQy4Fw2glB2h",
              "FNUEoSKu7equPIpWvLcKumRz7Pc",
            ],
            reReplyId: "rr00000012",
          },
          {
            userId: "4JhKn3cYHd9dY9muGz1oXiJAruo",
            content: "산책은 역시 아침이죠~",
            createDate: "2024-10-18",
            like: ["0aDoIgvbfsQYBX20nWRnuOkNrNh"],
            reReplyId: "rr00000013",
          },
        ],
        replyId: "rp00000012",
      },
    ],
  },
  {
    userId: "KWUUuqMImhcKDZ822gc2InH4vSN",
    feedId: "fd00000008",
    createDate: "2024-10-18",
    type: "img",
    imgPath: [
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed16.jpg",
      "images/userImgs/lualbvqvQmVWkfDU7JUKJRYdqf3/feed17.jpg",
    ],
    content: "#제주도 로 #여행 왔어요.. 오늘도 #서귀포 가깝고 너무 좋아요",
    hashtag: ["#제주도", "#여행", "#서귀포"],
    location: "제주도 서귀포",
    like: [
      "VA2MxTOE2O9mN4nVQy4Fw2glB2h",
      "bIqUJE0DxQa1HdkLfMqh105VOrQ",
      "wAKs9uXSWsTJbbJGg2MaErFaKqE",
      "hCTuFAf5A87ZG7mhWx1poHaNF3Q",
      "FNUEoSKu7equPIpWvLcKumRz7Pc",
      "UtcsfzZbJYxJ0qzD6P6nvqXGFM1",
      "EnweBLflxt3pYRGLy8hfJ18MeOm",
      "4JhKn3cYHd9dY9muGz1oXiJAruo",
      "Rwkuz4I5TDjog8sfK3rzUCI4Ik6",
      "BbVEQf8MoEuxL7XREuCVTjUQkSx",
      "z7UhehujghvKX02fUj1ig9gfP7n",
    ],
    tagUser: [],
    reply: [],
  },
];

const limit = feed[1].imgPath.length - 1;

const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

const ProfileSection = styled.div`
  margin-left: 39px;
  margin-right: 36px;
  height: 114px;
  display: flex;
  align-items: center;
  gap: 18px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
`;

const UserName = styled.p`
  font-size: var(--font-14);
  color: var(--gray-color);
`;

const PhotoSection = styled.div`
  width: 652px;
  height: 815px;
  margin: 0 auto;
  border-radius: 8px;
  border: 1px solid #f00;
  position: relative;
  overflow: hidden;
`;

const Slides = styled.ul`
  width: ${100 * (feed[1].imgPath.length || 1)}%;
  height: 100%;
  display: flex;
  transform: translateX(
    ${({ visible }) => `${-visible * (100 / feed[1].imgPath.length) || 0}%`}
  );
  transition: transform 0.5s;
`;

const Slide = styled.li`
  width: 100%;
  height: 100%;
  img {
    width: inherit;
    height: inherit;
    object-fit: cover;
  }
`;

const SlideButtons = styled.div`
  width: 100%;
  padding: 0 22px;
  position: absolute;
  top: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SlideButton = styled.span`
  width: 35px;
  height: 35px;
  cursor: pointer;
  &.prev {
    transform: rotate(180deg);
    visibility: ${({ visible }) => (visible === 0 ? "hidden" : "visible")};
  }
  &.next {
    visibility: ${({ visible }) => (visible === limit ? "hidden" : "visible")};
  }
  & img {
    width: inherit;
    height: inherit;
  }
`;

const item = {
  userNickName: "lotte_ria",
  userName: "코드분쇄기",
  url: "/images/userImgs/user123456/followed_1.jpg",
  createDate: "2일",
  check: "active",
};

const SlideButtonImg = () => {
  return (
    <>
      <img src={"/images/slide-button.svg"} />
    </>
  );
};

const FeedItem = () => {
  const [visible, setVisible] = useState(0);
  const moveSlide = (num) => {
    setVisible(num + visible);
  };

  return (
    <Wrapper>
      <ProfileSection>
        <ProfileImg type={"active"} size={"62"} url={item.url} />
        <UserInfo>
          <UserId
            type={"feed"}
            userNickname={item.userNickName}
            check={item.active}
            createDate={item.createDate}
            btn={"more"}
          />
          <UserName>{item.userName}</UserName>
        </UserInfo>
      </ProfileSection>
      <PhotoSection>
        <Slides visible={visible}>
          {feed[1].imgPath.map((it, idx) => (
            <Slide key={idx}>
              <img src={it} />
            </Slide>
          ))}
        </Slides>
        <SlideButtons>
          <SlideButton
            className="prev"
            visible={visible}
            onClick={() => moveSlide(-1)}
          >
            <SlideButtonImg />
          </SlideButton>
          <SlideButton
            className="next"
            visible={visible}
            onClick={() => moveSlide(1)}
          >
            <SlideButtonImg />
          </SlideButton>
        </SlideButtons>
      </PhotoSection>
    </Wrapper>
  );
};

export default FeedItem;
