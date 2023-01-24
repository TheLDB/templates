import { Inhibitor } from "../types/Discord";
import { GuildMember, PermissionsBitField } from "discord.js";
import { InhibitorError } from "../types/Error";

export const admin: Inhibitor = (interaction) => {
  const member = interaction.member as GuildMember;

  if (!member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    throw new InhibitorError(
      "Only users with the Administrator flag can use this command!"
    );
  }
};
