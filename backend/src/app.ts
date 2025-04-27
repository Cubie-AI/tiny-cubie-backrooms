import "dotenv/config";
import express from "express";
import { startConversationLoop } from "./loop.js";
import { listConversations } from "./storage/filestore.js";

const app = express();

app.use(express.json());

app.get("/", async (req, res, next) => {
  try {
    const conversations = await listConversations();
    res.status(200).json(conversations);
    return;
  } catch (error) {
    next(error);
  }
});

app.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const conversations = await listConversations();

    if (!conversations || !(id in conversations)) {
      throw new Error("Conversation not found");
    }

    res.status(200).json(conversations[id]);
  } catch (error) {
    next(error);
  }
});

// let isRunning = false;
// app.post("/start", async (req, res, next) => {
//   const id = `conversation-${Date.now()}`;

//   try {
//     if (isRunning) {
//       throw new Error("Conversation is already running");
//     }

//     // run convo loop in the background
//     isRunning = true;
//     startConversationLoop(id);
//   } catch (error) {
//     next(error);
//   }

//   res.status(201).json({ message: "Conversation started", id });
// });

async function infiniteRunner() {
  while (true) {
    const id = `conversation-${Date.now()}`;
    const result = await startConversationLoop(id);

    if (!result) {
      break;
    }
    console.log("Conversation loop completed successfully....");
    console.log("Waiting for 10 seconds before starting the next loop...");

    // Wait for a while before starting the next loop
    await new Promise((resolve) => setTimeout(resolve, 10000)); // 10 seconds
  }
}
infiniteRunner()
  .then(() => console.log("Infinite runner completed"))
  .catch((error) => console.error("Error in infinite runner:", error));
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
