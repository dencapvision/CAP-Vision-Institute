export const DEFAULT_MODEL:string;
export const SYSTEM_PROMPT:string;
export const PORTFOLIO:{name:string;keywords:RegExp;duration:string;question:string}[];
export interface AdvisorInput {message:string;history:{role:'user'|'assistant';content:string}[]}
export interface AdvisorReply {reply:string;suggested_program:string|null;mode:'basic'|'gemini'|'handoff';model?:string}
export function validateInput(body:unknown):AdvisorInput;
export function basicAdvice(input:AdvisorInput):AdvisorReply;
export function advise(input:AdvisorInput,options?:{apiKey?:string;model?:string;fetcher?:typeof fetch}):Promise<AdvisorReply>;
