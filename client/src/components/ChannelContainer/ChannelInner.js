import React, { useState } from 'react';
import { logChatPromiseExecution } from 'stream-chat';

import { MessageList, MessageInput, Thread, Window, useChannelActionContext } from 'stream-chat-react';

import { ThreadMessageInput } from '../TeamMessageInput/ThreadMessageInput';
import { TeamChannelHeader } from '../TeamChannelHeader/TeamChannelHeader';

export const GiphyContext = React.createContext({});

export const ChannelInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false);

  const giphyStateObj = { giphyState: giphyState, setGiphyState };

  const { sendMessage } = useChannelActionContext();

  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };

    if (giphyState) {
      const updatedText = `/giphy ${message.text}`;
      updatedMessage = { ...updatedMessage, text: updatedText };
    }

    if (sendMessage) {
      const sendMessagePromise = sendMessage(updatedMessage);
      logChatPromiseExecution(sendMessagePromise, 'send message');
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={giphyStateObj}>
      <div style={{ display: 'flex', width: '100%' }}>
        <Window>
          <TeamChannelHeader {...{ setIsEditing }} />
          <MessageList disableQuotedMessages />
          <MessageInput grow overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread additionalMessageInputProps={{ grow: true, Input: ThreadMessageInput }} />
      </div>
    </GiphyContext.Provider>
  );
};
