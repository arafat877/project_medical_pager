import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, enTranslations, Streami18n } from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';
import './App.css';

import { getRandomImage } from './assets';
import { useChecklist } from './ChecklistTasks';
import { ChannelContainer } from './components/ChannelContainer/ChannelContainer';
import { ChannelListContainer } from './components/ChannelListContainer/ChannelListContainer';

import Auth from './components/Auth/Auth';

import Cookies from 'universal-cookie';

const cookies = new Cookies();
const urlParams = new URLSearchParams(window.location.search);
const apiKey =  process.env.REACT_APP_STREAM_KEY || 'e6nfz3p5c2qb';
const userId = cookies.get('userId') || 'adrianhajdin';
const username = cookies.get('username') || 'adrianhajdin';
const fullName = cookies.get('fullName') || 'adrianhajdin';
const theme = urlParams.get('theme') || 'light';
const userToken = cookies.get('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRyaWFuaGFqZGluIn0._zEuN5lihKojvwOpvA62sVH_L7vU7Ph8W7lvfdk4lfc';
const hashedPassword = cookies.get('hashedPassword');
const isAuth = cookies.get('isAuth');
const targetOrigin = urlParams.get('target_origin');

const i18nInstance = new Streami18n({
  language: 'en',
  translationsForLanguage: {
    ...enTranslations,
  },
});

const filters = [
  { type: 'team', demo: 'team' },
  { type: 'messaging', demo: 'team' },
];

const options = { state: true, watch: true, presence: true, limit: 3 };
const sort = { last_message_at: -1, updated_at: -1 };

const client = StreamChat.getInstance(apiKey);

// console.log({ id: userId, name: user, image: getRandomImage(), userToken})

if(isAuth) {
  client.connectUser({ id: userId, name: username, fullName, image: getRandomImage(), hashedPassword }, userToken); 
}

const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  console.log(client.user)

  useChecklist(client, targetOrigin);

  useEffect(() => {
    const handleColorChange = (color) => {
      const root = document.documentElement;
      
      if (color.length && color.length === 7) {
        root.style.setProperty('--primary-color', `${color}E6`);
        root.style.setProperty('--primary-color-alpha', `${color}1A`);
      }
    };

    window.addEventListener('message', (event) => handleColorChange(event.data));

    return () => {
      client.disconnectUser();

      window.removeEventListener('message', (event) => handleColorChange(event.data));
    };
  }, []);

  if (!userToken || !isAuth) return <Auth />;

  return (
    <>
      <div className='app__wrapper'>
        <Chat client={client} i18nInstance={i18nInstance} theme={`team ${theme}`}>
          <ChannelListContainer
              isCreating={isCreating}
              filters={filters}
              options={options}
              setCreateType={setCreateType}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              sort={sort}
          />
          <ChannelContainer
              createType={createType}
              isCreating={isCreating}
              isEditing={isEditing}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
          />
        </Chat>
      </div>
    </>
  );
};

export default App;