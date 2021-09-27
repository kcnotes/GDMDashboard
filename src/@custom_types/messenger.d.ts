declare module 'messenger' {
  function createListener(port: number): Listener;
}

declare class Listener {
  constructor(address: string): void;
  startServer(): void;
  onError(errorFn: () => void): void;
  on<T>(subject: string, callback: (msg: unknown, data: T) => void): void;
}
