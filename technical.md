# Some information that nobody should really care about

## SafeB9SInstaller
In SafeB9SInstaller, after entering the displayed sequnce, a FIRM backup will then be created and [boot9strap](#boot9strap) (located at `/boot9strap/boot9strap.firm`) will be installed

## boot9strap
Boot9strap runs during boot and will attempt to boot `boot.firm` located on the SD card or NAND (in order)

## Luma3DS
Luma3DS is the CFW (Custom Firmware), it is the `boot.firm` file that [boot9strap](#boot9strap) looks for

## Cleaning SD Card after Homebrew
Not all files are still needed after Homebrew
* `/boot9strap` can be deleted, It's only used when installing (or updating) boot9strap
* CIA files can be deleted once installed, they are just installer packages
* All Luma3DS files (`/boot.firm`, `/luma`) can be deleted if copied over to NAND
* `/boot.3dsx` can be deleted if you don't need the Homebrew Launcher, make sure you atleast have FBI first

## Useful info maybe
* `boot.3dsx` is the Homebrew Launcher, it cannot be moved to NAND
* [boot9strap](#boot9strap) reads `boot.firm` from both SD and NAND
* `.cia` are installation files that FBI will install to the `Nintendo 3DS` directory, to show on the HOME Menu
* `.3dsx` are applications that show on the Homebrew Launcher