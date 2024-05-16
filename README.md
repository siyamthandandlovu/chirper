
# Chirper Temperature API

1. Overview
2. Tutorial
3. Examples


## Input

```typescript
replies: { username: string, date: date}[],
likes: { username: string, date: date}[],
retweets: { username: string, date: date}[],
``` 

## Examples
```typescript
 { "tweetDate":"2024-05-15T08:00:00Z",
    "replies": [
      { "username": "user1", "date": "2024-05-15T08:00:00Z" },
      { "username": "user2", "date": "2024-05-15T08:15:00Z" },
      { "username": "user3", "date": "2024-05-15T08:30:00Z" }
    ],
    "likes": [
      { "username": "user4", "date": "2024-05-15T09:00:00Z" },
      { "username": "user5", "date": "2024-05-15T09:05:00Z" },
      { "username": "user6", "date": "2024-05-15T09:10:00Z" }
    ],
    "retweets": [
      { "username": "user7", "date": "2024-05-15T10:00:00Z" },
      { "username": "user8", "date": "2024-05-15T10:15:00Z" },
      { "username": "user9", "date": "2024-05-15T10:30:00Z" }
    ]
  }
```


## Errors
### Invalid Timestamps 
Returns this if :
- the timestamps are not Unix timestamps
- a timestamp has a stamp earlier than the time of 20 March 2006

