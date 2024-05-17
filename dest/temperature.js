"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.temperatureAlgorithm = void 0;
function temperatureAlgorithm(data) {
    var retweetWeight = 9 / 100;
    var likeWeight = 3 / 100;
    var replyWeight = 15 / 100;
    var decreaseWeight = 0.000015;
    var objRetweets = [];
    var objLikes = [];
    var objReplies = [];
    //Operations to get the retweets, likes and replies 
    var tweetCreatedTimestamp = data["tweetDate"];
    var countReplies = data.replies.length;
    var countLikes = data.likes.length;
    var countRetweets = data.retweets.length;
    //add the data.replies .likes .retweets to the objRetweets objLikes objReplies objects
    // Process replies
    objReplies = data.replies.map(function (reply) { return ({
        type: "reply",
        timestamp: reply.date,
        username: reply.username,
    }); });
    // Process likes
    objLikes = data.likes.map(function (like) { return ({
        type: "like",
        timestamp: like.date,
        username: like.username,
    }); });
    // Process retweets
    objRetweets = data.retweets.map(function (retweet) { return ({
        type: "retweet",
        timestamp: retweet.date,
        username: retweet.username,
    }); });
    //combine all engagements into one object
    var jsonAllEngagements = [];
    jsonAllEngagements = jsonAllEngagements.concat(objRetweets);
    jsonAllEngagements = jsonAllEngagements.concat(objLikes);
    jsonAllEngagements = jsonAllEngagements.concat(objReplies);
    //sort the engagements
    console.log("Sorted engagements : ", jsonAllEngagements);
    jsonAllEngagements.sort(function (a, b) { return (a.timestamp > b.timestamp ? 1 : -1); });
    jsonAllEngagements.unshift({
        type: "inital",
        timestamp: tweetCreatedTimestamp,
        username: "Initial Temperature",
    });
    //get the time intervals (in minutes) during which the tweet wasnt being interacted with
    var jsonInteractionIntervals = [];
    for (var i = 0; i < jsonAllEngagements.length - 1; i++) {
        var currentTimestamp = Number(String(jsonAllEngagements[i].timestamp));
        var nextTimestamp = Number(String(jsonAllEngagements[i + 1].timestamp));
        /*     const timeDifference = Math.floor(
              Math.abs(nextTimestamp.getTime() - currentTimestamp.getTime()) /
                (1000 * 60)
            ); */
        var timeDifference = Math.floor(Math.abs(nextTimestamp - currentTimestamp) / (1000 * 60));
        jsonInteractionIntervals.push(timeDifference);
    }
    var sum = jsonInteractionIntervals.reduce(function (acc, curr) { return acc + curr; }, 0);
    //get average engagment speed
    var engagementSpeed = Math.floor(sum / jsonInteractionIntervals.length);
    //calculate temperature values
    var jsonAllTemperatureValues = [];
    var initialTemperature = 22;
    var temp = initialTemperature;
    jsonAllEngagements.forEach(function (engagement, index) {
        var currTemp = initialTemperature;
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
        var roundedTemp = parseFloat(temp.toFixed(2));
        /*     jsonAllTemperatureValues.push({ value: roundedTemp });
         */ jsonAllTemperatureValues.push({ value: currTemp });
    });
    //combining data to be sent
    var jsonSummary = {
        timestamp: tweetCreatedTimestamp,
        engagementSpeed: engagementSpeed,
        numberLikes: countReplies,
        numberReplies: countLikes,
        numberRetweets: countRetweets,
    };
    var jsonResponse = {
        summary: jsonSummary,
        temperatureValues: jsonAllTemperatureValues,
        engagementTypes: jsonAllEngagements,
        interactionIntervals: jsonInteractionIntervals,
    };
    console.log(jsonResponse);
    return jsonResponse;
}
exports.temperatureAlgorithm = temperatureAlgorithm;
//# sourceMappingURL=temperature.js.map