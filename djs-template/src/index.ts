import "dotenv/config";

import { Client, ActivityType } from "discord.js";
import {
  chatCommandsMap,
  messageCommandsMap,
  ownerOnlyChatCommandsMap,
  userCommandsMap,
} from "./commands";
import { isDev } from "./constants";
import { handleInteraction } from "./services/events/interaction";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
});

client.on("ready", async () => {
  await client.user?.setPresence({
    status: "online",
    activities: [
      {
        type: ActivityType.Playing,
        name: "Message",
      },
    ],
  });

  if (isDev) {
    if (!process.env.GUILD_ID) {
      throw new Error("GUILD_ID IS NOT SET");
    }

    await client.guilds.cache
      .get(process.env.GUILD_ID)
      ?.commands.set([
        ...chatCommandsMap.values(),
        ...ownerOnlyChatCommandsMap.values(),
        ...messageCommandsMap.values(),
        ...userCommandsMap.values(),
      ]);
  } else {
    await client.application?.commands.set([
      ...chatCommandsMap.values(),
      ...messageCommandsMap.values(),
      ...userCommandsMap.values(),
    ]);
  }
});

client.on("interactionCreate", handleInteraction);

(async () => {
  await client.login(process.env.DISCORD_TOKEN);
  console.log(
    `Logged in as ${client.user?.username}#${client.user?.discriminator}`
  );
})();
