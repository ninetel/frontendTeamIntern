import React from "react";

const ChatList = ({ chats, setSelectedChat }) => {
  return (
    <div className="p-4 overflow-y-auto h-[600px] space-y-4">
      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => setSelectedChat(chat)}
          className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer hover:bg-gray-100"
        >
          <p className="font-semibold text-gray-900">{chat.user}</p>
          <p className="text-gray-600 truncate">
            {chat.messages[chat.messages.length - 1].message}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
