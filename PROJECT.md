

sagas\redirects.js

```js
function* redirectToRegnHome() {
  yield put(push("/city"));
}
```

components\Home\Header.js

`<CapsuleLinkButton to="/city">{t("Get Started")}</CapsuleLinkButton>`

routes\index.js

```js
    <Route path={registration.path} render={() =>
      <App serviceId={registration.serviceId}>
        <Registration />
```

components\Registration\index.js


components\Service\Landing.js

> [TypeError ] <Card CTA={CTA}> ..

 {t(SERVICES[serviceId].name)}

i18-en.js

```js
"CityID": "City ID",
"City ID": "City ID",
```

<p>{t(SERVICES[serviceId].details[0])}</p>

src\constants\config.js

```js
 // 補 details
 steps: [
    "bankIdStep1",
    "bankIdStep2",
    "bankIdStep3",
    "bankIdStep4"
  ],
  details: [
  ]
```

`import { SERVICES, registration } from "../../constants/config";`

src\constants\config.js
```
CITY_ID.generatedClaims = [FIRST_NAME, LAST_NAME, ADDRESS, DATE_OF_BIRTH];
```


routes\index.js

```js
import { registration, routes } from "../constants/config";
  <Route path={registration.path} render={() =>
```

src\constants\config.js

import Registration from "../components/Registration";
