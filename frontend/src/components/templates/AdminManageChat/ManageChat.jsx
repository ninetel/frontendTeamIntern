import React, { useState } from "react";

const ManageChat = () => {
  const allChats = [
    {
      username: "ram",
      message: "Hello, this is a short message.",
      type: "General",
      time: 20240826162526,
    },
    {
      username: "ra1m",
      message:
        "Hello1, this message is a bit longer and might cause overflow depending on the card size.",
      type: "Guest",
      time: 20240826162536,
    },
    {
      username: "ram2",
      message:
        "Hello2, this is another message that could potentially overflow the card if it's too long.",
      type: "General",
      time: 20240826162543,
    },
    {
      username: "ram3",
      message: "Hello3, short message.",
      type: "Auth",
      time: 20240826162559,
    },
    {
      username: "ram4",
      message:
        "Hello4, this message is quite long and should demonstrate how overflow is handled in this card. Let's see how it appears in the UI.",
      type: "Guest",
      time: 20240826162559,
    },
  ];

  const [selectedType, setSelectedType] = useState("");
  const [sortedMembers, setSortedMembers] = useState(
    [...allChats].sort((a, b) => b.time - a.time)
  );
  const [selectedChat, setSelectedChat] = useState(null);

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);

    if (type === "") {
      setSortedMembers([...allChats].sort((a, b) => b.time - a.time));
    } else {
      const filteredMembers = allChats.filter((chat) => chat.type === type);
      setSortedMembers(filteredMembers.sort((a, b) => b.time - a.time));
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 text-center">
            Member List
          </h2>
          <label className="block mb-2">Chat Type:</label>
          <select
            onChange={handleTypeChange}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">All</option>
            <option value="General">General</option>
            <option value="Guest">Guest</option>
            <option value="Auth">Auth</option>
          </select>
        </div>
        <div className="p-4 overflow-y-auto h-full space-y-4">
          {sortedMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer"
              onClick={() => setSelectedChat(member)}
            >
              <p className="font-semibold text-gray-900">{member.username}</p>
              <p className="text-gray-600 truncate">{member.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-2/3 bg-gray-50 p-4 overflow-y-auto h-full">
        {selectedChat ? (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Chat with {selectedChat.username}
            </h2>
            <div className="mt-4">
              <div className="flex flex-col space-y-4">
                {/* Display messages for the selected chat */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">User</p>
                  <p className="text-gray-600">{selectedChat.message}</p>
                </div>
                {/* Admin's message box */}
                <div className="bg-blue-100 p-4 rounded-lg shadow-sm self-end">
                  <p className="font-semibold text-gray-900">Admin</p>
                  <p className="text-gray-600">
                    Admin's response message will be shown here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a chat to view messages</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageChat;
