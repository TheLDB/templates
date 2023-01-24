import {
  ChatCommand,
  InteractionButtonCommand,
  MessageCommand,
  OwnerOnlyChatCommand,
  SelectMenuCommand,
  UserCommand,
} from "../types/Discord";
import { Ping } from "./ping";

export const chatCommands: ChatCommand[] = [Ping];

export const ownerOnlyChatCommands: OwnerOnlyChatCommand[] = [];

export const messageCommands: MessageCommand[] = [];

export const userCommands: UserCommand[] = [];

export const buttonInteractions: InteractionButtonCommand[] = [];

export const selectMenus: SelectMenuCommand[] = [];

export const chatCommandsMap = new Map<string, ChatCommand>(
  Object.entries(
    chatCommands.reduce((all, command) => {
      return { ...all, [command.name]: command };
    }, {} as Record<string, ChatCommand>)
  )
);

export const ownerOnlyChatCommandsMap = new Map<string, OwnerOnlyChatCommand>(
  Object.entries(
    ownerOnlyChatCommands.reduce((all, command) => {
      return { ...all, [command.name]: command };
    }, {} as Record<string, OwnerOnlyChatCommand>)
  )
);

export const messageCommandsMap = new Map<string, MessageCommand>(
  Object.entries(
    messageCommands.reduce((all, command) => {
      return { ...all, [command.name]: command };
    }, {} as Record<string, MessageCommand>)
  )
);

export const userCommandsMap = new Map<string, UserCommand>(
  Object.entries(
    userCommands.reduce((all, command) => {
      return { ...all, [command.name]: command };
    }, {} as Record<string, UserCommand>)
  )
);

export const buttonInteractionsMap = new Map<string, InteractionButtonCommand>(
  Object.entries(
    buttonInteractions.reduce((all, interaction) => {
      return { ...all, [interaction.customId]: interaction };
    }, {} as Record<string, InteractionButtonCommand>)
  )
);

export const selectMenuMap = new Map<string, SelectMenuCommand>(
  Object.entries(
    selectMenus.reduce((all, interaction) => {
      return { ...all, [interaction.customId]: interaction };
    }, {} as Record<string, SelectMenuCommand>)
  )
);
