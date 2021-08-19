import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { getRandomImage } from './assets';
import { useChecklist } from './ChecklistTasks';
import { ChannelContainer, ChannelListContainer, Auth } from './components';

import 'stream-chat-react/dist/css/index.css';
import './App.css';

const cookies = new Cookies();
const apiKey =  'e6nfz3p5c2qb';
const userId = cookies.get('userId') || 'adrianhajdin';
const username = cookies.get('username') || 'adrianhajdin';
const fullName = cookies.get('fullName') || 'adrianhajdin';
const userToken = cookies.get('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRyaWFuaGFqZGluIn0._zEuN5lihKojvwOpvA62sVH_L7vU7Ph8W7lvfdk4lfc';
const hashedPassword = cookies.get('hashedPassword');
const isAuth = cookies.get('isAuth');

const client = StreamChat.getInstance(apiKey);

if (isAuth) client.connectUser({ id: userId, name: username, fullName, image: getRandomImage(), hashedPassword }, userToken); 

const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useChecklist(client);

  if (!userToken || !isAuth) return <Auth />;

  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team light'>
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

export default App;