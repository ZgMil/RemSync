import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest } from "./msalConfig";

const msalInstance = new PublicClientApplication(msalConfig);

export function getActiveAccount() {
  return msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0] || null;
}

export async function signIn() {
  const result = await msalInstance.loginPopup(loginRequest);
  msalInstance.setActiveAccount(result.account);
  return result.account;
}

export async function signOut() {
  const account = getActiveAccount();
  await msalInstance.logoutPopup({ account });
}

export async function getAccessToken(scopes = loginRequest.scopes) {
  const account = getActiveAccount();
  if (!account) throw new Error("Not signed in");
  try {
    const s = await msalInstance.acquireTokenSilent({ ...loginRequest, scopes, account });
    return s.accessToken;
  } catch {
    const p = await msalInstance.acquireTokenPopup({ ...loginRequest, scopes });
    return p.accessToken;
  }
}
