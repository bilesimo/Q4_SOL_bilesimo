import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { VaultProgram } from "../target/types/vault_program";
import { expect } from "chai";

describe("vault-program", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.VaultProgram as Program<VaultProgram>;

  const vaultState = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("state"), provider.publicKey.toBytes()],
    program.programId
  )[0];
  const vault = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), vaultState.toBytes()],
    program.programId
  )[0];

  it("Is initialized!", async () => {
    const tx = await program.methods
      .initialize()
      .accountsPartial({
        signer: provider.wallet.publicKey,
        vault,
        vaultState,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const vaultInfo = await provider.connection.getAccountInfo(vault);
    const vaultBalance = await provider.connection.getBalance(vault);

    expect(vaultInfo).to.be.null;
    expect(vaultBalance).to.be.equal(0);

    console.log("\nYour transaction signature", tx);
    console.log("Your vault balance", vaultBalance.toString());
  });

  it("Deposit 0.05 SOL", async () => {
    const tx = await program.methods
      .deposit(new anchor.BN(0.05 * anchor.web3.LAMPORTS_PER_SOL))
      .accountsPartial({
        user: provider.wallet.publicKey,
        vaultState,
        vault,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const vaultInfo = await provider.connection.getAccountInfo(vault);
    const vaultBalance = await provider.connection.getBalance(vault);

    expect(vaultInfo).to.not.be.null;
    expect(vaultBalance).to.be.equal(0.05 * anchor.web3.LAMPORTS_PER_SOL);

    console.log("\nYour transaction signature", tx);
    console.log("Your vault balance", vaultBalance.toString());
  });

  it("Withdraw 0.020 SOL", async () => {
    const tx = await program.methods
      .withdraw(new anchor.BN(0.02 * anchor.web3.LAMPORTS_PER_SOL))
      .accountsPartial({
        user: provider.wallet.publicKey,
        vaultState,
        vault,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const vaultInfo = await provider.connection.getAccountInfo(vault);
    const vaultBalance = await provider.connection.getBalance(vault);

    expect(vaultInfo).to.not.be.null;
    expect(vaultBalance).to.be.equal(0.03 * anchor.web3.LAMPORTS_PER_SOL);

    console.log("\nYour transaction signature", tx);
    console.log("Your vault balance", vaultBalance.toString());
  });

  it("Close vault", async () => {
    const tx = await program.methods
      .close()
      .accountsPartial({
        user: provider.wallet.publicKey,
        vaultState,
        vault,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const vaultInfo = await provider.connection.getAccountInfo(vault);
    const vaultBalance = await provider.connection.getBalance(vault);

    expect(vaultInfo).to.be.null;
    expect(vaultBalance).to.be.equal(0);

    console.log("\nYour transaction signature", tx);
    console.log("Your vault balance", vaultBalance.toString());
  });
});
