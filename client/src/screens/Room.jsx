import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [isMicMuted, setIsMicMuted] = useState(false);


  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleToggleMic = () => {
    if (myStream) {
      myStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMicMuted(!isMicMuted);
    }
  };

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  const handleDisconnect = () => {
    setRemoteSocketId(null);
    setMyStream(null);
    setRemoteStream(null);
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <h4 className="text-center text-2xl mr-10 mb-3">{remoteSocketId ? "Connected" : "No one in room"}</h4>
     

      {/*-------------------------------------------------------------*/}

     <div className="flex mb-15">
      {myStream && (
        <div className="m-4 rounded-lg overflow-hidden">
        <h1 className="text-2xl">My Stream</h1>
        <div className="rounded-lg overflow-hidden">
          <ReactPlayer playing muted height="300px" width="400px" url={myStream} />
        </div>
      </div>
      )}
      {remoteStream && (
        <div className="m-4 rounded-lg overflow-hidden">
          <h1 className="text-2xl">User Stream</h1>
          <div className="rounded-lg overflow-hidden">
            <ReactPlayer playing muted height="300px" width="400px" url={myStream} />
          </div>
        </div>
      )}
      </div>
      {/*-------------------------------------------------------------*/}
      {remoteSocketId && (
        <div className="flex items-center mb-4">
          <button onClick={handleToggleMic} className="mx-2 p-2 rounded-full w-20 h-10 bg-gray-300 text-xl-black hover:bg-black hover:text-white">Mic
            {isMicMuted ? <i className="fas fa-microphone-slash"></i> : <i className="fas fa-microphone"></i>}
          </button>
        </div>
      )}

   

      {/*-------------------------------------------------------------*/}

      <div className="flex">
      {myStream && <button onClick={sendStreams} className="m-10  w-28 h-14 rounded-lg bg-red-600 hover:bg-blue-500">Send Stream</button>}
      {remoteSocketId && <button onClick={handleCallUser} className="m-10  w-28 h-14 rounded-lg bg-red-600 mb-28 hover:bg-blue-500">CALL</button>}
      <div>
      {remoteSocketId && <button onClick={handleDisconnect} className="m-10  w-28 h-14 rounded-lg bg-red-600 hover:bg-blue-500">Disconnect</button>}
    </div>
      </div>
      </div>
  );
};

export default RoomPage;