import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { VaultProgram } from "../target/types/vault_program";
import BN from "bn.js";

describe("vault-program", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.VaultProgram as Program<VaultProgram>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });

  it("Deposits 0.5!", async () => {
    const tx = await program.methods.deposit(new BN(0.5)).rpc();
    console.log("Your transaction signature", tx);
  });

  it("Withdraws 0.5!", async () => {
    const tx = await program.methods.withdraw(new BN(0.5)).rpc();
    console.log("Your transaction signature", tx);
  });

  it("Close the vault!", async () => {
    const tx = await program.methods.close().rpc();
    console.log("Your transaction signature", tx);
  });
});
