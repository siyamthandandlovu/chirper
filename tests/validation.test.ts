console.clear();

import type {TweetInteractions} from "../temperature.ts"
import { validateTimestampsAllUnix } from "../validation.ts";
function isValidTweetInteractions(data: any): data is TweetInteractions {
  if (
    typeof data === "object" &&
    "tweetDate" in data &&
    "replies" in data &&
    "likes" in data &&
    "retweets" in data &&
    Array.isArray(data.replies) &&
    Array.isArray(data.likes) &&
    Array.isArray(data.retweets)
  ) {
    // Check if each interaction array contains valid interactions
    if (
      data.replies.every((reply: any) => isValidInteraction(reply)) &&
      data.likes.every((like: any) => isValidInteraction(like)) &&
      data.retweets.every((retweet: any) => isValidInteraction(retweet))
    ) {
      return true;
    }
  }
  return false;
}

function isValidInteraction(
  interaction: any
): interaction is { username: string; date: Date } {
  return (
    typeof interaction === "object" &&
    "username" in interaction &&
    typeof interaction.username === "string" &&
    "date" in interaction &&
    typeof interaction.date === "string" && // Assuming date is in string format
    !isNaN(Date.parse(interaction.date))
  );
}

// Example usage
const jsonData1 = {
  tweetDate: "2024-05-15T08:00:00Z",
  replies: [
    { username: "user1", date: "2024-05-15T08:00:00Z" },
    { username: "user2", date: "2024-05-15T08:15:00Z" },
    { username: "user3", date: "2024-05-15T08:30:00Z" },
  ],
  likes: [
    { username: "user4", date: "2024-05-15T09:00:00Z" },
    { username: "user5", date: "2024-05-15T09:05:00Z" },
    { username: "user6", date: "2024-05-15T09:10:00Z" },
  ],
  retweets: [
    { username: "user7", date: "2024-05-15T10:00:00Z" },
    { username: "user8", date: "2024-05-15T10:15:00Z" },
    { username: "user9", date: "2024-05-15T10:30:00Z" },
  ],
};

if (isValidTweetInteractions(jsonData1)) {
  console.log("Valid Tweet Interactions data!");
} else {
  console.log("Invalid Tweet Interactions data!");
}

const jsonData2 = {
  replies: [
    { username: "user1", date: "2024-05-15T08:00:00Z" },
    { username: "user2" },
    { username: "user3", date: "2024-05-15T08:30:00Z" },
  ],
  likes: [
    { username: "user4", date: "2024-05-15T09:00:00Z" },
    { username: "user5", date: "2024-05-15T09:05:00Z" },
    { username: "user6", date: "2024-05-15T09:10:00Z" },
  ],
  retweets: [
    { username: "user7", date: "2024-05-15T10:00:00Z" },
    { username: "user8", date: "2024-05-15T10:15:00Z" },
    { username: "user9", date: "2024-05-15T10:30:00Z" },
  ],
};

if (isValidTweetInteractions(jsonData2)) {
  console.log("Valid Tweet Interactions data");
} else {
  console.log("Invalid Tweet Interactions data");
}

const jsonData3 = {
  replies: [
    { username: "user1", date: "2024-05-15T08:00:00Z" },
    { username: "user2", date: "2024-05-15T08:00:00Z" },
    { username: "user3", date: "2024-05-15T08:30:00Z" },
  ],
  likes: [
    { username: "user4", date: "2024-05-15T09:00:00Z" },
    { username: "user5", date: "2024-05-15T09:05:00Z" },
    { username: "user6", date: "2024-05-15T09:10:00Z" },
  ],
};

if (isValidTweetInteractions(jsonData3)) {
  console.log("Valid Tweet Interactions data");
} else {
  console.log("Invalid Tweet Interactions data");
}

const jsonData4 = {
  tweetDate: Date,
  replies: [
    { username: "user1", date: "2024-05-15T08:00:00Z" },
    { username: "user2", date: "2024-05-15T08:00:00Z" },
    { username: "user3", date: "2024-05-15T08:30:00Z" },
  ],
  likes: [
    { username: "user4", date: "2024-05-15T09:00:00Z" },
    { username: "user5", date: "2024-05-15T09:05:00Z" },
    { username: "user6", date: "2024-05-15T09:10:00Z" },
  ],

  retweets: [
    { username: "user7", date: "2024-05-15T10:00:00Z" },
    { username: "user8", date: "2024-05-15T10:15:00Z" },
    { username: "user9", date: "2024-05-15T10:30:00Z" },
  ],
};

if (isValidTweetInteractions(jsonData4)) {
  console.log("Valid Tweet Interactions data");
} else {
  console.log("Invalid Tweet Interactions data");
}

//============================== Testing validate Timestamps ==================================

// Example usage
const jsonData5: any = {
  tweetDate: "1645682400000", // Unix timestamp string for February 23, 2022
  replies: [
    { username: "user1", date: "1645682500000" }, // Unix timestamp string for February 23, 2022
    { username: "user2", date: "1645682600000" },
    { username: "user3", date: "1645682700000" }
  ],
  likes: [
    { username: "user4", date: "1645682800000" },
    { username: "user5", date: "1645682900000" },
    { username: "user6", date: "1645683000000" }
  ],
  retweets: [
    { username: "user7", date: "1645683100000" },
    { username: "user8", date: "1645683200000" },
    { username: "user9", date: "1645683300000" }
  ]
};

if (validateTimestampsAllUnix(jsonData5)) {
  console.log("Valid timestamps!");
} else {
  console.log("Invalid timestamps!");
}

const jsonData6: any = {
  tweetDate: "2024-05-15T08:00:00Z",
  replies: [
    { username: "user1", date: "2024-05-15T08:00:00Z" },
    { username: "user2", date: "2024-05-15T08:15:00Z" },
    { username: "user3", date: "2024-05-15T08:30:00Z" },
  ],
  likes: [
    { username: "user4", date: "2024-05-15T09:00:00Z" },
    { username: "user5", date: "2024-05-15T09:05:00Z" },
    { username: "user6", date: "2024-05-15T09:10:00Z" },
  ],
  retweets: [
    { username: "user7", date: "2024-05-15T10:00:00Z" },
    { username: "user8", date: "2024-05-15T10:15:00Z" },
    { username: "user9", date: "2024-05-15T10:30:00Z" },
  ],
};
