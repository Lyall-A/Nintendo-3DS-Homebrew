# Nintendo 3DS Homebrew
This script assumes you are on latest firmware (and have a Japanese model, but the script can be easily changed for other models)

## Homebrew files
This is everything required for Homebrew
* [super-skaterhax](https://github.com/zoogie/super-skaterhax): Userland exploit for the new 3DS browser, known as Skater
* [SafeB9SInstaller](https://github.com/d0k3/SafeB9SInstaller): User-friendly boot9strap installer
* [boot9strap](https://github.com/SciresM/boot9strap): Firmware loader
* [Luma3DS](https://github.com/LumaTeam/Luma3DS): Custom firmware (CFW)
* [nimdspax](https://github.com/luigoalma/nimdsphax): Userland exploit to gain the necessary privileges needed to run SafeB9SInstaller
* [Homebrew Launcher](https://github.com/devkitPro/3ds-hbmenu): Custom menu for running .3dsx homebrew applications, packaged with Luma3DS

## Applications installed
* [GodMode9](https://github.com/d0k3/GodMode9): File browser, useful for creating NAND backups
* [Homebrew Launcher Wrapper](https://github.com/PabloMK7/homebrew_launcher_dummy): Wrapper to launch Homebrew Launcher from the HOME
* [FBI](https://github.com/nh-server/FBI-NH): Title manager, useful for installing .cia applications
* [ftpd](https://github.com/mtheall/ftpd): FTP server
* [Universal-Updater](https://github.com/Universal-Team/Universal-Updater): Downloader
* [Anemone3DS](https://github.com/astronautlevel2/Anemone3DS): Theme and splashscreen manager
* [Checkpoint](https://github.com/bernardogiordano/checkpoint): Save manager
* [3hs](https://hshop.erista.me/3hs): hShop downloader

## Installing Homebrew
todo

## Changing region
todo

## Creating NAND backup
todo

## How it works (I think?)
When running the super-skaterhax exploit, the Homebrew Launcher should be launched, from there you run nimdsphax which elevates privileges from userland using an exploit to be able to run SafeB9SInstaller, from there boot9strap will be installed and then Luma3DS will now boot

## Stuff
* .cia are applications that show on the HOME menu
* .3dsx are applications that show on the Homebrew Launcher
* .cia is an installable package format that FBI will install to the `Nintendo 3DS` directory