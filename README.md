# uPortlandia

uPortlandia is our vision of the future of data and identity management.  We hope that the examples contained within this repository will serve as a guide for your adoption of sovereign identity solution(s).

![uportlandia](https://j.gifs.com/wVrrvr.gif)

What's inside:

- [x] Serverless artifacts created:
  - [x] KMS key for SSM
  - [x] S3 Bucket for static site deployment
  - [x] API gateway lambda function to securely sign claims
- [x] Setup task:
  - [x] Creates Issuer (application) Identities
  - [x] Stores the generated Identity key/pairs in SSM 

## localhost

### backend

**Lambdas**

Start Serverless Offline:
```
yarn local:api
```

// src\server.js  -> backend/server.js  
// cd backend `$ node server`

### frontend 

`$ yarn start`

### References

uport-project / [uportlandia](https://github.com/uport-project/uportlandia)

### Requirements

- NodeJS 10+
- [Yarn](https://yarnpkg.com) ( `curl -o- -L https://yarnpkg.com/install.sh | bash` )
- Serverless Framework (`npm install serverless -g`)
- AWS (managed by serverless)

### Initial Setup

**Step 1**

Change [setup_config.js](./setup_config.js) to suit your requirements

**Step 2**

Save your AWS credentials in `~/.aws/credentials` under the `[default]` profile.

**Step 3**

```sh
$ yarn setup --env stage  # "node node_scripts/setup"
```

The setup script
- registers Issuer Entities
- saves private keys and DIDs to SSM parameter store
- deploys the signer lambdas
- builds the static bundle and uploads to an S3 bucket

[Ctrl-C] to cancel; To continue with the setup, press [Enter]
Do you want to use an [E]xisting key of create a [n]ew one?

[維吉尼亞州北部 us-east-1]
Key Management Service (KMS)  
安全性、身分與合規 > [Key Management Service](https://console.aws.amazon.com/kms)
AWS 受管金鑰 / 客戶受管金鑰 全列出  

選擇 客戶受管金鑰 [已啟用] 或 新建

Creating a new KMS key...

客戶受管金鑰 會新增一筆 狀態[已啟用]

### - saves  DIDs to SSM parameter store
[Ctrl-C] to cancel. To save this to SSM, press [Enter]

[AWS Systems Manager](https://docs.aws.amazon.com/zh_cn/systems-manager/latest/userguide/systems-manager-quick-setup.html)
管理與管控 > [Systems Manager](https://console.aws.amazon.com/systems-manager/)

利用 Parameter Store (`Aws > 管理與管控 > Systems Manager > 參數存放區`) 來儲存 credentials 和 config 等機敏性參數  (`put-parameter`、`get-parameters`)

名稱 `/uportdid/stage/issuers` | 方案 `Standard`  | 類型 `SecureString`

值

{"MUSEUM":{"did":"did:ethr:0x83082ab6fc6f12e11dbfa154d3f9b8007eb2a7a9","key":"0b3042445fdc1d46b1e0ee95c4b89eb536d4ab2b67c6457ea91e3ae63a3cbc7c","vc":["/ipfs/QmTjr677fpRWipkwAWRfW7p7bdAcf9h94VEBY8tAD6hQex"]},..."CITY_ID":{"did":"did:ethr:0xdee060664d4183e8f8c7a178908cf1d45e72b96b","key":"70633bf84d93190012263bad4fea65af1ca914154f2dc0569d0f872ed8a8aded","vc":["/ipfs/QmZ3pEovbV21JyS7ipfFeAxAFxfisxq3BfFno5kEe1a5ky"]}}

> '.' 不是內部或外部命令、可執行的程式或批次檔。

node_scripts\deploy_api.js

windows環境設成全域執行

```js
async function deployAPI() {
  const args = argParse();
  // await run("./node_modules/.bin/sls", [ "deploy", "-v", "-s", args.env ]);
  // npm install serverless -g
  await run("sls", [ "deploy", "-v", "-s", args.env ]);
}
```

### - deploys the signer lambdas

$ ./node_modules/.bin/sls
生成  node_scripts 
.gitignore serverless.yml handler.js

`serverless.js` 對應 `serverless.yml

`$ node node_scripts/deploy_api --env stage`
Serverless: Packaging service...
Serverless: Excluding development dependencies...

等一段時間

Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service uportlandia.zip file to S3 (5.03 MB).

---

> Serverless Error ---------------------------------------
An error occurred: ServerLambdaFunction - The runtime parameter of nodejs8.10 is no longer supported

fixed serverless.js

```js
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
```

Amazon S3 > /uportlandia-stage-serverlessdeploymentbucket-ubt51r62dj7y/ > serverless > /uportlandia/ > stage > uportlandia.zip 

### - builds the static bundle and uploads to an S3 bucket

setup_config.js

[s3Bucket](https://s3.console.aws.amazon.com/s3/home?region=us-east-1) name 要唯一的

```js
  s3Bucket: {
    stage: "uportdid-stage", //"cleverland-stage",
    prod: "cleverland-prod"
  },
```

生成`build`資料夾

儲存貯體 uportdid-stage

儲存貯體是空的，將 `build` 資料夾內容上傳

Deploying files:
► Target S3 bucket: uportdid-stage (us-east-1 region)

The project was built assuming it is hosted at https://uportlandia.uport.me.
You can control this with the homepage field in your package.json.

靜態網站託管
終端節點 : http://uportdid-stage.s3-website-us-east-1.amazonaws.com

> Error: Distribution matching cname "jacobhsu.us" was not found.

### visit http://uportdid-stage.s3-website-us-east-1.amazonaws.com

403 Forbidden
Code: AccessDenied
Message: Access Denied

[步驟 7：編輯封鎖公有存取設定](https://docs.aws.amazon.com/zh_tw/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html#upload-website-content) 勾選檔案(除.well-known) 動作>`使公有化`
前一步 封鎖公開存取 (儲存貯體設定) `取消`
靜態網站託管 `使用此儲存貯體來託管網站 index.html`

或 [新增儲存貯體政策以允許公有讀取](https://aws.amazon.com/tw/getting-started/projects/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/module-1/)

選擇 `Permissions (許可)` 索引標籤，然後選擇 `Bucket Policy (儲存貯體政策)`
將下列政策文件輸入至儲存貯體政策編輯器，同時將 `[YOUR_BUCKET_NAME]` 取代為您已在區段 1 建立的儲存貯體名稱：

```js
{
    "Version": "2020-10-17",
    "Statement": [
        {
            "Effect": "Allow", 
            "Principal": "*", 
            "Action": "s3:GetObject", 
            "Resource": "arn:aws:s3:::[YOUR_BUCKET_NAME]/*" 
        } 
    ] 
}
```

```js
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::uportdid-stage/*"
        }
    ]
}
```

此儲存貯體具有公開存取權限

http://www.jacobhsu.us.s3-website-us-east-1.amazonaws.com
http://www.jacobhsu.us/


[範例：設定使用 Route 53 註冊的自訂網域名稱設定靜態網站](https://docs.aws.amazon.com/zh_tw/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html#upload-website-content)

建立記錄集
名稱： `www.jacobhsu.us` (注意 **此名稱要與s3Bucket名稱相同** 也不可以用根域名`jacobhsu.us` )
別名目標：`s3-website-us-east-1.amazonaws.com`
(帶出)別名託管區域 ID： Z3AQBSTGFYJSTF

http://www.jacobhsu.us/ 

### .well-known

W3C [Decentralized Identifiers (DIDs) v1.0](https://www.w3.org/TR/did-core/)
did.json

```js
{
  "@context": "https://w3id.org/did/v1",
  "id": "did:https:www.jacobhsu.us",
  "publicKey": [{
    "id": "did:https:www.jacobhsu.us",
    "type": "Secp256k1VerificationKey2018",
    "owner": "did:https:www.jacobhsu.us",
    "ethereumAddress": "0x89f497ac4780f9946920515e8ecdcf7b970b558a"
  }],
  "authentication": [{
    "type": "Secp256k1SignatureAuthentication2018",
    "publicKey": "did:https:www.jacobhsu.us#owner"
  }]
}
```

Distribution matching cname "jacobhsu.us" was not found.

**Step 4:**

Repeat the process for `--env prod`.


### Running Locally

**Lambdas**

Start Serverless Offline:
```
yarn local:api
```

**Front End**

In a separate terminal window, run
```
yarn start
```
Open http://localhost:3000/


### Deploying Changes

**Lambdas**
```
yarn deploy:api --env stage
```

**Front End**
```
yarn deploy:static  --env stage
```

**Note:** `--env` must be `stage` or `prod`.


## Whitelabel Config

1. Change the [Whitelabel Config](src/constants/config.js)
1. Customize the Static Text: [English](src/constants/i18-en.js) and [Spanish](src/constants/i18-es.js)
1. Change the [Color Palette](src/components/shared/theme.js)

[FAQ and helpdesk support](http://bit.ly/uPort_helpdesk)

## serverless.js

`serverless.js` 對應 serverless.yml

```js
  package: {
    exclude: [ "./**" ],
    include: [ "src/server.js" ]
  }
```

服務/運算/[Lambda](https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions)

uportlandia-stage-server
-  API Gateway

src/server.js

```js
const handler = require("serverless-express/handler");
const express = require("serverless-express/express");
```
