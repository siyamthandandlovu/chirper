<p align="center">
  <a href="" target="blank"><img src="https://github.com/siyamthandandlovu/documentation/assets/99127918/d164bb02-8c5d-43b6-85d2-cb1c86cab51c" width="120" alt="Nest Logo" /></a>
</p>

# Chirper Temperature API
 
 
1. [Overview](https://github.com/siyamthandandlovu/chirper/tree/documentation?tab=readme-ov-file#1-overview)
2. [Tutorial](https://github.com/siyamthandandlovu/chirper/tree/documentation?tab=readme-ov-file#2-tutorial)
3. [Code Snippets](https://github.com/siyamthandandlovu/chirper/tree/documentation?tab=readme-ov-file#3-code-snippets)
4. [Errors](https://github.com/siyamthandandlovu/chirper/tree/documentation?tab=readme-ov-file#4-errors)
5. [Local Deployment](https://github.com/siyamthandandlovu/chirper/tree/documentation?tab=readme-ov-file#5-local-deployment)
6. [License](https://github.com/siyamthandandlovu/chirper/tree/documentation?tab=readme-ov-file#6-license)
7. [Notes From Author](https://github.com/siyamthandandlovu/chirper/tree/documentation?tab=readme-ov-file#7-notes-from-author)


# 1. OVERVIEW


 The Chirper Algorithm is one that provides users with an intuitive way of understanding the popularity of a tweet. The algorithm **calculates the overall "temperature"** of a tweet **based on the interactions the tweet has had**. It determines a tweet's popularity by increasing the tweet's temperature based on the type of interaction and decreasing the temperature during the time when the tweet isn't being interacted with.

 The Chirper Algorithm was originally part of a lightweight Twitter clone project that I, [Siyamthanda Ndlovu](https://siyamthandandlovu.netlify.app/), worked on as a part of a [Software Engineering module](https://www.cs.up.ac.za/module/cos301/) I am enrolled in as a Computer Science student.

**Twitter clone was completed along with my team members and while the project itself will remain private, I am able to publish the algorithm I developed, along with the source code.**


## TECH STACK
<p align="">
    <img src="https://skillicons.dev/icons?i=typescript,nodejs,express" />
</p>


# 2. TUTORIAL


1. The API recieves `POST` requests to the link : 
## https://chirper-hcsu.onrender.com/api

2. The parameters are send in the body of the POST request
3. The `body` of the POST has to have the following format : 

## INPUT INTERFACE

```typescript
interface Tweet {
  tweetDate: string;
  replies: { username: string; date: string }[];
  likes: { username: string; date: string }[];
  retweets: { username: string; date: string }[];
}
``` 



## OUTPUT INTERFACE


```typescript
interface ApiResponse {
  message: string;
  responseBody: {
    summary: {
      timestamp: string;
      engagementSpeed: number;
      numberLikes: number;
      numberReplies: number;
      numberRetweets: number;
    };
    temperatureValues: { value: number }[];
    engagementTypes: {
      type: string;
      timestamp: string;
      username: string;
    }[];
    interactionIntervals: number[];
  };
}
``` 
# 3. CODE SNIPPETS

## SAMPLE JSON INPUT
```typescript
 {
  tweetDate: "1684156800000",
        replies: [
          {
            username: "alice_wonderland",
            date: "1684232400000",
          },
          {
            username: "bob_builder",
            date: "1684308000000",
          },
          {
            username: "charlie_brown",
            date: "1684383600000",
          },
        ],
        likes: [
          {
            username: "daisy_duke",
            date: "1684459200000",
          },
          {
            username: "edward_snowden",
            date: "1684534800000",
          },
        ],
        retweets: [
          {
            username: "fiona_apple",
            date: "1684610400000",
          },
          {
            username: "george_clooney",
            date: "1684686000000",
          },
          {
            username: "hannah_montana",
            date: "1684761600000",
          },
        ],
}

```

## XMLHTTPREQUEST

```javascript
   const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://chirper-hcsu.onrender.com/api");
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      const body = JSON.stringify({
        tweetDate: "1684156800000",
        replies: [
          {
            username: "alice_wonderland",
            date: "1684232400000",
          },
          {
            username: "bob_builder",
            date: "1684308000000",
          },
          {
            username: "charlie_brown",
            date: "1684383600000",
          },
        ],
        likes: [
          {
            username: "daisy_duke",
            date: "1684459200000",
          },
          {
            username: "edward_snowden",
            date: "1684534800000",
          },
        ],
        retweets: [
          {
            username: "fiona_apple",
            date: "1684610400000",
          },
          {
            username: "george_clooney",
            date: "1684686000000",
          },
          {
            username: "hannah_montana",
            date: "1684761600000",
          },
        ],
      });
      xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(JSON.parse(xhr.responseText));
        } else {
          console.log(`Error: ${xhr.status} ${xhr.responseText}`);
        }
      };
      xhr.send(body);

``` 

## SAMPLE JSON OUTPUT

```typescript
{
    "message": "Temperature Values Ready",
    "responseBody": {
        "summary": {
            "timestamp": "1684156800000",
            "engagementSpeed": 1260,
            "numberLikes": 3,
            "numberReplies": 2,
            "numberRetweets": 3
        },
        "temperatureValues": [
            {
                "value": 22
            },
            {
                "value": 21.588104671871992
            },
            {
                "value": 24.36150921919348
            },
            {
                "value": 27.491210574410538
            },
            {
                "value": 31.022981870562553
            },
            {
                "value": 31.35541823867956
            },
            {
                "value": 31.691416931633942
            },
            {
                "value": 33.89690055694793
            },
            {
                "value": 36.25586921046438
            }
        ],
        "engagementTypes": [
            {
                "type": "inital",
                "timestamp": "1684156800000",
                "username": "Initial Temperature"
            },
            {
                "type": "reply",
                "timestamp": "1684232400000",
                "username": "alice_wonderland"
            },
            {
                "type": "reply",
                "timestamp": "1684308000000",
                "username": "bob_builder"
            },
            {
                "type": "reply",
                "timestamp": "1684383600000",
                "username": "charlie_brown"
            },
            {
                "type": "like",
                "timestamp": "1684459200000",
                "username": "daisy_duke"
            },
            {
                "type": "like",
                "timestamp": "1684534800000",
                "username": "edward_snowden"
            },
            {
                "type": "retweet",
                "timestamp": "1684610400000",
                "username": "fiona_apple"
            },
            {
                "type": "retweet",
                "timestamp": "1684686000000",
                "username": "george_clooney"
            },
            {
                "type": "retweet",
                "timestamp": "1684761600000",
                "username": "hannah_montana"
            }
        ],
        "interactionIntervals": [
            1260,
            1260,
            1260,
            1260,
            1260,
            1260,
            1260,
            1260
        ]
    }
}
``` 


# 4. ERRORS
## INVALID TIMESTAMPS 
The API returns this if :
- the timestamps are not Unix timestamps
- a timestamp has a stamp earlier than the time of 20 March 2006 (the date of the creation of twitter)

## INVALID STRUCTURE
The API returns this if :
- the tweet date, replies like or retweets are missing

# 5. LOCAL DEPLOYMENT

**Prerequisites**
Make sure you have the following installed on your machine:

1. [Node.js](https://nodejs.org/) (version 14 or higher)
2. [npm](https://www.npmjs.com/) (Node Package Manager)
3. [Git](https://git-scm.com/)


Follow these steps to deploy the API on your local machine and visit it at http://localhost:8080.

## Steps

1. **Clone the API Repository:**

    ```bash
    git clone https://github.com/siyamthandandlovu/chirper.git
    ```
 
2. **Navigate to the API Directory:**

    ```bash
    cd chirper
    ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```

5. **Build TypeScript Code:**

    ```bash
    npm run build
    ```

6. **Start the API Server:**

    ```bash
    npm start
    ```

     By default, it should run on port 8080.

7. **Visit Localhost:**

    Open your web browser and visit the following URL:

    ```
    http://localhost:8080
    ```

    You should now be able to interact with your TypeScript Node.js API locally.

You can use tools like [Postman](https://www.postman.com/) or [Thunderclient](https://www.thunderclient.com/) to interact with the API endpoints.



# 6. LICENSE
Chirper is [MIT Licensed](https://github.com/siyamthandandlovu/chirper/blob/documentation/LICENSE).


# 7. NOTES FROM AUTHOR
I'm really open to suggestions on how to improve the API and its functionality. I also developed a Next.js frontend component during the project, so I'm planning on releasing that soon and integrating it with the API.
In the meantime, if you have any suggestions/improvements, feel free to open an issue 

Otherwise feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/siyamthandandlovu/) or by [email](SIYAMTHANDA.NDLOVU.GASA@GMAIL.COM).
