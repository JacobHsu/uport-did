# Get Started

從 components 發現 router, 從 router 出發

components\Home\Header.js

`<CapsuleLinkButton to="/city">{t("Get Started")}</CapsuleLinkButton>`

routes\index.js

registration.path
```js
import { SERVICES, registration } from "../../constants/config";
    <Route path={registration.path} render={() =>
      <App serviceId={registration.serviceId}>
        <Registration />
      </App>} />
```

Registration\index.js

```js
import { SERVICES, registration } from "../../constants/config";
const { serviceId } = registration;
```

# form

-- Route
components\RegistrationBank\index.js

```js
import { SERVICES, myregistration } from "../../constants/config";
const { serviceId } = myregistration; // fiexed

Route path={`${SERVICES[serviceId].url}/form`} exact render={() =>
```

-- API

src\sagas\redirects.js

```js

import { SERVICES, registration, myregistration } from "../constants/config";
const regnBankUrl = SERVICES[myregistration.serviceId].url;
 function* redirectToRegnBankForm() {
  yield put(push(`${regnBankUrl}/form`));
}

yield spawn(takeEvery, REDIR_REGN_FORM_BANK, redirectToRegnBankForm);
```

-- Action

constants\actions.js

```js
export const REDIR_REGN_FORM_BANK   = "REDIR_REGN_FORM_BANK";
```

src\actions\index.js

```js
export const redirectToRegnFormBank = () => ({
  type: ACTIONS.REDIR_REGN_FORM_BANK
});
```

-- components

components\RegistrationBank\Landing.js

```js
<LoginButton text={t("Continue")} onClick={redirectToRegnForm} />
```

components\RegistrationBank\LandingContainer.js

```js
import * as actions from "../../actions";
const mapDispatchToProps = dispatch => ({
  redirectToRegnForm() {
    dispatch(actions.redirectToRegnFormBank()); //fixed
  },
```

UI -> Actions -> dispatch -> reducers (Redux-Saga) [sagas\redirects.js]