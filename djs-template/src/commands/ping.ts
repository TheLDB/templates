import { ChatCommand } from "../types/Discord";
import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

export const Ping: ChatCommand = {
  name: "ping",
  description: "Checks that the bot is online.",
  type: ApplicationCommandType.ChatInput,
  inhibitors: [],
  options: [
    {
      name: "option",
      description: "option",
      type: ApplicationCommandOptionType.Boolean,
      required: true,
    },
  ],
  async run(interaction) {
    await interaction.reply({
      content: "Pong!",
    });
  },
};
