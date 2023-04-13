import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/api';

const WEB_SOCKET = 'ws://localhost:9944'

const connectSubstrate = async () => {
    const wsProvider = new WsProvider(WEB_SOCKET);
    const api = await ApiPromise.create({ provider: wsProvider });
    await api.isReady
    console.log("connect to substrate is OK!")
    return api;
}

const subscribeAliceBalance = async (api: ApiPromise) => {
    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice');

    console.log(alice);

    await api.query.system.account(alice.address, (aliceAcct: any) => {
        console.log("Subscribed to Alice account.");
        const aliceFreeSub = aliceAcct.data.free;
        console.log(`Alice Account (sub): ${aliceFreeSub}`);
    });
};

function sleep(timeout: any) {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

const main = async () => {
    const api = await connectSubstrate();

    await subscribeAliceBalance(api);
    await sleep(80000);

    console.log("game over");
}

main().then(() => {
    console.log("successfully exited");
    process.exit(0);
}).catch(err => {
    console.log("error occur:", err);
    process.exit(1);
})

