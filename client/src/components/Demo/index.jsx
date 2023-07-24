import { useRef, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import SignatureCanvas from "react-signature-canvas";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

function Demo() {
  const { state } = useEth();
  const sigCanvas = useRef();
  const [imageURL, setImageURL] = useState(null);
  const [storedHash, setStoredHash] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);
  const client = create("/ip4/127.0.0.1/tcp/5001");

  const upload = async () => {
    const base64String = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setImageURL(base64String);
    const buffer = Buffer.from(base64String.split(",")[1], "base64");
    await client.add(buffer).then((res) => {
      setStoredHash(res.cid.toString());
      state.contract.methods.set(res.cid.toString()).send(
        {
          from: state.accounts[0],
        },
        (error, transactionHash) => {
          setTransactionHash(transactionHash);
        }
      );
    });
  };

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

  const clearSignature = () => {
    sigCanvas.current.clear();
    setImageURL(null);
    setStoredHash(null);
    setTransactionHash(null);
  };

  const demo = (
    <>
      <div className="demoContainer">
        <div className="signatureTitle">
          <span>Signature</span>
          <button className="clearBtn" onClick={clearSignature}>
            Clear
          </button>
        </div>

        <div className="sigPadContainer">
          <SignatureCanvas
            penColor="black"
            canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
            ref={sigCanvas}
          />
        </div>
        <button className="submitBtn" onClick={upload}>
          Submit
        </button>
        {imageURL && (
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
        <div className="valueText">{transactionHash ?? "unavailable"}</div>
      </div>
    </>
  );

  return (
    <div className="demo">
      {!state.artifact ? (
        <NoticeNoArtifact />
      ) : !state.contract ? (
        <NoticeWrongNetwork />
      ) : (
        demo
      )}
    </div>
  );
}

export default Demo;
