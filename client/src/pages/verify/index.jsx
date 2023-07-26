import { useState } from "react";
// import useEth from "../../contexts/EthContext/useEth";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { Input } from "reactstrap";
import styles from "./index.module.css";

function Verify() {
  // const { state } = useEth();
  const [imageURL, setImageURL] = useState(null);
  const [storedHash, setStoredHash] = useState(null);
  const client = create("/ip4/127.0.0.1/tcp/5001");

  const handleRetrieve = async (e) => {
    e.preventDefault();
    try {
      const resp = await client.cat(storedHash);
      let content = [];
      for await (const chunk of resp) {
        content = [...content, ...chunk];
      }
      setImageURL(
        `data:image/png;base64,${Buffer.from(content).toString("base64")}`
      );
    } catch (e) {
      alert("Error fetching document by hash");
    }
  };

  const demo = (
    <>
      <div className={styles.verifyContainer}>
        {imageURL ? (
          //Show preview if image url can be retrieved from ipfs
          <>
            <div className="signaturePreview">
              <div>Preview</div>
              <img src={imageURL} alt="signature" className="signature" />
              <button
                className="submitBtn"
                onClick={() => {
                  setStoredHash(null);
                  setImageURL(null);
                }}
              >
                Verify Again
              </button>
            </div>
          </>
        ) : (
          //Show user input to verify for hash
          <div>
            <Input
              id="hash"
              name="hash"
              placeholder="Enter hash to verify"
              bsSize="lg"
              onChange={(e) => setStoredHash(e.target.value)}
            />
            <button className="submitBtn" onClick={handleRetrieve}>
              Verify
            </button>
          </div>
        )}
      </div>
    </>
  );

  return <div className={styles.verify}>{demo}</div>;
}

export default Verify;
