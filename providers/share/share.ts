/**
 *
 * @file share.ts
 * @warning do not 'import' and other script file.
 *    - it may cause 'ping-pong' script inclusion.
 */
// constant
//export const XAPI_SERVER_URL = "http://work.org/wordpress/index.php";
export const XAPI_SERVER_URL = "http://111.125.97.38/wordpress/index.php";   //personal work server - charles
//export const XAPI_SERVER_URL = "http://bcc0a67b.ngrok.io/wordpress/index.php"; //personal work server - charles
export const XAPI_UPLOAD_URL = XAPI_SERVER_URL + "?xapi=file.upload&type=primary-photo";
interface PanelMenu {
  title: string;
  component: any;
  icon?:string;
}
export type PanelMenus = Array<PanelMenu>;



