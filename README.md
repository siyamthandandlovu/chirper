<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://github.com/siyamthandandlovu/documentation/assets/99127918/d164bb02-8c5d-43b6-85d2-cb1c86cab51c" width="120" alt="Nest Logo" /></a>
</p>


# Chirper Temperature API

1. [Overview](https://github.com/siyamthandandlovu/chirper/edit/master/README.md#1-overview)
2. [Tutorial](https://github.com/siyamthandandlovu/chirper/edit/master/README.md#2-tutorial)
3. [Code Snippets](https://github.com/siyamthandandlovu/chirper/edit/master/README.md#3-code-snippets)
4. [Errors](https://github.com/siyamthandandlovu/chirper/edit/master/README.md#4-errors)


## 1. Overview

The Chirper Temperature Algorithm is one that calculates the overall "temperature" of a tweet based on the interactions the tweet has had.

It was written by me 😄, [Siyamthanda](https://siyamthandandlovu.netlify.app/) as a part of a Twitter Clone project that I took as a part of the [Software Engineering Module](https://www.cs.up.ac.za/module/cos301/).

While the full implemented clone remains private, I am able to publish

### Tech Stack
<p align="">
    <img src="https://skillicons.dev/icons?i=typescript,nodejs,express,npm" />
</p>


## 2. Tutorial

1. The`POST `requests
2. The `body `of the post has to have the following format : 



## Input

```typescript
replies: { username: string, date: date}[],
likes: { username: string, date: date}[],
retweets: { username: string, date: date}[],
``` 

## 3. Code Snippets
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


## 4. Errors
### Invalid Timestamps 
Returns this if :
- the timestamps are not Unix timestamps
- a timestamp has a stamp earlier than the time of 20 March 2006

