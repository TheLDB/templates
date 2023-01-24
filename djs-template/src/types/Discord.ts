// @ts-ignore
// @ts-ignore

import {
  ChatInputApplicationCommandData,
  CommandInteraction,
  Interaction,
  ApplicationCommandType,
  MessageContextMenuCommandInteraction,
  MessageApplicationCommandData,
  UserApplicationCommandData,
  UserContextMenuCommandInteraction,
  InteractionButtonComponentData,
  ButtonInteraction,
  SelectMenuComponentData,
  SelectMenuInteraction, AutocompleteFocusedOption, AutocompleteInteraction, ApplicationCommandOptionData
} from "discord.js";

export interface ChatCommand extends ChatInputApplicationCommandData {
  inhibitors: Inhibitor[] | Inhibitor;
  type: ApplicationCommandType.ChatInput;
  options?: AutocompletedOptionData[];
  run(interaction: CommandInteraction): Promise<void>;
}

export interface OwnerOnlyChatCommand extends ChatInputApplicationCommandData {
  inhibitors: Inhibitor[] | Inhibitor;
  type: ApplicationCommandType.ChatInput;
  options?: AutocompletedOptionData[];
  run(interaction: CommandInteraction): Promise<void>;
}

export type AutocompletedOptionData = ApplicationCommandOptionData & {
  autocompleteHandler?: AutocompleteCommandInteraction
}

export interface MessageCommand extends MessageApplicationCommandData {
  inhibitors: Inhibitor[] | Inhibitor;
  type: ApplicationCommandType.Message;

  // eslint-disable-next-line no-unused-vars
  run(interaction: MessageContextMenuCommandInteraction): Promise<void>;
}

export interface UserCommand extends UserApplicationCommandData {
  inhibitors: Inhibitor[] | Inhibitor;
  type: ApplicationCommandType.User;

  // eslint-disable-next-line no-unused-vars
  run(interaction: UserContextMenuCommandInteraction): Promise<void>;
}

export interface InteractionButtonCommand extends InteractionButtonComponentData {
  inhibitors: Inhibitor[] | Inhibitor;
  // eslint-disable-next-line no-unused-vars
  run(interaction: ButtonInteraction): Promise<void>;
}

export interface SelectMenuCommand extends SelectMenuComponentData {
  inhibitors: Inhibitor[] | Inhibitor;
  // eslint-disable-next-line no-unused-vars
  run(interaction: SelectMenuInteraction): Promise<void>;
}

export interface AutocompleteCommandInteraction extends AutocompleteFocusedOption {
  inhibitors: Inhibitor[] | Inhibitor;
  autocomplete(interaction: AutocompleteInteraction): Promise<void>;
}

// eslint-disable-next-line no-unused-vars
export type Inhibitor = (interaction: Interaction) => Promise<void> | void;
