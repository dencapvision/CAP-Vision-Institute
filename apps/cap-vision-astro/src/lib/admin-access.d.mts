export interface AccessResult {allowed:boolean;kind?:string;message?:string;user?:{id:string;email?:string}}
export function adminError(error:any):{kind:string;message:string};
export function getAdminAccess(client:any,module:string):Promise<AccessResult>;
export const ADMIN_CHECKS:{label:string;table:string;select:string}[];
export function checkAdminSchema(client:any):Promise<{label:string;table:string;ok:boolean;kind?:string;message?:string}[]>;
