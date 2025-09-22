const fs = require('fs');
const path = require('path');

const downloadsDir = './Downloads';
const sdDir = './SD';

if (!fs.existsSync(downloadsDir)) return console.log('Downloads directory doesn\'t exist');
if (fs.existsSync(sdDir)) fs.rmSync(sdDir, { recursive: true, force: true });
fs.mkdirSync(sdDir);

// Required for homebrew
copy('boot9strap', 'boot9strap');
copy('Luma3DS', '.');
// copy('super-skaterhax/JAPAN (11.17.0-50J, 11.16.0-49J, 11.15.0-47J)', '.'); // Change this to match yours
// copy('SafeB9SInstaller/SafeB9SInstaller.bin', 'SafeB9SInstaller.bin');
// copy('nimdsphax/nimdsphax', '3ds/nimdsphax');

// Guide suggests this script to install applications
// copy('x_finalize_helper.firm', 'luma/payloads/x_finalize_helper.firm');
// copy('finalize.romfs', 'finalize.romfs');

// Applications
copy('Homebrew_Launcher.cia', 'cias/Homebrew_Launcher.cia');
copy('FBI.3dsx', '3ds/FBI/FBI.3dsx'); // So we can install all of the CIA's
copy('FBI.cia', 'cias/FBI.cia');
copy('faketik.3dsx', '3ds/faketik/faketik.3dsx');
copy('ftpd.cia', 'cias/ftpd.cia');
copy('Universal-Updater.cia', 'cias/Universal-Updater.cia');
copy('Anemone3DS.cia', 'cias/Anemone3DS.cia');
copy('Checkpoint.cia', 'cias/Checkpoint.cia');

// Payloads
copy('GodMode9/gm9', 'gm9');
copy('GodMode9/GodMode9.firm', 'luma/payloads/GodMode9.firm');
copy('SafeB9SInstaller/SafeB9SInstaller.firm', 'luma/payloads/SafeB9SInstaller.firm'); // Allow updating B9S from Luma

// Scripts
copy('ctrtransfer.gm9', 'gm9/scripts/ctrtransfer.gm9');

// Extras
copy('3hs.cia', 'cias/3hs.cia');
copy('netpass.cia', 'cias/netpass.cia');
copy('Nimbus/3ds', '3ds');
copy('Nimbus/cias', 'cias');
copy('Nimbus/luma', 'luma');
copy('3DSident.cia', 'cias/3DSident.cia');
copy('BootNTRSelector.cia', 'cias/BootNTRSelector.cia');
copy('TWiLightMenu/roms', 'roms');
copy('TWiLightMenu/_nds', '_nds');
copy('TWiLightMenu/BOOT.NDS', 'BOOT.NDS');
copy('TWiLightMenu/TWiLight Menu.cia', 'cias/TWiLight Menu.cia');
copy('TWiLightMenu-BetterDSiMenuMusic-AddOn', '.');
copy('TWiLightMenu-ExtraUIMusic-AddOn', '.');
copy('TWiLightMenu-Multimedia-AddOn', '.');
copy('TWiLightMenu-VirtualConsole-AddOn', '.');
copy('AzaharArticSetup.cia', 'cias/AzaharArticSetup.cia');
// copy('CTGP-7_Downloader.cia', 'cias/CTGP-7_Downloader.cia');

console.log(`Created SD at "${sdDir}"`);

function copy(source, destination) {
    return fs.cpSync(path.join(downloadsDir, source), path.join(sdDir, destination), { recursive: true });
};