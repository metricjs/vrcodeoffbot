// @ts-ignore
import { Client } from 'discord.js';
import key from '../../key';
import SysInfo from '../cmds/SysInfo';
import Calc from '../cmds/Calc';
import Help from '../cmds/Help';

// set up discord client
const client = new Client();
const token = key;

client.on('ready', () => {
  console.log('Ready!');
});

const fallbackMsg = (msg) => msg.channel.send('Unknown command');
const unimplementedMsg = (msg) => msg.channel.send('Sorry, this command is not implemented yet.');

const msgParser = (msg, content) => {
  console.log('new msg', content);
  // strip the ! then split on space
  const args = content.slice(1, msg.length).split(' ');

  // switch on the various command types
  switch (args[0]) {
    case 'calc': {
      Calc.reply(msg, args.slice(1, args.length));
      break;
    }
    case 'help': {
      Help.reply(msg, args);
      break;
    }
    case 'whatshot': {
      unimplementedMsg(msg);
      break;
    }
    case 'roles': {
      unimplementedMsg(msg);
      break;
    }
    case 'sysinfo': {
      SysInfo.reply(msg);
      break;
    }
    case 'from': {
      unimplementedMsg(msg);
      break;
    }
    default: {
      fallbackMsg(msg);
    }
    // plus unit converter and word blacklist
  }
};

client.on('message', (msg) => {
  if (msg.content.startsWith('!')) {
    var role = msg.guild.me.hasPermission(['SEND_MESSAGES']);
    if (role) {
      msgParser(msg, msg.content);
    } else {
      console.error("Permissons are insufficient!");
    }
  }
});

client.login(token);