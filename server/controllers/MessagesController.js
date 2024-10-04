import Messages from "../models/MessagesModel.js";

export const getMessages = async (request, response, next) => {
  try {
    const user1 = request.userId;
    const user2 = request.body.id;

    // Fix the condition to properly check both IDs
    if (!user1 || !user2) {
      return response.status(400).send("Both user ID's are required");
    }

    // Query for messages between the two users, sorted by timestamp
    const messages = await Messages.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ timestamp: 1 }); // Ensure sorting is by timestamp

    // Return the messages
    return response.status(200).json(messages);
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};
