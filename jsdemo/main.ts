import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { metadata } from '@polkadot/types/interfaces/essentials'

const WEB_SOCKET = 'ws://localhost:9944'

const connectSubstrate = async () => {
    const wsProvider = new WsProvider(WEB_SOCKET);
    const api = await ApiPromise.create({ provider: wsProvider });
    await api.isReady
    console.log("connect to substrate is OK!")
    return api;
}

const getConst = async (api: ApiPromise) => {
    const existentialDeposit = api.consts.balances.existentialDeposit.toHuman();
    return existentialDeposit;
}

const getFreeBalance = async (api: ApiPromise, address: string) => {
    // const aliceAccount = await api.query.system.account(address);
    // console.log(aliceAccount);
    // return aliceAccount["data"]["free"].toHuman();

    // // 取得链上的时间戳
    // const now = await api.query.timestamp.now();
    // const balance = await api.query.balances.freeBalance(address);
    // const nonce = await api.query.system.accountNonce(address);
    // console.log(`${now}: balance of ${balance} and a nonce of ${nonce}`);

    // return balance;
}

const printAliceBobBalance = async (api: ApiPromise) => {
    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice');
    const bob = keyring.addFromUri('//Bob');
    console.log("alice balance is:", await getFreeBalance(api, alice.address))
    console.log("bob balance is:", await getFreeBalance(api, bob.address))
}

const main = async () => {
    const api = await connectSubstrate();
    console.log("const value is [%d]", await getConst(api));

    // await printAliceBobBalance(api);

    console.log("game over");
}

main().then(() => {
    console.log("successfully exited");
    process.exit(0);
}).catch(err => {
    console.log("error occur:", err);
    process.exit(1);
})

