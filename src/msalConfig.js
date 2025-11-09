export const msalConfig = {
    auth: {
      clientId: "1fd811b9-f38a-434e-8779-d63f35e75cd7", // Paste your App (client) ID here
      authority: "https://login.microsoftonline.com/common",
      redirectUri: window.location.origin, // this should be http://localhost:5173/
    },
    cache: {
      cacheLocation: "localStorage", // keeps you signed in
      storeAuthStateInCookie: false, // leave this false unless Safari breaks it
    },
  };
  
  export const loginRequest = {
    scopes: ["User.Read", "Calendars.Read"],
  };
  