# Twitch StreamDeck.js

A project with the goal making a custom streamdeck running in the browser.

## Getting Started

### Prerequisites

- Node.js
- NPM
- Twitch account (developer account)
- OBS

### Creating a Twitch Application

1. Go to [Twitch Developer Console](https://dev.twitch.tv/console/apps/create) and create a new application.
2. Fill in the name of your application and set the OAuth Redirect URL to `http://localhost:1234/`.
3. Copy the Client ID and Client Secret and paste them in the `.env` file.

### Installing

1. Clone the repository
2. Run `npm install` to install all dependencies
3. Run `parcel index.html` to start the development server
4. Open `http://localhost:1234/` in your browser
5. An error should appear in the console about websocket connection. This is normal, since we are not running the backend yet.

### OBS Setup

1. Open OBS and go to `Tools > WebSockets Server Settings`
2. Set the port to `4455` and press `Start Server`
3. Disable password protection

### Running the backend

1. Reload the page in your browser
2. The error should be gone and you should see a message about a successful connection to the backend
3. You can see all your scenes, your number of viewers...
4. You can now add buttons to your streamdeck and control OBS

## Documentation

### OBS WebSockets JS

- [OBS WebSockets JS](https://github.com/obsproject/obs-websocket/blob/master/docs/generated/protocol.md#connection-steps)

All the available methods and events are listed here.

### Twitch.js

- [Twitch.js](https://www.npmjs.com/package/twitch-js)

All the available methods and events are listed here and align with the [Twitch API](https://dev.twitch.tv/docs/api/reference).



## Problems

If you have any problems, please create an issue on GitHub or contact me on Discord: `korastrip` or [join my Discord server](https://discord.gg/beWgWpdNyP).

