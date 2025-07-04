This repository shows a hybrid implementation of the CDN SDK.


1. It starts by initializing in the server the CDN SDK with the `rules.js`
2. It decides based on the built alloyEvent and the rules which experiences it will deliver 
3. It processes the `sdkResponse` to retrieve the experience that will decide if it will deliver `homepageA` or `homepageB`
4. It sets the cluster cookie that will indicate the region to send the report data
5. The ECID is inside the sdkResponse (a new one or the one from the browser)
6. Inserts inside the homepage html the `sdkResponse` that will be used by alloy to render client side
7. The response is returned to the browser
8. In the browser the alloy will render `applyResponseParam` (see text `Changed by Alloy`)
9. The ECID will be persisted in the cookies
10. After the render a client side request for the decisionScope is made `cdn-sdk-mbox-test` 
11. The response is processed client side (see the JSON strigified after the text `Changed by Alloy`)

12. Notice that the ECID is the same across all the events
13. Notice that we went through a server side deicion, to a render in the browser activity and a client side request and render for activities all using the same ECID.
