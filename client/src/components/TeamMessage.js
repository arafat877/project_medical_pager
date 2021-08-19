import React from 'react';
import { MessageTeam, useMessageContext } from 'stream-chat-react';

const TeamMessage = (props) => {
  const { handleOpenThread, message } = useMessageContext();

  const handleOpenThreadOverride = (event) => {
    handleOpenThread(event);
  };

  return (
      <MessageTeam  message={message} handleOpenThread={handleOpenThreadOverride} />
  );
};

export default TeamMessage;