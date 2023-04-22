import React from "react";
// import { RTCPeerConnection } from "@types/webrtc";

interface PeerProviderProps {
  value: {
    peer: RTCPeerConnection;
    createOffer: () => Promise<void>;
  } | null;
  children: React.ReactNode;
}

const stunServers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun.voipzoom.com:3478"],
    },
  ],
};

const PeerContext = React.createContext(null);

export const usePeer = () => React.useContext(PeerContext);

export const PeerProvider = ({ children }: PeerProviderProps) => {
  const [remoteStream, setRemoteStream] = React.useState<MediaStream | null>();
  const userVideo = React.useRef<HTMLVideoElement>(null);

  const peer = React.useMemo(() => new RTCPeerConnection(stunServers), []);
  const createOffer = async () => {
    //Basiclly from the documentation we need to create and offer and set local description this offer enables exchange of information between peers. peer A creates an offer that comprises of his media info and network info. and sets the offer description to the offer message created which is to be exhanged with peer 2
    const offer = await peer.createOffer();

    await peer.setLocalDescription(offer);
    return offer;
  };

  const createAnswer = async (offer: any) => {
    // I think from here it begins to make sense. as said earlier we create and offer and send this offer which contains details on how the other peer will connect after this conection has been set using the offer is sent and accepted by the other peer.
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    // this answer is a response  signal and if the peer accepts this signal we will pass the local description answer to the other peer
    await peer.setLocalDescription(answer);
    // also notice they are asynchronus
    return answer;
  };

  const setRemoteAnswer = async (responseAnswer: any) => {
    await peer.setRemoteDescription(responseAnswer);
  };

  const sendStream = async (stream: any) => {
    const tracks = stream.getTracks();
    for (const track of tracks) {
      peer.addTrack(track, stream);
    }
  };

  const handleTrackEvents = React.useCallback((event) => {
    const streams = event.streams;
    setRemoteStream(streams[0]);
    userVideo.current!.srcObject = remoteStream as MediaStream;
  }, []);

  const handleNegotiation = React.useCallback(() => {
    console.log("Negotiation completed");
  }, []);

  React.useEffect(() => {
    peer.addEventListener("track", handleTrackEvents);

    return () => {
      peer.removeEventListener("track", handleTrackEvents);
    };
  }, [peer, handleTrackEvents]);

  React.useEffect(() => {
    peer.addEventListener("negotiatonNeeded", handleNegotiation);

    return () => {
      peer.removeEventListener("track", handleNegotiation);
    };
  }, [peer, handleNegotiation]);

  return (
    <PeerContext.Provider
      value={{
        peer,
        createOffer,
        createAnswer,
        setRemoteAnswer,
        sendStream,
        handleTrackEvents,
        handleNegotiation,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
};
