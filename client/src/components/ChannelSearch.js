import React, { useEffect, useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import { ResultsDropdown } from './';
import { SearchIcon } from '../assets';

const ChannelSearch = () => {
  const { client, setActiveChannel } = useChatContext();
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!query) {
      setTeamChannels([]);
      setDirectChannels([]);
    }
  }, [query]);

  const setChannel = (channel) => {
    setQuery('');
    setActiveChannel(channel);
  };

  const getChannels = async (text) => {
    try {
      const channelResponse = client.queryChannels({ type: 'team', name: { $autocomplete: text } });
      const userResponse = client.queryUsers({ id: { $ne: client.userID }, name: { $autocomplete: text } });
      const [channels, { users }] = await Promise.all([channelResponse, userResponse]);
      
      if (channels.length) setTeamChannels(channels);
      if (users.length) setDirectChannels(users);
    } catch (e) {
      setQuery('');
    }

    setLoading(false);
  };

  const onSearch = (event) => {
    event.preventDefault();

    setLoading(true);
    setQuery(event.target.value);
    getChannels(event.target.value);
  };

  return (
    <div className='channel-search__container'>
      <div className='channel-search__input__wrapper'>
        <div className='channel-search__input__icon'>
          <SearchIcon />
        </div>
        <input className='channel-search__input__text' onChange={onSearch} placeholder='Search' type='text' value={query} />
      </div>
      {query && (
        <ResultsDropdown
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
        />
      )}
    </div>
  );
};

export default ChannelSearch;