# Crypto Tracker Chrome Extension

A Chrome extension that displays real-time cryptocurrency prices and allows users to track their favorite cryptocurrencies.

## Features

- Real-time price tracking for top 10 cryptocurrencies
- Auto-refresh every minute
- Search functionality for all cryptocurrencies
- Favorite cryptocurrencies management
- Dark mode UI
- RTL support for Persian language
- Price change indicators (green for positive, red for negative)

## Technical Stack

- React
- TypeScript
- Tailwind CSS
- Chrome Extension Manifest V3
- CoinGecko API

## Project Structure

```
src/
├── components/         # Reusable UI components
├── hooks/             # Custom React hooks
├── services/          # API and storage services
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── content/           # Content script for keylogger
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   npm run build
   ```
4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

## Development

```bash
npm run dev
```

## Building for Production

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT 