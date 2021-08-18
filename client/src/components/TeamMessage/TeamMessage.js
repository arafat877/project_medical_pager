import React from 'react';
import { MessageTeam, useMessageContext } from 'stream-chat-react';

import './TeamMessage.css';

export const TeamMessage = (props) => {
  const { handleOpenThread, message } = useMessageContext();

  const handleOpenThreadOverride = (event) => {
    handleOpenThread(event);
  };

  return (
      <MessageTeam  message={message} handleOpenThread={handleOpenThreadOverride} />
  );
};

// Hey Kimmy, and everybody else from Stream's great team. 
// Before we hop on a call, to save everybodys time, I decided to record
// a quick screenshare to make sure we're all on the same page.

// Thank you so much for laying out these ideas in a short and easy to understand document!

// Let's start with the requierments: full stack and web based, makes full sense.
// Relatively easy for beginners to follow, absolutely. Although key word here is relatively.
// Some concepts we'll dive into are a bit more complex but it should still be beginner oriented.

// I love all three ideas you've mentioned. And if you guys agree with me, I think the first one might make most sense and produce the best outcome.
// I've done some topic research and there doesn't seem to be a lot of demand for tutorials about video streaming services. 
// The topic is overly saturated, and there's a lot of content out there already. Let me give you an example:
// only 8k, 4k, 200 views, and there's 300k,  about a year ago.
// same thing goes for the virual event platform.

// I love the medical pager idea. It showcases most of the stream's great features.
// I've already built a demo app that I'd love to get your thoughts on.

// Demo the login, features...

// There are still minor things I might need some help with when it comes to utilizing stream's features. 
// So if you could connect me with somebody from the engineering team (maybe somebody who helped created the chat demos on the getstream website), that would be great.

// That would be it, I hope this was helpful. 

// Please let me know your thoughts, what would be somethings you'd want to change and similar

// Thanks you so much for your time, and let's keep in touch.

// Talk soon and have a great weekend.
