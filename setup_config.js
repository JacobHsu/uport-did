module.exports.config = {
  region: "us-east-1",
  serviceName: "uportlandia",
  ssmParam:{
    issuers: "/uportdid/${opt:stage}/issuers"
  },
  s3Bucket: {
    stage: "www.jacobhsu.us", //"cleverland-stage",
    prod: "cleverland-prod"
  },
  domain: {
    stage:  "jacobhsu.us", //"uportlandia.uport.space",
    prod: "uportlandia.uport.me"
  },
  cors: true
};

module.exports.ISSUER_PROFILES = [{
  id: "CITY_ID",
  name: "The City of uPortlandia",
  url: {
    stage: "https://www.jacobhsu.us/city",
    prod: "https://uportlandia.uport.me/city"
  },
  profileImage: "src/images/city-logo.png"
}, {
  id: "DIPLOMA",
  name: "The University of uPortlandia",
  url: {
    stage: "https://www.jacobhsu.us/university",
    prod: "https://uportlandia.uport.me/university"
  },
  profileImage: "src/images/university-logo.png"
}, {
  id: "COMPANY",
  name: "Dream Job LLC.",
  url: {
    stage: "https://www.jacobhsu.us/company",
    prod: "https://uportlandia.uport.me/company"
  },
  profileImage: "src/images/company-logo.png"
}, {
  id: "INSURANCE",
  name: "People Care LLC.",
  url: {
    stage: "https://www.jacobhsu.us/insurance",
    prod: "https://uportlandia.uport.me/insurance"
  },
  profileImage: "src/images/insurance-logo.png"
}, {
  id: "PHARMACY",
  name: "Your Health Medical Center",
  url: {
    stage: "https://www.jacobhsu.us/pharmacy",
    prod: "https://uportlandia.uport.me/pharmacy"
  },
  profileImage: "src/images/pharmacy-logo.png"
}, {
  id: "TRANSPORT",
  name: "uPortlandia City Transit",
  url: {
    stage: "https://www.jacobhsu.us/transport",
    prod: "https://uportlandia.uport.me/transport"
  },
  profileImage: "src/images/transport-logo.png"
}, {
  id: "MUSEUM",
  name: "uPortlandia Museum of Modern Art",
  url: {
    stage: "https://www.jacobhsu.us/museum",
    prod: "https://uportlandia.uport.me/museum"
  },
  profileImage: "src/images/museum-logo.png"
}];
