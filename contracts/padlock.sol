// SPDX-License-Identifier: mine
pragma solidity ^0.8.17;

/**
 * @title  talk-to-mevm
 * @author Kethic <kethic@kethic.com> @kethcode
 * @notice Contract for talk-to-mevm workshop
 */


contract padlock {
    uint256 private seed;
    uint256[] private tumblers;

    constructor() {}

    function getTumblerCount() public view returns (uint256) {
        return tumblers.length;
    }

    function getTumbler(uint256 _index) public view returns (uint256) {
        return tumblers[_index];
    }

    function unlock(uint256[] memory _tumblers) public view returns (bool) {
        if (_tumblers.length != tumblers.length) {
            return false;
        }
        for (uint256 i = 0; i < tumblers.length; i++) {
            if (_tumblers[i] != tumblers[i]) {
                return false;
            }
        }
        return true;
    }

    function getRandom(uint256 max) private returns (uint256) {
        // will change to block.prevrandao once hardhat fully support 0.8.18
        // dont want to introduce the warning right now
        seed = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.difficulty, seed))
        );
        return (seed % max);
    }

    function resetTumblers() public {
        uint256 tumblerCount = getRandom(7);
        while (tumblerCount < 3) {
            tumblerCount = getRandom(7);
        }

        tumblers = new uint256[](tumblerCount);
        for (uint256 i = 0; i < tumblers.length; i++) {
            tumblers[i] = getRandom(10);
        }
    }
}
