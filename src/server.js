import { createServer } from "http";
import { Client } from "@adobe/target-cdn-experimentation-nodejs-sdk";
import { rules } from "./rules.js";
import { createClientRequest, getPersistedValues, getContentByActivityName } from "./utils.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  orgId: "906E3A095DC834230A495FD6@AdobeOrg",
  datastreamId: "6f670d48-16d1-4cef-bd2f-b9efde171c17",
  oddEnabled: true,
  rules: rules
};

const client = await Client(config);

// Read HTML files
const homepageA = readFileSync(join(__dirname, "..", "homepageA.html"), "utf8");
const homepageB = readFileSync(join(__dirname, "..", "homepageB.html"), "utf8");

const handleGET = async (req, res) => {
  try {
    // create an event from the incoming request
    const alloyEvent = createClientRequest(req, config);

    console.log(JSON.stringify(alloyEvent, null, 2));

    // retrieve the response that holds the consequences
    const sdkResponse = await client.sendEvent(alloyEvent);
    console.log('sdkResponse', JSON.stringify(sdkResponse, null, 2));
    const result = getContentByActivityName(sdkResponse, "CDN Exp analytics form based test");
    const homepageVersion = result.content.experience;
    console.log('homepageVersion', homepageVersion);


    // retrieve the ECID and locationHintId; both values have to be persisted in the browser across requests
    // ECID - identifies each unique visitor with an unique id
    // locationHintId - the locationHintId is used to route the request to the closest Edge Node
    const { ecid, locationHintId } = getPersistedValues(sdkResponse);

    const clusterCookieName = `kndctr_${config.orgId.replace("@", "_")}_cluster`;
    res.setHeader("Set-Cookie", [
      `${clusterCookieName}=${locationHintId};`,
    ]);

    // Prepare template variables for Adobe Alloy.js
    const templateVariables = {
      edgeConfigId: config.datastreamId,
      orgId: config.orgId,
      applyResponseParam: JSON.stringify({
        renderDecisions: true,
        responseHeaders: {},
        responseBody: sdkResponse || {}
      }, null, 2)
    };

    // Return homepageA or homepageB based on homepagerVersion
    if (homepageVersion === 'b') {
      // Replace template variables in homepageB
      let html = homepageB
        .replace(/\${templateVariables\.applyResponseParam}/g, templateVariables.applyResponseParam);
      
      res.setHeader("Content-Type", "text/html");
      res.end(html);
    } else {
      // Replace template variables in homepageA
      let html = homepageA
        .replace(/\${templateVariables\.applyResponseParam}/g, templateVariables.applyResponseParam);
      
      res.setHeader("Content-Type", "text/html");
      res.end(html);
    }
  } catch (error) {
    console.log("error ", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(error.message);
  }
};

const server = createServer((req, res) => {
  switch (req.method) {
    case "GET":
      handleGET(req, res);
      break;
    default:
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("Method Not Allowed");
  }
});
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});
