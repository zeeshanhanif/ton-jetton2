import { toNano } from '@ton/core';
import { DemoToken } from '../wrappers/DemoToken';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const demoToken = provider.open(
        DemoToken.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('DemoToken')
        )
    );

    await demoToken.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(demoToken.address);

    console.log('ID', await demoToken.getID());
}
