"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTimestampsAllUnix = exports.validateInterfaceTweetInteractions = void 0;
//========================= VALIDATE API INPUT INTERFACE ===============================
function validateInterfaceTweetInteractions(data) {
    if (typeof data === "object" &&
        "tweetDate" in data &&
        "replies" in data &&
        "likes" in data &&
        "retweets" in data &&
        Array.isArray(data.replies) &&
        Array.isArray(data.likes) &&
        Array.isArray(data.retweets)) {
        // Check if each interaction array contains valid interactions
        if (data.replies.every(function (reply) { return isValidInteraction(reply); }) &&
            data.likes.every(function (like) { return isValidInteraction(like); }) &&
            data.retweets.every(function (retweet) { return isValidInteraction(retweet); })) {
            return true;
        }
    }
    return false;
}
exports.validateInterfaceTweetInteractions = validateInterfaceTweetInteractions;
function isValidInteraction(interaction) {
    return (typeof interaction === "object" &&
        "username" in interaction &&
        typeof interaction.username === "string" &&
        "date" in interaction &&
        typeof interaction.date === "string");
}
//========================= VALIDATE TIME STAMP IN DATA ===============================
/*
export function validateTimestamps {

}  */
function validateTimestampsAllUnix(data) {
    // Check if tweetDate is a valid Unix timestamp string
    if (!isValidUnixTimestampString(data.tweetDate)) {
        return false;
    }
    // Check if each interaction array contains valid Unix timestamp strings
    if (!data.replies.every(function (reply) {
        return isValidUnixTimestampString(reply.date);
    }) ||
        !data.likes.every(function (like) {
            return isValidUnixTimestampString(like.date);
        }) ||
        !data.retweets.every(function (retweet) {
            return isValidUnixTimestampString(retweet.date);
        })) {
        return false;
    }
    return true;
}
exports.validateTimestampsAllUnix = validateTimestampsAllUnix;
function isValidUnixTimestampString(timestamp) {
    if (typeof timestamp !== "string") {
        return false;
    }
    var timestampNumber = Number(timestamp);
    // Check if timestamp is a number and within the valid range (after March 20, 2006)
    return (!isNaN(timestampNumber) && timestampNumber >= 1142793600000 // March 20, 2006 in milliseconds
    );
}
//# sourceMappingURL=validation.js.map