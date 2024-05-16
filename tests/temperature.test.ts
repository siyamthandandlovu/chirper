const MILLISECONDS_IN_A_WEEK = 1000 * 60 * 60 * 24 * 7;
const WEEKS_IN_A_MONTH = 4;

// Function to generate a random timestamp within the last 4 weeks
function generateRecentTimestamp(): string {
  const now = Date.now();
  const fourWeeksAgo = now - MILLISECONDS_IN_A_WEEK * WEEKS_IN_A_MONTH;
  const randomTimestamp =
    Math.floor(Math.random() * (now - fourWeeksAgo)) + fourWeeksAgo;
  return randomTimestamp.toString();
}

const jsonData = {
  tweetDate: generateRecentTimestamp(),
  replies: [
    { username: "user1", date: generateRecentTimestamp() },
    { username: "user2", date: generateRecentTimestamp() },
    { username: "user3", date: generateRecentTimestamp() },
  ],
  likes: [
    { username: "user5", date: generateRecentTimestamp() },
    { username: "user6", date: generateRecentTimestamp() },
  ],
  retweets: [
    { username: "user7", date: generateRecentTimestamp() },
    { username: "user8", date: generateRecentTimestamp() },
    { username: "user9", date: generateRecentTimestamp() },
  ],
};

console.log(JSON.stringify(jsonData, null, 2));
let jsonData1= 
{
  "tweetDate": "1684156800000",
  "replies": [
    { "username": "user1", "date": "1684232400000" },
    { "username": "user2", "date": "1684308000000" },
    { "username": "user3", "date": "1684383600000" }
  ],
  "likes": [
    { "username": "user5", "date": "1684459200000" },
    { "username": "user6", "date": "1684534800000" }
  ],
  "retweets": [
    { "username": "user7", "date": "1684610400000" },
    { "username": "user8", "date": "1684686000000" },
    { "username": "user9", "date": "1684761600000" }
  ]
}
