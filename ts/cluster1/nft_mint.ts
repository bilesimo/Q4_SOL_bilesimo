import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createSignerFromKeypair,
  signerIdentity,
  generateSigner,
  percentAmount,
} from "@metaplex-foundation/umi";
import {
  createNft,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../wba-wallet.json";
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata());

const mint = generateSigner(umi);

(async () => {
  let tx = createNft(umi, {
    mint,
    uri: "https://devnet.irys.xyz/HzqJ8pb3ETuenCTVExzSUGMAYPMrn5vV3B8LLKL3xi6X",
    name: "Smiley Emerson",
    sellerFeeBasisPoints: percentAmount(1),
  });
  let result = await tx.sendAndConfirm(umi);
  const signature = base58.encode(result.signature);

  console.log(
    `Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`
  );

  console.log("Mint Address: ", mint.publicKey);
})();
// https://explorer.solana.com/tx/2nX6jqiPiNKTefVrxCQn3xmmaHhoRvge1v4LohVsytVtbjcY4tutVyp8iSM65cXZ3Nu9jsgESDhKi3APSN1uKWYa?cluster=devnet
// https://explorer.solana.com/address/Cv2p6zkmLo77wCPx8TPng5DaoMwdU321zCEWiTWR3YH2?cluster=devnet
