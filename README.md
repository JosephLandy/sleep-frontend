This is the frontend for an application I built to record various data about my sleep. I wanted something simple to use that I could fill out easily while a bit groggy in the morning. I also wanted to define the values I'm interested in tracking myself, rather than adapting to someone elses form. I can easily modify the form and extend it in future as I use it. 

Because I developed it for my own personal use, I mainly intended it to run locally on my own computer and there is no support for multiple users. 

You can find the backend in the sleep-backend-api repository. The interface is based on the Material-ui library, and I used Storybook to develop the GUI components in isolation. Use `npm run storybook` to view them at localhost:9009.

`npm start` to run the app in development mode at localhost:3000.

Note that both Storybook, and the app in development mode proxy api requests to localhost:5000, where the backend runs by default. 
