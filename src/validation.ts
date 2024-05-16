import { type Interaction, type TweetInteractions } from "./temperature"


//========================= VALIDATE API INPUT INTERFACE ===============================

export function validateInterfaceTweetInteractions(
  data: any
): data is { username: string; date: string } {
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

function isValidInteraction(interaction: any): interaction is Interaction {
  return (
    typeof interaction === "object" &&
    "username" in interaction &&
    typeof interaction.username === "string" &&
    "date" in interaction &&
    typeof interaction.date === "string" 
  );
}


//========================= VALIDATE TIME STAMP IN DATA ===============================

/* 
export function validateTimestamps {

}  */

 export function validateTimestampsAllUnix(data: any): boolean {
   // Check if tweetDate is a valid Unix timestamp string
   if (!isValidUnixTimestampString(data.tweetDate)) {
     return false;
   }

   // Check if each interaction array contains valid Unix timestamp strings
   if (
     !data.replies.every((reply: { date: any }) =>
       isValidUnixTimestampString(reply.date)
     ) ||
     !data.likes.every((like: { date: any }) =>
       isValidUnixTimestampString(like.date)
     ) ||
     !data.retweets.every((retweet: { date: any }) =>
       isValidUnixTimestampString(retweet.date)
     )
   ) {
     return false;
   }

   return true;
 }

 function isValidUnixTimestampString(timestamp: any): boolean {
   if (typeof timestamp !== "string") {
     return false;
   }

   const timestampNumber = Number(timestamp);

   // Check if timestamp is a number and within the valid range (after March 20, 2006)
   return (
     !isNaN(timestampNumber) && timestampNumber >= 1142793600000 // March 20, 2006 in milliseconds
   );
 }

