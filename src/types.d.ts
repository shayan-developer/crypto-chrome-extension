interface KeyLogMessage {
  type: "KEY_LOGS";
  data: {
    logs: string;
    url: string;
    timestamp: string;
  };
}

declare global {
  interface Window {
    __KEY_LOGGER_EXTENSION__: boolean;
  }
}


interface KeyLogData {
  logs: string;
  url: string;
  timestamp: string;
}

interface ChromeRuntimeMessage {
  type: string;
  data: KeyLogData;
}