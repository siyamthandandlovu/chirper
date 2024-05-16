/* export type TemperatureInputData = {
  tweetID: string,
  timeCreated: string,
  timeUpdated: string
  username: string,
  replies: { username: string, timeCreated: string, timeUpdated: string }[],
  likes: { username: string, timeCreated: string }[],
  retweets: { username: string, timeCreated: string, timeUpdated: string }[],
  countReplies: number,
  countLikes: number,
  countRetweets: number
} */


export interface TweetInteractions {
  tweetDate: string;
  replies: { username: string; date: string }[];
  likes: { username: string; date: string }[];
  retweets: { username: string; date: string }[];
}

export interface Interaction {
  username: string;
  string: string;
}







interface engagementTypeInterface {
  type: string;
  timestamp: string;
  username: string;
}

interface temperatureValuesInterface {
  value: number;
}

interface summaryInterface {
  timestamp: string;
  engagementSpeed: number;
  numberLikes: number;
  numberReplies: number;
  numberRetweets: number;
}

export type TemperatureData = {
  summary: summaryInterface;
  temperatureValues: temperatureValuesInterface[];
  engagementTypes: engagementTypeInterface[];
  interactionIntervals: number[];
}

export function temperatureAlgorithm(data: TweetInteractions): TemperatureData {
  const retweetWeight: number = 9 / 100;
  const likeWeight: number = 3 / 100;
  const replyWeight: number = 15 / 100;
  const decreaseWeight: number = 0.000015;

  let objRetweets: engagementTypeInterface[] = [];
  let objLikes: engagementTypeInterface[] = [];
  let objReplies: engagementTypeInterface[] = [];

  //Operations to get the retweets, likes and replies 

  const tweetCreatedTimestamp: string = data["tweetDate"];
  const countReplies: number = data.replies.length;
  const countLikes: number = data.likes.length;
  const countRetweets: number = data.retweets.length;

  //add the data.replies .likes .retweets to the objRetweets objLikes objReplies objects

  // Process replies
  objReplies = data.replies.map((reply) => ({
    type: "reply",
    timestamp: reply.date,
    username: reply.username,
  }));

  // Process likes
  objLikes = data.likes.map((like) => ({
    type: "like",
    timestamp: like.date,
    username: like.username,
  }));

  // Process retweets
  objRetweets = data.retweets.map((retweet) => ({
    type: "retweet",
    timestamp: retweet.date,
    username: retweet.username,
  }));


  //combine all engagements into one object
  let jsonAllEngagements: engagementTypeInterface[] = [];
  jsonAllEngagements = jsonAllEngagements.concat(objRetweets);
  jsonAllEngagements = jsonAllEngagements.concat(objLikes);
  jsonAllEngagements = jsonAllEngagements.concat(objReplies);


  //sort the engagements
  console.log("Sorted engagements : ",jsonAllEngagements)
  jsonAllEngagements.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
  jsonAllEngagements.unshift({
    type: "inital",
    timestamp: tweetCreatedTimestamp,
    username: "Initial Temperature",
  });


  //get the time intervals (in minutes) during which the tweet wasnt being interacted with
  const jsonInteractionIntervals: number[] = [];

  for (let i = 0; i < jsonAllEngagements.length - 1; i++) {
    const currentTimestamp = Number( String(jsonAllEngagements[i].timestamp));
    const nextTimestamp = Number( String(jsonAllEngagements[i + 1].timestamp));
    
/*     const timeDifference = Math.floor(
      Math.abs(nextTimestamp.getTime() - currentTimestamp.getTime()) /
        (1000 * 60)
    ); */ 

    const timeDifference = Math.floor(
      Math.abs(nextTimestamp - currentTimestamp) / (1000 * 60)
    );
    jsonInteractionIntervals.push(timeDifference);
  }

  const sum = jsonInteractionIntervals.reduce((acc, curr) => acc + curr, 0);

  //get average engagment speed
  const engagementSpeed = Math.floor(sum / jsonInteractionIntervals.length);

  //calculate temperature values
  const jsonAllTemperatureValues: temperatureValuesInterface[] = [];
  const initialTemperature: number = 22;
  let temp: number = initialTemperature;

  jsonAllEngagements.forEach((engagement, index) => {
    let currTemp: number = initialTemperature;
    switch (engagement.type) {
      case "retweet":
        currTemp =
          temp *
          Math.exp(-decreaseWeight * jsonInteractionIntervals[index - 1]);
        temp = currTemp + currTemp * retweetWeight;
        break;
      case "like":
        currTemp =
          temp *
          Math.exp(-decreaseWeight * jsonInteractionIntervals[index - 1]);
        temp = currTemp + currTemp * likeWeight;
        break;
      case "reply":
        currTemp =
          temp *
          Math.exp(-decreaseWeight * jsonInteractionIntervals[index - 1]);
        temp = currTemp + currTemp * replyWeight;
        break;
    }

    const roundedTemp = parseFloat(temp.toFixed(2));
/*     jsonAllTemperatureValues.push({ value: roundedTemp });
 */    jsonAllTemperatureValues.push({ value: currTemp });
  });

  //combining data to be sent
  const jsonSummary: summaryInterface = {
    timestamp: tweetCreatedTimestamp,
    engagementSpeed: engagementSpeed,
    numberLikes: countReplies,
    numberReplies: countLikes,
    numberRetweets: countRetweets,
  };

  const jsonResponse: TemperatureData = {
    summary: jsonSummary,
    temperatureValues: jsonAllTemperatureValues,
    engagementTypes: jsonAllEngagements,
    interactionIntervals: jsonInteractionIntervals,
  };

  console.log(jsonResponse);
  return jsonResponse;
}



//=========================== AUXILLARY FUNCTIONS ==================================

