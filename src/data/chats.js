export const INITIAL_MESSAGES = {
  1: [
    { id: 1, me: false, text: "Hey! I saw you're also into indie concerts in Tel Aviv! 🎵", time: '2:30 PM' },
    { id: 2, me: true,  text: "Yes!! I love indie music. Are you going to the Arctic Monkeys tribute?", time: '2:31 PM' },
    { id: 3, me: false, text: "OMG YES 😊 I have two tickets and was looking for someone to go with!", time: '2:32 PM' },
    { id: 4, me: true,  text: "That's amazing! I'd love to join. Which date?", time: '2:33 PM' },
    { id: 5, me: false, text: "Are you going to the Radiohead tribute on Friday? 🎸", time: '2:35 PM' },
  ],
  2: [
    { id: 1, me: false, text: "Daft Punk tribute is coming to TLV next month 🎧", time: '1:00 PM' },
    { id: 2, me: true,  text: "No way! I've been waiting for this forever", time: '1:02 PM' },
    { id: 3, me: false, text: "I found two tickets for the Daft Punk tribute!", time: '1:05 PM' },
  ],
  3: [
    { id: 1, me: true,  text: "That Jazz bar in Florentin sounds amazing!", time: '10:00 AM' },
    { id: 2, me: false, text: "It is! Let's go this Friday?", time: '10:05 AM' },
    { id: 3, me: false, text: "That jazz bar in Florentin is amazing btw", time: '10:06 AM' },
  ],
};

export const CHATS_LIST = [
  { id: 1, profileId: 1, shared: 'Indie concerts • Tel Aviv',    unread: 2, time: '2m ago'  },
  { id: 2, profileId: 2, shared: 'Electronic music • Tel Aviv',  unread: 0, time: '1h ago'  },
  { id: 3, profileId: 5, shared: 'Jazz • Tel Aviv',              unread: 1, time: '3h ago'  },
];

export const AUTO_REPLIES = [
  "Sounds great! 😊",
  "I was thinking the same thing!",
  "Let me check my schedule and get back to you!",
  "That's perfect! 🎵",
  "Yes!! I'm so excited for this!",
  "Omg same, can't wait 🙌",
  "This is going to be amazing 🎉",
];
