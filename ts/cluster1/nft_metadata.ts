import wallet from "../wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    // Follow this JSON structure
    // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

    const image =
      "https://devnet.irys.xyz/CUqkHs92n9tgU5BriQHCkU7L31WUqR3L3DvJcBfqxpuv";

    const metadata = {
      name: "Emerson",
      symbol: "EME",
      description: "That's just emerson",
      image: image,
      attributes: [
        { trait_type: "glasses", value: "VERY COOL glasses" },
        { trait_type: "hair", value: "very nice" },
        { trait_type: "country", value: "i dont know bro..." },
        { trait_type: "smile", value: "beautiful" },
        { trait_type: "skin_tone", value: "handsome" },
      ],
      properties: {
        files: [
          {
            type: "image/png",
            uri: image,
          },
        ],
      },
      creators: [],
    };
    const myUri = await umi.uploader.uploadJson(metadata);
    console.log("Your metadata URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
// https://devnet.irys.xyz/EpeDEADCFyuh5d5ewJ9StEEnC6neATRha28mqApwaK4m
