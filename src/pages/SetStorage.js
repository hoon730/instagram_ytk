// import React from "react";
// import Data from "../data.json";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth, db, storage } from "../utils/firebase";
// import { addDoc, collection, updateDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// console.log("스토리지 세팅 시작");

// 0. 먼저 주석을 풀기전에 /setStorage를 입력해서 화면이동. 그리고 주석을 한번에 풀어서 저장하지 말고 필요한 것만 풀어서 저장하면 바로 실행 됨.
// 그리고 반드시 다시 주석처리 해야함 안그러면 중복 데이터가 올라감.. 주의!!!

//1. 계정 세팅(Authentication에 넣을 때만 풀기.. 이미 계정이 있으면 절대 주석 풀지 말 것)

// Data.user.forEach(async (user) => {
//   console.log(user);
//   const credentials = await createUserWithEmailAndPassword(
//     auth,
//     user.email,
//     user.password
//   );
//   await updateProfile(credentials.user, { displayName: user.userRealName });
// });

// 1-1. 제일 중요한 작업 : firebase Authentication에 잘 들어갔으면, data.json의 user의 uid를 firebase의 uid로 바꿔주기..(1번을 했을 시에만...)

// 2. 프로필 세팅
// const setProfile = () => {
//   Data.profile.forEach(async (item, idx) => {
//     const user = Data.user.find((it) => it.userId === item.userId);

//     const newFollower = [];
//     item.follower.forEach((a) => {
//       Data.user.forEach((b) => {
//         if (b.userId === a) {
//           newFollower.push(b.uid);
//         }
//       });
//     });

//     const newFollowing = [];
//     item.following.forEach((a) => {
//       Data.user.forEach((b) => {
//         if (b.userId === a) {
//           newFollowing.push(b.uid);
//         }
//       });
//     });

//     const doc = await addDoc(collection(db, "profile"), {
//       uid: user.uid,
//       userId: user.userNickname,
//       userName: item.userName,
//       email: user.email,
//       gender: item.gender,
//       introduction: item.introduction,
//       website: item.website,
//       recommendation: item.recommendation,
//       nondisclosure: item.nondisclosure,
//       follower: newFollower,
//       following: newFollowing,
//       badge: item.badge ? true : false,
//     });

//     const ppResponse = await fetch(process.env.PUBLIC_URL + item.profilePhoto);
//     const ppBlob = await ppResponse.blob();
//     const ppNames = item.profilePhoto.split("/");
//     const ppLocationRef = ref(
//       storage,
//       `profile/${user.uid}/${ppNames[ppNames.length - 1]}`
//     );
//     const ppResult = await uploadBytes(ppLocationRef, ppBlob);
//     const ppUrl = await getDownloadURL(ppResult.ref);
//     const ppFileType = ppBlob.type;
//     await updateDoc(doc, {
//       profilePhoto: ppUrl,
//     });

//     const bpResponse = await fetch(process.env.PUBLIC_URL + item.bgPhoto);
//     const bpBlob = await bpResponse.blob();
//     const bpNames = item.bgPhoto.split("/");
//     const bpLocationRef = ref(
//       storage,
//       `profile/${user.uid}/${bpNames[bpNames.length - 1]}`
//     );
//     const bpResult = await uploadBytes(bpLocationRef, bpBlob);
//     const bpUrl = await getDownloadURL(bpResult.ref);
//     const bpFileType = bpBlob.type;
//     await updateDoc(doc, {
//       bgPhoto: bpUrl,
//     });

//     console.log(`프로필${idx}번 업데이트 완료`);
//   });
// };
// setProfile();

// 3. 피드 세팅
// const setFeed = async () => {
//   let idx = 0;
//   for (const item of Data.feed) {
//     const user = Data.user.find((it) => it.userId === item.userId);

