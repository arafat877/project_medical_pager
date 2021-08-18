import React from 'react';
import { Avatar, useChannelActionContext, useChannelStateContext, useChatContext } from 'stream-chat-react';

import { ChannelInfo } from '../../assets';
import './TeamChannelHeader.css';

export const TeamChannelHeader = ({ setIsEditing }) => {
  const { channel, watcher_count } = useChannelStateContext();
  const { closeThread } = useChannelActionContext();
  const { client } = useChatContext();

  const teamHeader = `# ${channel.data.name || channel.data.id}`;

  const getMessagingHeader = () => {
    const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    const additionalMembers = members.length - 3;

    return (
      <div className='team-channel-header__name-wrapper'>
        {members.map(({ user }, i) => (
          <div key={i} className='team-channel-header__name-multi'>
            <Avatar image={user.image} name={user.name || user.id} size={32} />
            <p className='team-channel-header__name user'>{user.name || user.id}</p>
          </div>
        ))}

        {additionalMembers > 0 && <p className='team-channel-header__name user'>and {additionalMembers} more</p>}
      </div>
    );
  };

  const getWatcherText = (watchers) => {
    if (!watchers) return 'No users online';
    if (watchers === 1) return '1 user online';
    return `${watchers} users online`;
  };

  return (
    <div className='team-channel-header__container'>
      {channel.type === 'messaging' 
      ? getMessagingHeader()
      : (
          <div className='team-channel-header__channel-wrapper'>
            <p className='team-channel-header__name'>{teamHeader}</p>
            <span style={{ display: 'flex' }} onClick={() => setIsEditing(true)}>
              <ChannelInfo />
            </span>
          </div>
        )}
        <div className='team-channel-header__right'>
        <p className='team-channel-header__right-text'>{getWatcherText(watcher_count)}</p>
      </div>
    </div>
  );
};
