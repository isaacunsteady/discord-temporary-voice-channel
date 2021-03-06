const Isaac = require("./src/client.js");
const client = new Isaac();
const conf = require("./src/configurations.json");

client.on("ready", async () =>
  client.user.setStatus("dnd").then(() => console.log(client.user.tag))
);

client.run();

client.on("voiceStateUpdate", async (oldState, newState) => {
  if (newState.channelID === conf.temporary.channel) {
    newState.guild.channels
      .create(`${newState.guild.members.cache.get(newState.id).user.tag}`, {
        type: "VOICE",
        parent: conf.temporary.category,
        userLimit: conf.temporary.limit
      })
      .then(async channel => {
        channel
          .createOverwrite(newState.id, {
            VIEW_CHANNEL: true,
            CONNECT: true,
            SPEAK: true,
            MUTE_MEMBERS: true,
            MOVE_MEMBERS: true,
            DEAFEN_MEMBERS: true
          })
          .then(() => newState.setChannel(channel.id))
          .catch(() => {});
      });
  } else;
  if (oldState.channel) {
    let channel = temporary =>
      temporary.parentID === conf.temporary.category &&
      temporary.id !== conf.temporary.channel &&
      oldState.channelID === temporary.id &&
      oldState.channel.members.size === 0;
    return oldState.guild.channels.cache
      .filter(channel)
      .forEach(temporary => temporary.delete());
  } else;
});

client.on("message", async message => {
  if (message.channel.id !== conf.temporary.text || message.author.bot) return;
  const args = message.content
    .slice(conf.imports.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  if (!message.content.toLowerCase().startsWith(conf.imports.prefix)) return;
  var author = message.guild.member(message.author);
  var uye =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.cache.get(args[0]);
  var channel = message.guild.channels.cache.get(author.voice.channelID);
  if (!author.voice.channel || author.voice.channel.name !== message.author.tag)
    return client.message(
      "**Ses kanal??nda bulunmuyorsunuz veya bulundu??unuz kanal size ait de??il.**",
      message.channel.id,
      5000
    );
  if (command === "limit") {
    let say?? = args[0];
    if (!Number(say??) || Number(say??) > 20)
      return client.message(
        "**Bir say?? belirtmelisin. Belirtti??in say?? maksimum 20 olabilir.**",
        message.channel.id,
        5000
      );
    channel
      .edit({ userLimit: say?? })
      .then(() =>
        client.message(
          `**Kanal??n??z??n limiti ${say??} olarak ayarland??.**`,
          message.channel.id,
          10000
        )
      );
  } else if (command === "ekle") {
    if (!uye) 
      return client.message("**Bir ??ye belirtmelisin.**", message.channel.id, 5000);
    channel
      .createOverwrite(uye.id, { CONNECT: true, SPEAK: true })
      .then(() =>
        client.message(
          `**${uye} ??yesinin kanal izinleri olu??turuldu.**`,
          message.channel.id,
          10000
        )
      );
  } else if (command === "kald??r") {
    if (!uye) return
      return client.message("**Bir ??ye belirtmelisin.**", message.channel.id, 5000);
    channel.permissionOverwrites
      .get(uye.id)
      .delete()
      .then(() =>
        client.message(
          `**${uye} ??yesinin kanal izinleri silindi.**`,
          message.channel.id,
          10000
        )
      );
  } else;
});
