import { useRef, useEffect } from "react";

function Contract({ storedData }) {
  const spanEle = useRef(null);

  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [storedData]);

  return (
    <code>
      {`contract SimpleStorage {
  string private storedData = `}

      <span className="secondary-color" ref={spanEle}>
        <strong>{storedData}</strong>
      </span>

      {`;

  function write(string memory x) public {
    storedData = x;
  }

  function read() public view returns (string memory) {
    return storedData;
  }
}`}
    </code>
  );
}

export default Contract;
