// import React, {
//   useEffect,
//   useRef,
//   useState,
//   useMemo,
//   useCallback,
// } from "react";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import Badge from "@mui/material/Badge";
// import { useLocation } from "react-router-dom";

// import { useSocket } from "../../Context/SocketContext";
// import { usePeer } from "../../Context/PeerContext";
// import { Stream } from "@mui/icons-material";

// interface RoomJoinedProps {
//   name: String;
//   roomId: String;
// }
// interface RoomBrodcastProps {
//   offer: {};
//   from: String;
// }

// export default function MeetingRoom() {
//   const [localStream, setLocalStream] = useState<MediaStream | null>();
//   const [remoteName, setRemoteName] = useState("");

//   const myVideo = useRef<HTMLVideoElement>(null);

//   // destructuring all data gotten from the context
//   const { socket } = useSocket();
//   const {
//     peer,
//     createOffer,
//     createAnswer,
//     setRemoteAnswer,
//     sendStream,
//     handleTrackEvents,
//   } = usePeer();

//   const handleRoomJoined = useCallback(
//     async ({ name, roomId }: RoomJoinedProps) => {
//       console.log("new user joined", roomId, name);
//       const offer = await createOffer();
//       socket.emit("broadcasting-channel", { name, offer });
//       setRemoteName(name);
//     },
//     [createOffer, socket]
//   );

//   const handleBrodcasting = useCallback(
//     async ({ from, offer }: RoomBrodcastProps) => {
//       console.log("broadcasting from", from, offer);

//       const responseAnswer = await createAnswer(offer);
//       socket.emit("accepted-broadcast-invite", { responseAnswer, from });
//       setRemoteName(from);
//     },
//     [createAnswer, socket]
//   );

//   const handleAcceptedBroadcast = useCallback(
//     async ({ responseAnswer }) => {
//       await setRemoteAnswer(responseAnswer);
//       console.log("two peers are connected with", responseAnswer);
//       // socket.emit("accepted-broadcast", { answer });
//     },
//     [setRemoteAnswer, socket]
//   );

//   const getUserStream = useCallback(async () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         setLocalStream(stream);
//         if (myVideo !== null) {
//           myVideo.current!.srcObject = stream as MediaStream;
//           sendStream(stream);
//         }
//       })
//       .catch((error) => {
//         console.log("Error accessing media devices", error);
//       });
//   }, [sendStream]);

//   useEffect(() => {
//     getUserStream();

//     socket.on("user-connected", handleRoomJoined);
//     socket.on("incoming-broadcast", handleBrodcasting);
//     socket.on("joined-broadcast", handleAcceptedBroadcast);
//     // socket.on("accepted-broadcast", handleAcceptedBroadcast);

//     return () => {
//       socket.off("user-connected", handleRoomJoined);
//       socket.off("user-connected", handleBrodcasting);
//       socket.off("user-connected", handleAcceptedBroadcast);
//     };
//   }, [socket, handleRoomJoined, handleBrodcasting, handleAcceptedBroadcast]);

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container sx={{ height: "100vh" }}>
//         <Grid item xs={2}>
//           <Paper sx={{ height: "100vh" }}>
//             <ListItem divider>
//               <ListItemText primary="Praise Ogunleye" />
//               <Badge color="secondary" variant="dot" />
//             </ListItem>
//             <ListItem divider>
//               <ListItemText primary="Emily Graham" />
//               <Badge color="secondary" variant="dot" />
//             </ListItem>
//             <ListItem divider>
//               <ListItemText primary="Evan Djokovic" />
//               <Badge color="secondary" variant="dot" />
//             </ListItem>
//             <ListItem divider>
//               <ListItemText primary="Rafael Nadal" />
//               <Badge color="secondary" variant="dot" />
//             </ListItem>
//           </Paper>
//         </Grid>
//         <div>{`You are connected to ${remoteName}`}</div>
//         <Grid item xs={8}>
//           <Paper sx={{ height: "100vh" }}>
//             <Grid container spacing={1} sx={{ m: "2rem" }}>
//               <Grid item xs="auto" sx={{ position: "relative" }}>
//                 <video
//                   ref={myVideo}
//                   autoPlay
//                   style={{
//                     width: "250px",
//                     height: "250px",
//                   }}
//                 ></video>
//               </Grid>
//               <Grid item xs="auto" sx={{ position: "relative" }}>
//                 <video
//                   // ref={userVideo}
//                   autoPlay
//                   style={{
//                     width: "250px",
//                     height: "250px",
//                   }}
//                 ></video>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Grid>
//         <Grid item xs={2}>
//           <Paper sx={{ height: "100vh" }}>Hello</Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// // const [localStream, setLocalStream] = useState<MediaStream | null>();
// // const [signal, setSignal] = useState();

// // const myVideo = useRef<HTMLVideoElement>(null);

// // useEffect(() => {
// //   navigator.mediaDevices
// //     .getUserMedia({ video: true, audio: true })
// //     .then((stream) => {
// //       setLocalStream(stream);
// //       if (myVideo !== null) {
// //         myVideo.current!.srcObject = stream as MediaStream;
// //       }
// //     })
// //     .catch((error) => {
// //       console.log("Error accessing media devices", error);
// //     });
// // }, []);
