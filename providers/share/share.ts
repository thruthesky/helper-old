/**
 *
 * @file share.ts
 * @warning do not 'import' and other script file.
 *    - it may cause 'ping-pong' script inclusion.
 */
// constant
//export const XAPI_SERVER_URL = "http://work.org/wordpress/index.php";
//export const XAPI_SERVER_URL = "http://www.philgo.net/index.php";
export const XAPI_SERVER_URL = "http://work.org/wordpress/index.php";
export const XAPI_UPLOAD_URL = XAPI_SERVER_URL + "?xapi=file.upload&type=primary-photo";
interface PanelMenu {
  title: string;
  component: any;
  icon?:string;
}
export type PanelMenus = Array<PanelMenu>;



