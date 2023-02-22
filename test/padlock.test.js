const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("padlock", function () {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const padlock = await ethers.getContractFactory("padlock");
    const lock = await padlock.deploy();

    await lock.resetTumblers();

    return { lock, owner, otherAccount };
  }

  describe("padlock", function () {
    it("should have at least 3 tumblers", async function () {
      const { lock, owner, otherAccount } = await loadFixture(deployFixture);

      expect((await lock.getTumblerCount()) >= 3).to.be.true;
    });

    it("should have tumbler values between 0-9", async function () {
      const { lock, owner, otherAccount } = await loadFixture(deployFixture);

      let validTumblers = true;

      for (let i = 0; i < (await lock.getTumblerCount()); i++) {
        let tumbler = await lock.getTumbler(i);
        if (tumbler < 0 || tumbler > 9) {
          validTumblers = false;
        }
      }
      expect(validTumblers).to.be.true;
    });

    it("should fail to unlock with incorrect values", async function () {
      const { lock, owner, otherAccount } = await loadFixture(deployFixture);

      let proposedTumblers = new Array(await lock.getTumblerCount());

      for (let i = 0; i < (await lock.getTumblerCount()); i++) {
        proposedTumblers[i] = await lock.getTumbler(i);
      }

      proposedTumblers[0]++;

      expect(await lock.unlock(proposedTumblers)).to.be.false;
    });

    it("should unlock with correct values", async function () {
      const { lock, owner, otherAccount } = await loadFixture(deployFixture);

      let proposedTumblers = new Array(await lock.getTumblerCount());

      for (let i = 0; i < (await lock.getTumblerCount()); i++) {
        proposedTumblers[i] = await lock.getTumbler(i);
      }

      expect(await lock.unlock(proposedTumblers)).to.be.true;
    });
  });
});
