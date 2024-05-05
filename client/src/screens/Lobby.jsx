import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true); 
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="min-h-screen  flex justify-center items-center bg-gradient-to-b from-blue-500 to-yellow-300 ">
      <div className="bg-transparent w-96 h-[400px] shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1 className="text-3xl mb-4 ml-28">Lobby</h1>
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <div className="mt-10">
            <label htmlFor="email" className="block text-black">Email ID</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="room" className="block text-black mt-7">Room Number</label>
            <input
              type="text"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mt-10 flex justify-center">
          <button
            type="submit"
            className={`mt-4 w-28 bg-red-500  text-white p-2 rounded-md ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"}`}
            disabled={isLoading} 
          >
            {isLoading ? "Loading..." : "Join"}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LobbyScreen;
