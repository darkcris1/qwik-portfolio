// src/types/vercel-function.d.ts
import type { IncomingMessage, ServerResponse } from 'http';

declare module 'vercel-functions' {
  export type VercelApiRequest = IncomingMessage & {
    method?: string;
    body?: any;
    query?: Record<string, string | string[] | undefined>;
    headers: Record<string, string | string[] | undefined>;
  };

  export type VercelApiResponse = ServerResponse & {
    status(code: number): VercelApiResponse;
    json(body: any): void;
    send(body: any): void;
  };
}