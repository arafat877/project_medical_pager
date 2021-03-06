import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

import { InviteIcon } from '../assets';

const ListContainer = ({ children }) => {
  return (
    <div className='user-list__container'>
      <div className='user-list__header'>
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};

const UserItem = ({ setSelectedUsers, user }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    if (selected) {
      setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id));
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
    }
    setSelected(!selected);
  };

  return (
    <div className='user-item__wrapper' onClick={handleClick}>
      <div className='user-item__name-wrapper'>
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className='user-item__name'>{user.fullName || user.id}</p>
      </div>
      {selected ? <InviteIcon /> : <div className='user-item__invite-empty' />}
    </div>
  );
};

const UserList = ({ filters, setSelectedUsers }) => {
  const { client } = useChatContext();

  const [error, setError] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;
      
      setLoading(true);

      try {
        const response = await client.queryUsers(
          { id: { $ne: client.userID }, ...filters },
          { id: 1 },
          { limit: 8 },
        );

        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (err) {
        setError(true);
      }

      setLoading(false);
    };

    if (client) getUsers();
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <ListContainer>
        <div className='user-list__message'>Error loading, please refresh and try again.</div>
      </ListContainer>
    );
  }

  if (listEmpty) {
    return (
      <ListContainer>
        <div className='user-list__message'>No users found.</div>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {loading ? (
        <div className='user-list__message'>Loading users...</div>
      ) : (
        users?.length &&
        users.map((user, i) => (
          <UserItem index={i} key={user.id} setSelectedUsers={setSelectedUsers} user={user} />
        ))
      )}
    </ListContainer>
  );
};

export default UserList;