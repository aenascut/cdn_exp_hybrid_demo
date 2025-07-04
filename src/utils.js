/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const ECID_COOKIE_NAME = "ECID";
const AEP_COOKIE_PREFIX = "kndctr";

const parseCookies = (cookieString) => {
  if (!cookieString) return {};
  return cookieString.split(";").reduce((cookies, cookie) => {
    const [name, value] = cookie.trim().split("=");
    cookies[name] = decodeURIComponent(value);
    return cookies;
  }, {});
};

const getAEPCookies = (cookies) => {
  const entries = [];

  Object.keys(cookies)
    .filter((key) => key.startsWith(AEP_COOKIE_PREFIX))
    .forEach((key) => {
      entries.push({
        key,
        value: cookies[key],
      });
    });

  return entries;
};

const createClientRequest = (req, config) => {
  const cookies = parseCookies(req.headers.cookie);
  const aepCookies = getAEPCookies(cookies);
  const ecid = cookies[ECID_COOKIE_NAME] || "";

  const identityMap = ecid
    ? {
        ECID: [
          {
            id: ecid,
            authenticatedState: "ambiguous",
            primary: true,
          },
        ],
      }
    : undefined;

  return {
    type: "decisioning.propositionFetch",
    decisionScopes: [
      "cdn_exp_location_offer", "__view__"
    ],
    personalization: {
      sendDisplayEvent: true,
    },
    xdm: {
      web: {
        webPageDetails: {
          URL: `${req.protocol}://${req.headers.host}${req.url}`,
        },
        webReferrer: { URL: "" },
      },
      identityMap: {
        ...identityMap,
      },
      implementationDetails: {
        name: "server-side",
      },
    },
    data: {
    },
    meta: {
      state: {
        domain: req.headers.host,
        cookiesEnabled: true,
        entries: aepCookies,
      },
    },
  };
};

const getPersistedValues = (response) => {
  const ecidHandle = response?.handle?.find(
    (payload) =>
      payload.type === "identity:result" &&
      payload.payload[0].namespace.code === "ECID",
  );
  const ecid = ecidHandle?.payload[0]?.id || "";

  const locationHintIdHandle = response?.handle?.find(
    (payload) =>
      payload.type === "locationHint:result" &&
      payload?.payload[0]?.scope === "EdgeNetwork",
  );
  const locationHintId = locationHintIdHandle?.payload[0]?.hint || "";

  return { ecid, locationHintId };
};

/**
 * Extracts content property and payload item from Adobe Experience Platform response
 * based on activity name
 * @param {Object} sdkResponse - The response from Adobe Experience Platform
 * @param {string} activityName - The name of the activity to search for
 * @returns {Object|null} - Object containing content and payload item, or null if not found
 */
function getContentByActivityName(sdkResponse, activityName) {
  if (!sdkResponse || !sdkResponse.handle || !Array.isArray(sdkResponse.handle)) {
    return null;
  }

  // Find the personalization:decisions handle
  const decisionsHandle = sdkResponse.handle.find(handle => handle.type === 'personalization:decisions');
  
  if (!decisionsHandle || !decisionsHandle.payload || !Array.isArray(decisionsHandle.payload)) {
    return null;
  }

  // Search through all payload items
  for (const payloadItem of decisionsHandle.payload) {
    if (payloadItem.items && Array.isArray(payloadItem.items)) {
      for (const item of payloadItem.items) {
        // Check if the activity name matches
        if (item.meta && item.meta['activity.name'] === activityName) {
          return {
            content: item.data?.content || null,
            payloadItem: item
          };
        }
      }
    }
  }

  return null;
}

/**
 * Alternative function that searches by scope instead of activity name
 * @param {Object} sdkResponse - The response from Adobe Experience Platform
 * @param {string} scope - The scope to search for (e.g., 'cdn_exp_location_offer')
 * @returns {Object|null} - Object containing content and payload item, or null if not found
 */
function getContentByScope(sdkResponse, scope) {
  if (!sdkResponse || !sdkResponse.handle || !Array.isArray(sdkResponse.handle)) {
    return null;
  }

  // Find the personalization:decisions handle
  const decisionsHandle = sdkResponse.handle.find(handle => handle.type === 'personalization:decisions');
  
  if (!decisionsHandle || !decisionsHandle.payload || !Array.isArray(decisionsHandle.payload)) {
    return null;
  }

  // Search through all payload items
  for (const payloadItem of decisionsHandle.payload) {
    if (payloadItem.scope === scope && payloadItem.items && Array.isArray(payloadItem.items)) {
      // Return the first item in the scope
      const item = payloadItem.items[0];
      return {
        content: item.data?.content || null,
        payloadItem: item
      };
    }
  }

  return null;
}

export { createClientRequest, getPersistedValues, getContentByActivityName, getContentByScope, ECID_COOKIE_NAME };
