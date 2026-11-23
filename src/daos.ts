/**
 * The DAOs this page shows, and every address the page may connect to for them (its content security policy).
 * A new DAO on byob.zone: add it here, with its relays and chain sources from its config/dao.json.
 */
export const DAOS = [
  { site: 'https://alpha.byob.zone', network: 'testnet4', group: 'https://chat.whatsapp.com/GmwQbxCv5Qr8Wkgpzgk7cJ' },
];

export const CONNECT = [
  'https://alpha.byob.zone',
  'wss://btc-dao-relay.btcdao.workers.dev',
  'wss://nos.lol',
  'wss://relay.damus.io',
  'https://btc-dao-gateway.btcdao.workers.dev',
  'https://mempool.space',
];
