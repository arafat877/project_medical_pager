import React from 'react';
import { ChannelList } from 'stream-chat-react';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import HospitalIcon from '../assets/hospital.png'

const SideBar = () => (
  <div className='channel-list__sidebar'>
    <div className='channel-list__sidebar__icon1'>
      <div className='icon1__inner'>
        <img src={HospitalIcon} alt="Hospital" width="30" />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className='channel-list__header'>
    <p className='channel-list__header__text'>Medical Pager</p>
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
};

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
  return (
    <div className='channel-list__container'>
      <SideBar />
      <div className='channel-list__list__wrapper'>
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          channelRenderFilterFn={customChannelTeamFilter}
          // filters={{ type: 'team', demo: 'team' }}
          // options={{ state: true, watch: true, presence: true, limit: 3 }}
          // sort={{ last_message_at: -1, updated_at: -1 }}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              {...{ setCreateType, setIsCreating, setIsEditing }}
              type='team'
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              {...{ setIsCreating, setIsEditing }}
              type='team'
            />
          )}
        />
        <ChannelList
          channelRenderFilterFn={customChannelMessagingFilter}
          // filters={filters[1]}
          // options={options}
          setActiveChannelOnMount={false}
          // sort={{ last_message_at: -1, updated_at: -1 }}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              {...{ setCreateType, setIsCreating, setIsEditing }}
              type='messaging'
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              {...{ setIsCreating, setIsEditing }}
              type='messaging'
            />
          )}
        />
      </div>
    </div>
  );
};

export default ChannelListContainer;