import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';


import { getRandomImage } from './assets';
import { useChecklist } from './ChecklistTasks';
import { ChannelContainer, ChannelListContainer, Auth } from './components';

import 'stream-chat-react/dist/css/index.css';
import './App.css';

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
        <Chat client={client} theme={`team ${theme}`}>
          <ChannelListContainer
              isCreating={isCreating}
              setCreateType={setCreateType}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
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