//     for (const detail of item.feedDetail) {
//       const newLike = [];
//       if (detail.like.length > 0) {
//         detail.like.forEach((a) => {
//           Data.user.forEach((b) => {
//             if (b.userId === a) {
//               newLike.push(b.uid);
//             }
//           });
//         });
//       }

//       const newTagUser = [];
//       if (detail.tagUser.length > 0) {
//         detail.tagUser.forEach((a) => {
//           Data.user.forEach((b) => {
//             if (b.userId === a) {
//               newTagUser.push(b.uid);
//             }
//           });
//         });
//       }

//       // 댓글 추가
//       const setReply = async (reply, feedId) => {
//         if (reply.length > 0) {
//           for (const rp of reply) {
//             const writter = Data.user.find((it) => it.userId === rp.userId);

//             const rpLike = [];
//             if (rp.like.length > 0) {
//               rp.like.forEach((a) => {
//                 Data.user.forEach((b) => {
//                   if (b.userId === a) {
//                     rpLike.push(b.uid);
//                   }
//                 });
//               });
//             }

//             const rpDoc = await addDoc(collection(db, "reply"), {
//               feedId: feedId,
//               uid: writter.uid,
//               createdAt: new Date(rp.createDate).getTime(),
//               type: "rp",
//               content: rp.content,
//               like: rpLike,
//             });

//             if (rp.reReply.length > 0) {
//               for (const rr of rp.reReply) {
//                 const writter = Data.user.find((it) => it.userId === rr.userId);

//                 const rrLike = [];
//                 if (rr.like.length > 0) {
//                   rr.like.forEach((a) => {
//                     Data.user.forEach((b) => {
//                       if (b.userId === a) {
//                         rrLike.push(b.uid);
//                       }
//                     });
//                   });
//                 }

//                 const rrDoc = await addDoc(collection(db, "re_reply"), {
//                   replyId: rpDoc.id,
//                   uid: writter.uid,
//                   createdAt: new Date(rr.createDate).getTime(),
//                   type: "rr",
//                   content: rr.content,
//                   like: rrLike,
//                 });
//               }
//             }
//           }
//         }
//       };

//       // 이미지 패스 추가
//       const updateImg = async (ppFileType, imgPath, doc) => {
//         if (ppFileType.startsWith("image/")) {
//           await updateDoc(doc, {
//             type: "img",
//             imgPath: imgPath,
//           });
//         }

//         if (ppFileType.startsWith("video/")) {
//           await updateDoc(doc, {
//             type: "reels",
//             imgPath: imgPath,
//           });
//         }
//       };

//       const doc = await addDoc(collection(db, "feed"), {
//         uid: user.uid,
//         createdAt: new Date(detail.createDate).getTime(),
//         content: detail.content,
//         hashtag: detail.hashtag,
//         location: detail.location,
//         like: newLike,
//         tagUser: newTagUser,
//       });

//       let imgPath = [];
//       let ppFileType = "img";
//       await Promise.all(
//         detail.imgPath.map(async (path, idx) => {
//           const ppResponse = await fetch(process.env.PUBLIC_URL + path);
//           const ppBlob = await ppResponse.blob();

//           const ppNames = path.split("/");
//           const ppLocationRef = ref(
//             storage,
//             `feed/${doc.id}/${ppNames[ppNames.length - 1]}`
//           );
//           const ppResult = await uploadBytes(ppLocationRef, ppBlob);
//           const ppUrl = await getDownloadURL(ppResult.ref);
//           imgPath.push(ppUrl);

//           if (idx === 0) {
//             ppFileType = ppBlob.type;
//           }
//         })
//       );

//       await updateImg(ppFileType, imgPath, doc);
//       await setReply(detail.reply, doc.id);
//     }
//     console.log(`피드${idx}번 업데이트 완료`);
//     idx++;
//   }
// };
// setFeed();

const SetStorage = () => {
  return (
    <div>SetStorage 돌리다가 중간에 나가면 절대 안됨, 주석 꼭 읽어보기</div>
  );
};

export default SetStorage;
