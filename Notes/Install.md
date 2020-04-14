# yarn setup --env stage

```sh
$ yarn setup --env stage  # "node node_scripts/setup"
```

$ node node_scripts/deploy_api --env stage
Serverless: Packaging service...
Serverless: Excluding development dependencies...

等一段時間

Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service uportlandia.zip file to S3 (5.03 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
CloudFormation - UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - uportlandia-stage
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - ServerLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - ServerLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1586761453253
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - ServerLambdaVersionFZqjT52kQogdqCsrGNajdlAUChpUFO5k4Xe3BU136D8     
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1586761453253
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - ServerLambdaVersionFZqjT52kQogdqCsrGNajdlAUChpUFO5k4Xe3BU136D8     
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::Deployment - ApiGatewayDeployment1586761453253
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - ServerLambdaVersionFZqjT52kQogdqCsrGNajdlAUChpUFO5k4Xe3BU136D8        
CloudFormation - UPDATE_COMPLETE_CLEANUP_IN_PROGRESS - AWS::CloudFormation::Stack - uportlandia-stage
CloudFormation - DELETE_IN_PROGRESS - AWS::ApiGateway::Deployment - ApiGatewayDeployment1586325279662
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - ServerLambdaVersiont1p11bnJsTuMSUyjbBrEQFQEVV91ZjfLiIIFMs9gelM
CloudFormation - DELETE_COMPLETE - AWS::ApiGateway::Deployment - ApiGatewayDeployment1586325279662
CloudFormation - UPDATE_COMPLETE - AWS::CloudFormation::Stack - uportlandia-stage
Serverless: Stack update finished...
Service Information
service: uportlandia
stage: stage
region: us-east-1
stack: uportlandia-stage
resources: 11
api keys:
  None
endpoints:
  ANY - https://qvf0w859sk.execute-api.us-east-1.amazonaws.com/stage/{proxy+}
functions:
  server: uportlandia-stage-server
layers:
  None

Stack Outputs
ServiceEndpoint: https://qvf0w859sk.execute-api.us-east-1.amazonaws.com/stage
ServerlessDeploymentBucketName: uportlandia-stage-serverlessdeploymentbucket-ubt51r62dj7y
ServerLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:346795296483:function:uportlandia-stage-server:4

Serverless: Stack Output saved to file: stack.json
Serverless: Removing old service artifacts from S3...
signer.stage.js created
S3 Bucket created {}
$ node node_scripts/deploy_static --env stage
$ react-scripts build
Creating an optimized production build...
Browserslist: caniuse-lite is outdated. Please run next command `yarn upgrade`
Compiled with warnings.


Search for the keywords to learn more about each warning.
To ignore, add // eslint-disable-next-line to the line before.

File sizes after gzip:

  405.44 KB (+96 B)    build\static\js\2.9b2c8926.chunk.js
  60.31 KB (+2.02 KB)  build\static\js\main.bcbda3e4.chunk.js
  762 B                build\static\js\runtime~main.a8a9905a.js
  622 B                build\static\css\main.471e54a4.chunk.css

The project was built assuming it is hosted at https://uportlandia.uport.me.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.
You may serve it with a static server:

  yarn global add serve
  serve -s build

Find out more about deployment here:

  https://bit.ly/CRA-deploy

did.json created
$ C:\rd\uport-did\node_modules\.bin\s3-deploy './build/**' './build/.well-known/**' --cwd './build/' --region us-east-1 --bucket
 uport.jacobhsu.us
Deploying files:
► Target S3 bucket: uport.jacobhsu.us (us-east-1 region)
► Private: false
Upload finished
$ C:\rd\uport-did\node_modules\.bin\cloudfront-invalidate-cache --cname uport.jacobhsu.us
Error: Distribution matching cname "uport.jacobhsu.us" was not found.
    at main (C:\rd\uport-did\node_modules\cloudfront-invalidate-cache\index.js:26:11)
    at process._tickCallback (internal/process/next_tick.js:68:7)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
(node:12368) UnhandledPromiseRejectionWarning: undefined
(node:12368) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of a
n async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)        
(node:12368) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that a
re not handled will terminate the Node.js process with a non-zero exit code.
Your bucket URL is:

`http://uport.jacobhsu.us.s3-website.us-east-1.amazonaws.com/`

You are all set! To build and deploy the static site run

yarn deploy:stage

## AWS

[Amazon S3](https://s3.console.aws.amazon.com/s3/buckets/uport.jacobhsu.us/?region=us-east-1)/uport.jacobhsu.us
屬性 靜態網站託管

終端節點 : `http://uport.jacobhsu.us.s3-website-us-east-1.amazonaws.com
索引文件 index.html
錯誤文件 index.html

s3 上傳 build程式文件
route53 建立紀錄集


## Lambda

函式 uportlandia-stage-server

環境變數 (2)
ISSUERS 

```
{"MUSEUM":{"did":"did:ethr:0x4bd95a21e9825c2760ff100f52bd8e2e0f50fe3f","key":"12723bf7453d4d1180aad86a1bafcac98b6b76e149b086259ccfc48e030b332b","vc":["/ipfs/Qmatg9nV2zM9dCt7nD3exLBYBDPjq9tV2TtfDNYUUdR6su"]},...
```