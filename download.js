const fs = require('fs');
const path = require('path');

const rootDir = './Downloads';
const gitHubToken = '';
const downloads = [
    {
        name: 'super-skaterhax',
        repo: 'zoogie/super-skaterhax',
        assets: [
            { filename: /^release_new3ds_v[\d.]+\.zip$/, saveFilename: 'super-skaterhax.zip' }
        ]
    },
    {
        name: 'SafeB9SInstaller',
        repo: 'd0k3/SafeB9SInstaller',
        assets: [
            { filename: /^SafeB9SInstaller-[\d-]+\.zip$/, saveFilename: 'SafeB9SInstaller.zip' }
        ]
    },
    {
        name: 'Boot9strap',
        repo: 'SciresM/boot9strap',
        assets: [
            { filename: /^boot9strap-[\d.]+\.zip$/, saveFilename: 'boot9strap.zip' }
        ]
    },
    {
        name: 'Luma3DS',
        repo: 'LumaTeam/Luma3DS',
        assets: [
            { filename: /^Luma3DSv[\d.]+\.zip$/, saveFilename: 'Luma3DS.zip' }
        ]
    },
    {
        name: 'nimdsphax',
        repo: 'luigoalma/nimdsphax',
        assets: [
            { filename: /^nimdsphax_v[\d.]+\.zip$/, saveFilename: 'nimdsphax.zip' }
        ]
    },
    // {
    //     name: 'Finalize script',
    //     repo: 'hacks-guide/finalize',
    //     assets: [
    //         { filename: 'finalize.romfs' },
    //         { filename: 'x_finalize_helper.firm' }
    //     ]
    // },
    {
        name: 'GodMode9',
        repo: 'd0k3/GodMode9',
        assets: [
            { filename: /^GodMode9-v[\d.-]+\.zip$/, saveFilename: 'GodMode9.zip' }
        ]
    },
    {
        name: 'Homebrew Launcher Wrapper',
        repo: 'PabloMK7/homebrew_launcher_dummy',
        assets: [
            { filename: 'Homebrew_Launcher.cia' }
        ]
    },
    {
        name: 'FBI',
        repo: 'nh-server/FBI-NH',
        assets: [
            { filename: 'FBI.3dsx' },
            { filename: 'FBI.cia' }
        ]
    },
    {
        name: 'ftpd',
        repo: 'mtheall/ftpd',
        assets: [
            { filename: 'ftpd.cia' }
        ]
    },
    {
        name: 'Universal-Updater',
        repo: 'Universal-Team/Universal-Updater',
        assets: [
            { filename: 'Universal-Updater.cia' }
        ]
    },
    {
        name: 'Anemone3DS',
        repo: 'astronautlevel2/Anemone3DS',
        assets: [
            { filename: 'Anemone3DS.cia' }
        ]
    },
    {
        name: 'Checkpoint',
        repo: 'bernardogiordano/checkpoint',
        assets: [
            { filename: 'Checkpoint.cia' }
        ]
    },
    {
        name: '3hs',
        url: 'https://download2.erista.me/3hs/3hs.cia'
    },
];

(async () => {
    for (const download of downloads) {
        if (download.repo) {
            console.log(`Getting latest release for ${download.name}...`);
            try {
                const release = await getLatestRelease(download.repo);
                const assets = release.assets.map(releaseAsset => {
                    const downloadAsset = download.assets.find(downloadAsset => releaseAsset.name.match(downloadAsset.filename));
                    if (!downloadAsset) return;
                    return {
                        ...releaseAsset,
                        ...downloadAsset
                    };
                }).filter(i => i);
                if (assets.length < download.assets.length) return console.log('Missing expected asset(s) from release!');
                for (const asset of assets) {
                    console.log(`Downloading ${asset.name}${asset.saveFilename ? ` as ${asset.saveFilename}` : ''}...`);
                    await downloadUrl(asset.downloadUrl, asset.saveFilename || asset.name);
                }
            } catch (err) {
                console.log('Failed to get latest release, GitHub has likely rate limited you. Setup a personal access token');
            }
        } else {
            const name = path.basename(download.url);
            console.log(`Downloading ${name}${download.saveFilename ? ` as ${download.saveFilename}` : ''}...`);
            await downloadUrl(download.url, download.saveFilename || name);
        }
    }
})();

function getLatestRelease(repo) {
    return fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
        headers: {
            Authorization: gitHubToken ? `Bearer ${gitHubToken}` : undefined
        }
    })
        .then(res => res.json())
        .then(json => ({
            assets: json.assets.map(asset => ({
                name: asset.name,
                downloadUrl: asset.browser_download_url
            }))
        }));
}

function downloadUrl(downloadUrl, saveFilename) {
    return fetch(downloadUrl)
        .then(res => res.arrayBuffer())
        .then(arrayBuffer => {
            const savePath = path.join(rootDir, saveFilename);
            fs.mkdirSync(path.dirname(savePath), { recursive: true });
            fs.writeFileSync(savePath, Buffer.from(arrayBuffer));
        });
}