import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue }) {
  const {
    state: { contract, accounts },
  } = useEth();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const get = async () => {
    const value = await contract.methods.get().call({ from: accounts[0] });
    setValue(value);
  };

  const set = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to set.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.set(newValue).send({ from: accounts[0] });
  };
  return (
    <div className="btns">
      <button onClick={get}>get()</button>

      <div onClick={set} className="input-btn">
        set(
        <input
          type="text"
          placeholder="string memory"
          value={inputValue}
          onChange={handleInputChange}
        />
        )
      </div>
    </div>
  );
}

export default ContractBtns;
