
# AWS

管理與管控 > [Systems Manager](https://console.aws.amazon.com/systems-manager/)
AWS Systems Manager > Parameter Store(參數存放區) 

名稱 /uportlandia/stage/issuers | 方案 Standard  | 類型 SecureString

/uportlandia/stage/issuers

```json
{
  "MUSEUM": {
    "did": "did:ethr:0xebde2b053de2ef895c95503cbbf7057f06bfeb29",
    "key": "644ea356491b24d820882878d2bcc127c98deed45de4b136d2e4cb3013f696b0",
    "vc": [
      "/ipfs/QmQykuZBrZaYWhGbQef8p9oxkFjP6VLeooXkZZvpiDUDwz"
    ]
  },
  "TRANSPORT": {
    "did": "did:ethr:0xecde45730261fdeca15f7d1065cf772d43bf5be1",
    "key": "5ad1e0e8c8fd2801ded4d2a568fb4171abd457ae1cdfe8b1623fad2b973f442d",
    "vc": [
      "/ipfs/QmfEGMofohy2gA6sCVHbW1epjjfWizXoTg2YazoPkoomPn"
    ]
  },
  "PHARMACY": {
    "did": "did:ethr:0x23f66c121db67bfb11496e09783bb92553ccab21",
    "key": "b807473d3c02dba94557de34bdbac4948d9163d636485ab3e98ff857286671f4",
    "vc": [
      "/ipfs/QmXHYpw2dHMWyC7aUPRhFr6A6okNse9AtAn8M5QxoyVf2F"
    ]
  },
  "INSURANCE": {
    "did": "did:ethr:0xfa2da0e5c4c2eca8824e60872248e85973e8d1ea",
    "key": "6d2643f4817bf76e12646e8beabd2aafeceac13954e991326ce906e9fee07cd0",
    "vc": [
      "/ipfs/QmeCrT6Ahc735gNRv1fmVQhGjNuB386KMA14LsjVhQoNfU"
    ]
  },
  "COMPANY": {
    "did": "did:ethr:0x15b0a62064d1740b7644e60880f8c43066c36cb9",
    "key": "6cf11a2aa603c00ca891877db070e6de2a0bfc3594e72d191d87de65515970ec",
    "vc": [
      "/ipfs/QmXdMwKMsWCadJrrWDmAz5zDpNMBYw6m3DhQW68fEGpmfY"
    ]
  },
  "DIPLOMA": {
    "did": "did:ethr:0x1afafaa6b059e56331ad4597239e56aedb35cb75",
    "key": "115773de90883b6d9df42eeb297d2d31badd3413b6d87d05304f228ac7bf1279",
    "vc": [
      "/ipfs/QmTq6cXRpyTcBULEiFnyMgH6MrnHH5r4UQiiyE9fCb1M3s"
    ]
  },
  "CITY_ID": {
    "did": "did:ethr:0x8bb183661b5a34de9b9335121cd6d52dda36891d",
    "key": "e7c670843c016850d4ae3f20276e73755a6c91a2f6046abcef55f0fe42a3533e",
    "vc": [
      "/ipfs/QmXLhSxiQt89kY9mnWUPAZYna1a51jmqLVPf6iN4TGdJK1"
    ]
  }
}
```

### scan Qr Code

Login.js

```js
{qrData} //data:image/png;charset=utf-8;base64, iVBORw0KGgoAAAANSUhEUgAAAfkAAAH5CAAAAACn3Rg4AAANjklEQVR42u3d247jRhZFQf//T/c8DjBAsfbKVBsYMfjU7lJJZMYRcG62//njeuf1jyMg7yLvIu8i7yLvIu8i7yLvIu8i7yLvIu8i7yL

<QRWrapper>
  <a href={url} target="_blank">
    <img className="qr" src={qrData} alt="QR" />
  </a>
</QRWrapper>
```

```js
// login.url: "me.uport:req/eyJ0eXAiO
componentDidUpdate(prevProps, prevState) {
    const pngBuffer = qrImage.imageSync(login.url, { type: "png" });
    const qrData = "data:image/png;charset=utf-8;base64, " + pngBuffer.toString("base64");
    this.setState({ qrData });
```

sagas\credentials.js

```js
import createJwtUrl from "../utils/createJwtUrl";
function* requestDisclosure(action) {
  yield call(request, `${SIGNER_URL}api/request_disclosure`, {

  const { jwt } = response.json;
    const jwtUrl = yield call(createJwtUrl, jwt, callbackUrl, isMobile);
    yield put(reqDisclosureSuccess(callbackId, jwtUrl));
```

utils\createJwtUrl.js

```js
async function createJwtUrl(jwt, redirectUrl, isMobile) {
  let baseUrl = "me.uport:req/";
  return `${baseUrl}${jwt}`; // me.uport:req/eyJ0eXAiO
```

https://api.uport.space/chasqui/topic/0uoqKL3Kg

```json
{"status":"success","message":{"id":"0uoqKL3Kg","content":null,"expiration":"2020-04-08T09:55:29.883Z"}}
```

sagas\pollChasqui.js

```
import createChasquiUrl from "../utils/createChasquiUrl";
```

createChasquiUrl.js

```js
import shortId from "shortid";

import { CHASQUI_URL } from "../constants/config";

export default (id=shortId.generate()) =>
  `${CHASQUI_URL}topic/${id}`; // https://api.uport.space/chasqui/topic/0uoqKL3Kg
```

src\constants\config.js

```js
const getChasquiUrl = () => process.env.REACT_APP_TARGET_ENV === "prod"
  ? "https://api.uport.me/chasqui/"
  : "https://api.uport.space/chasqui/";
```
