import { EthProvider } from "./contexts/EthContext";
import Demo from "./components/demo";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Demo />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;

// import React, { Component } from "react";
// import { Buffer } from "buffer";
// import Web3 from "web3";
// import { create } from "ipfs-http-client";
// import storeMyValue from "./storeMyValue";
// const client = create("/ip4/127.0.0.1/tcp/5001");
// class App extends Component {
//   state = {
//     ipfsHash: null,
//     buffer: "",
//     transactionHash: "",
//     gasUsed: "",
//     txReceipt: "",
//   };
//   captureFile = (event) => {
//     event.stopPropagation();
//     event.preventDefault();
//     const file = event.target.files[0];
//     let reader = new window.FileReader();
//     reader.readAsArrayBuffer(file);
//     reader.onloadend = () => this.convertToBuffer(reader);
//   };
//   convertToBuffer = async (reader) => {
//     //file is converted to a buffer for upload to IPFS
//     const buffer = await Buffer.from(reader.result);
//     //set this buffer -using es6 syntax
//     this.setState({ buffer });
//   };

//   ethEnabled = async () => {
//     if (window.ethereum) {
//       await window.ethereum.request({ method: "eth_requestAccounts" });
//       window.web3 = new Web3(window.ethereum);
//       return true;
//     }
//     return false;
//   };

//   onSubmit = async (event) => {
//     event.preventDefault();
//     const accounts = await web3.eth.getAccounts();
//     console.log("Sending from Metamask account: ", accounts[0]);
//     const ethAddress = await storeMyValue.options.address;
//     this.setState({ ethAddress });
//     await client.add(this.state.buffer).then((res) => {
//       console.log(res.path);
//       storeMyValue.methods.set(res.path).send(
//         {
//           from: accounts[0],
//         },
//         (error, transactionHash) => {
//           console.log("transaction hash is ", transactionHash);
//           this.setState({ transactionHash });
//         }
//       );
//     });
//   };
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <h1> IPFS Dapp</h1>
//         </header>
//         <hr />
//         <h3> Choose file to send to IPFS </h3>
//         <form onSubmit={this.onSubmit}>
//           <input type="file" onChange={this.captureFile} />
//           <button type="submit"> Send it </button>
//         </form>
//         <hr />
//         <table>
//           <thead>
//             <tr>
//               <th>Sl No</th>
//               <th>Values</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>IPFS Hash # stored on Eth Contract</td>
//               <td>{this.state.ipfsHash}</td>
//             </tr>
//             <tr>
//               <td>Ethereum Contract Address</td>
//               <td>{this.state.ethAddress}</td>
//             </tr>
//             <tr>
//               <td>Tx Hash # </td>
//               <td>{this.state.transactionHash}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }
// export default App;
