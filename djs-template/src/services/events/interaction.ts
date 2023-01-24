import {
  AutocompleteInteraction,
  ButtonInteraction,
  ChatInputCommandInteraction,
  Interaction,
  MessageContextMenuCommandInteraction,
  SelectMenuInteraction,
  UserContextMenuCommandInteraction,
} from "discord.js";
import {
  buttonInteractionsMap,
  chatCommandsMap,
  messageCommandsMap,
  ownerOnlyChatCommandsMap,
  selectMenuMap,
  userCommandsMap,
} from "../../commands";
import { InhibitorError, ServerError } from "../../types/Error";
import { BUG_MESSAGE } from "../../constants";
import { InteractionButtonCommand } from "../../types/Discord";

export async function handleInteraction(
  interaction: Interaction
): Promise<void> {
  try {
    if (interaction.isUserContextMenuCommand())
      return await handleUserContextInteraction(interaction);
    if (interaction.isMessageContextMenuCommand())
      return await handleMessageContextInteraction(interaction);
    if (interaction.isChatInputCommand())
      return await handleMessageInteraction(interaction);
    if (interaction.isButton())
      return await handleButtonInteraction(interaction);
    if (interaction.isSelectMenu()) return await handleSelectMenu(interaction);
    if (interaction.isAutocomplete())
      return await handleAutocomplete(interaction);
  } catch (e: any) {
    console.error(e);
  }
}

export async function handleUserContextInteraction(
  interaction: UserContextMenuCommandInteraction
): Promise<void> {
  let command;

  command = userCommandsMap.get(interaction.commandName);

  if (!command) return;

  const inhibitors = Array.isArray(command.inhibitors)
    ? command.inhibitors
    : [command.inhibitors];

  try {
    for (const inhibitor of inhibitors) {
      await inhibitor(interaction);
    }

    await command.run(interaction);
  } catch (e: any) {
    console.log(e);
  }
}

export async function handleMessageContextInteraction(
  interaction: MessageContextMenuCommandInteraction
): Promise<void> {
  let command;

  command = messageCommandsMap.get(interaction.commandName);

  if (!command) return;

  const inhibitors = Array.isArray(command.inhibitors)
    ? command.inhibitors
    : [command.inhibitors];

  try {
    for (const inhibitor of inhibitors) {
      await inhibitor(interaction);
    }

    await command.run(interaction);
  } catch (e: any) {
    console.log(e);
  }
}

export async function handleMessageInteraction(
  interaction: ChatInputCommandInteraction
): Promise<void> {
  let command = chatCommandsMap.get(interaction.commandName);

  if (!command) {
    const owner_only_command = ownerOnlyChatCommandsMap.get(
      interaction.commandName
    );

    if (owner_only_command) {
      command = owner_only_command;
    } else {
      return;
    }
  }

  const inhibitors = Array.isArray(command.inhibitors)
    ? command.inhibitors
    : [command.inhibitors];

  try {
    for (const inhibitor of inhibitors) {
      await inhibitor(interaction);
    }
    await command.run(interaction);
  } catch (e: any) {
    console.log(e);
    if (e instanceof InhibitorError || e instanceof ServerError) {
      await interaction.reply({
        content: e.message,
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: `Something went wrong. ${BUG_MESSAGE}`,
        ephemeral: !interaction.deferred,
      });
    }
  }
}

export async function handleButtonInteraction(
  interaction: ButtonInteraction
): Promise<void> {
  let command: InteractionButtonCommand | undefined = undefined;

  for (const i of buttonInteractionsMap.keys()) {
    if (interaction.customId.startsWith(i)) {
      command = buttonInteractionsMap.get(i);
    }
  }
  // let command = buttonInteractionsMap.get(interaction.customId);
  if (!command) return;

  const inhibitors = Array.isArray(command.inhibitors)
    ? command.inhibitors
    : [command.inhibitors];

  try {
    for (const inhibitor of inhibitors) {
      await inhibitor(interaction);
    }

    await command.run(interaction);
  } catch (e) {
    console.log(e);
  }
}

export async function handleSelectMenu(
  interaction: SelectMenuInteraction
): Promise<void> {
  let command = selectMenuMap.get(interaction.customId);

  if (!command) return;

  const inhibitors = Array.isArray(command.inhibitors)
    ? command.inhibitors
    : [command.inhibitors];

  try {
    for (const inhibitor of inhibitors) {
      await inhibitor(interaction);
    }

    await command.run(interaction);
  } catch (e) {
    await interaction.reply({
      content: `Something went wrong. ${BUG_MESSAGE}`,
      ephemeral: true,
    });
  }
}

export async function handleAutocomplete(
  interaction: AutocompleteInteraction
): Promise<void> {
  const focusedOption = interaction.options.getFocused(true);

  let command = chatCommandsMap.get(interaction.commandName);

  if (!command) {
    let ownerCommand = ownerOnlyChatCommandsMap.get(interaction.commandName);
    if (ownerCommand) {
      command = ownerCommand;
    } else {
      return;
    }
  }

  const inhibitors = Array.isArray(command.inhibitors)
    ? command.inhibitors
    : [command.inhibitors];

  for (const i of command.options!) {
    if (i.name === focusedOption.name) {
      try {
        for (const inhibitor of inhibitors) {
          await inhibitor(interaction);
        }

        await i.autocompleteHandler?.autocomplete(interaction);
      } catch (e) {
        if (e instanceof InhibitorError) {
          await interaction.respond(
            [e.message].map((choice) => ({
              name: choice,
              value: choice,
            }))
          );
        }
      }
    }
  }
}
