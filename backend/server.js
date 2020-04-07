const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");

const Credentials = require("uport-credentials").Credentials;

const RPC_URL = "https://mainnet.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c";


const app = express();
app.use(cors());
app.use(bodyParser.json());

const getCredentials = (serviceId) => {
    // if(!ISSUERS[serviceId])
    //   throw new Error("Invalid serviceId");
    return new Credentials({
      did: 'did:ethr:0x8bb183661b5a34de9b9335121cd6d52dda36891d"' ,// ISSUERS[serviceId].did,
      privateKey: 'e7c670843c016850d4ae3f20276e73755a6c91a2f6046abcef55f0fe42a3533e', //ISSUERS[serviceId].key,
      ethrConfig: {
        rpcUrl: RPC_URL
      }
    });
}

app.get('/', (req, res) => res.send('Hello Backend!'))

app.get("/api/ping", (req, res) => {
    res.send("OK");
});


// 生成Qr Code
app.post("/api/request_disclosure", async (req, res) => {
    
    console.log("/api/request_disclosure req.body--")
    console.log(req.body); 

    const {
      serviceId,
      requested=["name"],
      verified=[],
      notifications=false,
      callbackUrl,
      expiresIn=600
    } = req.body;
    const credentials = getCredentials(serviceId);
    const jwt = await credentials.createDisclosureRequest({
      requested,
      verified,
      notifications,
      callbackUrl: 'http://localhost:3001/callback', //callbackUrl,
      accountType: "none",
      vc:[
        "/ipfs/QmXLhSxiQt89kY9mnWUPAZYna1a51jmqLVPf6iN4TGdJK1"
      ]// vc: ISSUERS[serviceId].vc
    }, expiresIn);
    // console.log({ jwt }) // { jwt:'xxx..' }
    // const qr =  transports.ui.getImageDataURI(uri)
    // res.send(`<div><img src="${qr}"/></div>`)
    res.json({ jwt });
});

// Disclosure Response Authentication Service
// after scan QR
app.post('/callback', (req, res) => {
    console.log('/callback----')
})

app.post("/api/send_verification", async (req, res) => {
    const {
      serviceId,
      sub,
      claim,
      callbackUrl
    } = req.body;
    const credentials = getCredentials(serviceId);
    const jwt = await credentials.createVerification({
      sub,
      vc: ISSUERS[serviceId].vc,
      claim,
      callbackUrl
    });
    res.json({ jwt });
  });
  
app.post("/api/verify_credentials", async (req, res) => {
    const { serviceId, token } = req.body;
    const credentials = getCredentials(serviceId);
    const response = await verifyJWT(token, { audience: credentials.did });
    const profile = await credentials.processDisclosurePayload(response);
    profile.publicEncKey = profile.boxPub;
    res.json({ profile });
});

const port = process.env.PORT || 3001
app.listen(port, () => 
    console.log(`Server is listening on port ${port}.`)
)