3-11-26
From now on I'll start documenting here all the issues and the measures by which i solved them. 

Problem: I added the Authentication feature in the application. But currently the user is getting the common chat means he has no option to save his personal chat in the db so now i'll be implementing Multi-user Chat Management . 
Sol: I changed the  schema for implementing multi user.

05/11/2026
1. The problem was that MongoDB had a unique index on conversationId.
It allowed only one document to have a particular conversationId.
But in our chatbot, multiple messages (both user and agent messages) must share the same conversationId.
So, MongoDB rejected the second message and threw a duplicate key error (E11000).
We fixed it by removing the unique index.

2. We were maintaining conversationId using React's useState.
When the component re-mounts (for example, after a page refresh), the state gets reset to null. As a result, the frontend loses the current conversation ID and may create a new conversation instead of continuing the existing one.

Solution
We used localStorage to persist the conversationId across page refreshes.