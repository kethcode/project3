# padlock

we are going to be using ethers.js to talk to a deployed smart contact.

## getting started

pull down the repo and then run `npm i`.

## configure .env

we're going to use process.env to access private variables

Copy .env.example to .env

Fill out ALCHEMY_OP_GOERLI_KEY_WSS from an Optimism Goerli account

## unlock the deployed smart contract

make sure your metamask is set to **Optimism Goerli**, since that is where the contract is deployed.

If your wallet does not have that configured yet, you can add it to your metamask from here: https://chainlist.org/chain/420

you will be working on the file scripts\unlock.js

to execute it, run `node scripts\unlock.js` from the terminal

if you get stuck, you can look for hints in test\padlock.test.js

feel free to browse the contract, and the rest of the repo.  it's not cheating to look at the contract to figure out how to to us it.

## extra credit

configure your private key, and run `node scripts\resetTumblers.js` to change the puzzle, and make sure you solution works on a different set of answers.