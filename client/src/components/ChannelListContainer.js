import React, { useState } from "react";
import { ChannelList } from "stream-chat-react";

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import HospitalIcon from "../assets/hospital.png";

const SideBar = () => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={HospitalIcon} alt="Hospital" width="30" />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Medical Pager</p>
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContent = ({ setCreateType, setIsCreating, setIsEditing }) => {
  return (
    <>
      <SideBar />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              setCreateType={setCreateType}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              type="team"
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              type="team"
            />
          )}
        />
        <ChannelList
          channelRenderFilterFn={customChannelMessagingFilter}
          setActiveChannelOnMount={false}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              setCreateType={setCreateType}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              type="messaging"
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <div className="channel-list__container">
        {
          <ChannelListContent
            setCreateType={setCreateType}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
          />
        }
      </div>

      <div
        className="channel-list__container-responsive"
        style={{ left: toggleContainer ? "0%" : "-89%", background: "#005fff" }}
      >
        <div
          className="channerl-list__container-toggle"
          onClick={() => setToggleContainer(!toggleContainer)}
        ></div>
        {toggleContainer ? (
          <ChannelListContent
            setCreateType={setCreateType}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
          />
        ) : null}
      </div>
    </>
  );
};

export default ChannelListContainer;
