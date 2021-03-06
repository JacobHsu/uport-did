import { call, put, spawn, takeEvery } from "redux-saga/effects"
import { push, replace } from "connected-react-router"

import {
  REDIR_REGN_HOME,
  REDIR_REGN_FORM,
  REDIR_REGN_FORM_BANK,
  REDIR_REGN_FORM_SUB,
  REDIR_REGN_FORM_SUB_BANK,
  REDIR_REGN_RCD,
  REDIR_REGN_RCD_BANK,
  REDIR_REGN_EXISTS,
  REDIR_REGN_EXISTS_BANK,
  REDIR_FAIL,
  REDIR_SERV_HOME,
  REDIR_RCV_CLAIM,
  REDIR_RCD_CLAIM,
  NAV_EXTERNAL,
  REDIR_HOME
} from "../constants/actions";
import { navigateExternalReset } from "../actions";
import { SERVICES, registration, myregistration } from "../constants/config";

const regnBaseUrl = SERVICES[registration.serviceId].url;
const regnBankUrl = SERVICES[myregistration.serviceId].url;

function* redirectToHome() {
  yield put(push("/"));
}

function* redirectToRegnHome() {
  yield put(push("/city"));
}

function* redirectToRegnBank() {
  yield put(push("/bank"));
}

function* redirectToRegnForm() {
  yield put(push(`${regnBaseUrl}/form`));
}

function* redirectToRegnBankForm() {
  yield put(push(`${regnBankUrl}/form`));
}

function* redirectToRegnFormSubmit() {
  yield put(push(`${regnBaseUrl}/submitted`));
}

function* redirectToRegnFormBankSubmit() {
  yield put(push(`${regnBankUrl}/submitted`));
}

function* redirectToRegnReceived() {
  yield put(push(`${regnBaseUrl}/complete`));
}

function* redirectToRegnBankReceived() {
  yield put(push(`${regnBankUrl}/complete`));
}

function* redirectToRegnExists() {
  yield put(push(`${regnBaseUrl}/exists`));
}

function* redirectToRegnBankExists() {
  yield put(push(`${regnBankUrl}/exists`));
}

function* redirectToServiceHome(action) {
  const { serviceId } = action;
  yield put(push(SERVICES[serviceId].url));
}

function* redirectToFailure(action) {
  const { serviceId } = action;
  yield put(push(`${SERVICES[serviceId].url}/prerequisites`));
}

function* redirectToReceiveClaim(action) {
  const { serviceId } = action;
  yield put(push(`${SERVICES[serviceId].url}/receive`));
}

function* redirectToClaimReceived(action) {
  const { serviceId } = action;
  yield put(push(`${SERVICES[serviceId].url}/complete`));
}

function* navigateExternal(action) {
  const { url } = action;
  const pause = () => new Promise((resolve) => setTimeout(resolve, 4000));
  yield put(push("/redirect"));
  yield call(pause);
  yield put(replace(url));
  yield put(navigateExternalReset());
}

export default function* handleRedirects() {
  yield spawn(takeEvery, REDIR_REGN_HOME, redirectToRegnHome);
  yield spawn(takeEvery, REDIR_REGN_HOME, redirectToRegnBank);
  yield spawn(takeEvery, REDIR_REGN_FORM, redirectToRegnForm);
  yield spawn(takeEvery, REDIR_REGN_FORM_BANK, redirectToRegnBankForm);
  yield spawn(takeEvery, REDIR_REGN_FORM_SUB, redirectToRegnFormSubmit);
  yield spawn(takeEvery, REDIR_REGN_FORM_SUB_BANK, redirectToRegnFormBankSubmit);
  yield spawn(takeEvery, REDIR_REGN_RCD, redirectToRegnReceived);
  yield spawn(takeEvery, REDIR_REGN_RCD_BANK, redirectToRegnBankReceived);
  yield spawn(takeEvery, REDIR_REGN_EXISTS, redirectToRegnExists);
  yield spawn(takeEvery, REDIR_REGN_EXISTS_BANK, redirectToRegnBankExists);
  yield spawn(takeEvery, REDIR_SERV_HOME, redirectToServiceHome);
  yield spawn(takeEvery, REDIR_RCV_CLAIM, redirectToReceiveClaim);
  yield spawn(takeEvery, REDIR_RCD_CLAIM, redirectToClaimReceived);
  yield spawn(takeEvery, REDIR_FAIL, redirectToFailure);
  yield spawn(takeEvery, NAV_EXTERNAL, navigateExternal);
  yield spawn(takeEvery, REDIR_HOME, redirectToHome);
}
