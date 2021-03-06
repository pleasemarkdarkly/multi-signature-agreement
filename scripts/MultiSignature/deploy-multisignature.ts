/* We require the Hardhat Runtime Environment explicitly here. This is optional
but useful for running the script in a standalone fashion through `node <script>`.
When running the script with `hardhat run <script>` you'll find the Hardhat
Runtime Environment's members available in the global scope. */

import { ethers, upgrades } from 'hardhat';
import { Contract, ContractFactory } from 'ethers';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';
dotenvConfig({ path: resolve(__dirname, '../.env') });

// const ETH_PUBLIC_KEY = process.env.ETH_PUBLIC_KEY || '';

async function main(): Promise<void> {
    /* Hardhat always runs the compile task when running scripts through it.
    If this runs in a standalone fashion you may want to call compile manually
    to make sure everything is compiled
    await run("compile"); We get the contract to deploy */
    const multiSigFactory: ContractFactory = await ethers.getContractFactory('MultiSignatureAgreement');
    const MultiSignature: Contract = await multiSigFactory.deploy();
    await MultiSignature.deployed();
    console.log('Lottery deployed to: ', MultiSignature.address);
}

/*
async function upgrade(): Promise<void> {        
    const OZ_SDK_EXPORT = require("../openzeppelin-cli-export.json");    
    const [ContractName] =
        OZ_SDK_EXPORT.networks.rinkeby.proxies["openzeppelin-upgrades-migration-example/ContractName"];
    const ContractNameV2 = await ethers.getContractFactory("ContractNameV2");
    await upgrades.upgradeProxy(ContractName.address, ContractNameV2);
}
*/

/* We recommend this pattern to be able to use async/await everywhere
  and properly handle errors. */
main()
    .then(() => process.exit(0))
    .catch((error: Error) => {
        console.error(error);
        process.exit(1);
    });
