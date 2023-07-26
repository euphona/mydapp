import { useRef, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import SignatureCanvas from "react-signature-canvas";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

function Verify() {
  const { state } = useEth();
  const sigCanvas = useRef();
  const [imageURL, setImageURL] = useState(null);
  const [storedHash, setStoredHash] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);
  const client = create("/ip4/127.0.0.1/tcp/5001");

  const download = async () => {
    const value = await state.contract.methods
      .get()
      .call({ from: state.accounts[0] });
    const resp = await client.cat(value);
    let content = [];
    for await (const chunk of resp) {
      content = [...content, ...chunk];
    }
    const a = document.createElement("a");
    a.href = `data:image/png;base64,${Buffer.from(content).toString("base64")}`;
    a.download = "signature";
    a.click();
  };

  const demo = (
    <>
      <div className="demoContainer">
        {/* {imageURL && (
          <button className="submitBtn" onClick={download}>
            Download
          </button>
        )}
      </div>
      <div className="signaturePreview">
        <div>Preview</div>
        {imageURL ? (
          <>
            <img src={imageURL} alt="signature" className="signature" />
          </>
        ) : (
          <div className="noSignature">No preview yet</div>
        )}
        <div className="labelText">Contract Address</div>
        <div className="valueText">
          {imageURL ? state.accounts[0] : "unavailable"}
        </div>
        <div className="labelText">Stored Hash</div>
        <div className="valueText">{storedHash ?? "unavailable"}</div>
        <div className="labelText">Transaction Hash</div>
        <div className="valueText">{transactionHash ?? "unavailable"}</div> */}
      </div>
    </>
  );

  return <div className="demo">{demo}</div>;
}

export default Verify;
