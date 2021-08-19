import React from 'react';
import { Channel, useChatContext } from 'stream-chat-react';

import { ChannelInner, CreateChannel, EditChannel, TeamMessage, TeamMessageInput } from './';
// import { CloseThreadIcon } from '../assets';

// const ThreadHeader = (props) => {
//   const { closeThread, thread } = props;

//   const getReplyCount = () => {
//     if (!thread?.reply_count) return '';
//     if (thread.reply_count === 1) return '1 reply';
//     return `${thread.reply_count} Replies`;
//   };

//   return (
//     <div className='custom-thread-header'>
//       <div className='custom-thread-header__left'>
//         <p className='custom-thread-header__left-title'>Thread</p>
//         <p className='custom-thread-header__left-count'>{getReplyCount()}</p>
//       </div>
//       <CloseThreadIcon {...{ closeThread }} />
//     </div>
//   );
// };

const ChannelContainer = (props) => {
  const { createType, isCreating, isEditing, setIsCreating, setIsEditing } = props;

  const { channel } = useChatContext();

  if (isCreating) {
    const filters = {};

    return (
      <div className='channel__container'>
        <CreateChannel {...{ createType, filters, setIsCreating }} />
      </div>
    );
  }

  if (isEditing) {
    const filters = {};

    if (channel?.state?.members) {
      const channelMembers = Object.keys(channel.state.members);
      if (channelMembers.length) {
        filters.id = { $nin: channelMembers };
      }
    }

    return (
      <div className='channel__container'>
        <EditChannel {...{ filters, setIsEditing }} />
      </div>
    );
  }

  const EmptyState = () => (
    <div className='channel-empty__container'>
      <p className='channel-empty__first'>This is the beginning of your chat history.</p>
      <p className='channel-empty__second'>Send messages, attachments, links, emojis, and more.</p>
    </div>
  );

  return (
    <div className='channel__container'>
      <Channel
        EmptyStateIndicator={EmptyState}
        Input={TeamMessageInput}
        Message={(messageProps, i) => <TeamMessage key={i} {...messageProps} /> } >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;