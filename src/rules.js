export const rules = {
  version: "1",
  provider: "TGT",
  metadata: {
    provider: "TGT",
    providerData: {
      identityTemplate:
        "aemonacpprodcampaign.\u003Ckey\u003E.\u003Cidentity\u003E.0",
      buckets: 10000,
    },
  },
  rules: [
    {
      "key": "2494798",
      "condition": {
        "type": "group",
        "definition": {
          "logic": "and",
          "conditions": [
            {
              "type": "matcher",
              "definition": {
                "key": "allocation",
                "matcher": "ge",
                "values": [0]
              }
            },
            {
              "type": "matcher",
              "definition": {
                "key": "allocation",
                "matcher": "le",
                "values": [50]
              }
            }
          ]
        }
      },
      "consequences": [
        {
          "id": "consequence-1",
          "type": "proposition",
          "detail": {
            "id": "AT:eyJhY3Rpdml0eUlkIjoiMjQ5NDc5OCIsImV4cGVyaWVuY2VJZCI6IjAifQ==",
            "scope": "cdn_exp_location_offer",
            "scopeDetails": {
              "decisionProvider": "TGT",
              "activity": {
                "id": "2494798"
              },
              "experience": {
                "id": "0"
              },
              "strategies": [
                {
                  "step": "entry",
                  "trafficType": "0"
                },
                {
                  "step": "display",
                  "trafficType": "0"
                },
                {
                  "step": "conversion",
                  "trafficType": "0"
                }
              ],
              "characteristics": {
                "eventToken": "PRMDi6fq0WigER4N7xicF6OGVi4KWyOJymGoDplZOhURgQBb+TOXNzkdfJKkycp+UPOSvduUPtusIczTp7IuSQ=="
              },
              "correlationID": "2494798:0:0"
            },
            "items": [
              {
                "id": "0",
                "schema": "https://ns.adobe.com/personalization/json-content-item",
                "meta": {
                  "activity.name": "CDN Exp analytics form based test",
                  "experience.name": "Experience A"
                },
                "data": {
                  "id": "0",
                  "format": "application/json",
                  "content": {
                    "experience": "a",
                    "something": "payload"
                  }
                }
              }
            ]
          }
        }
      ]
    },
    {
      "key": "2494798",
      "condition": {
        "type": "group",
        "definition": {
          "logic": "and",
          "conditions": [
            {
              "type": "matcher",
              "definition": {
                "key": "allocation",
                "matcher": "gt",
                "values": [50]
              }
            },
            {
              "type": "matcher",
              "definition": {
                "key": "allocation",
                "matcher": "le",
                "values": [100]
              }
            }
          ]
        }
      },
      "consequences": [
        {
          "id": "consequence-1",
          "type": "proposition",
          "detail": {
            "id": "AT:eyJhY3Rpdml0eUlkIjoiMjQ5NDc5OCIsImV4cGVyaWVuY2VJZCI6IjEifQ==",
            "scope": "cdn_exp_location_offer",
            "scopeDetails": {
              "decisionProvider": "TGT",
              "activity": {
                "id": "2494798"
              },
              "experience": {
                "id": "1"
              },
              "strategies": [
                {
                  "step": "entry",
                  "trafficType": "0"
                },
                {
                  "step": "display",
                  "trafficType": "0"
                },
                {
                  "step": "conversion",
                  "trafficType": "0"
                }
              ],
              "characteristics": {
                "eventToken": "PRMDi6fq0WigER4N7xicF7AQPmC1DaFtLRdaertZEp0RgQBb+TOXNzkdfJKkycp+UPOSvduUPtusIczTp7IuSQ=="
              },
              "correlationID": "2494798:1:0"
            },
            "items": [
              {
                "id": "0",
                "schema": "https://ns.adobe.com/personalization/json-content-item",
                "meta": {
                  "activity.name": "CDN Exp analytics form based test",
                  "experience.name": "Experience B"
                },
                "data": {
                  "id": "0",
                  "format": "application/json",
                  "content": {
                    "experience": "b",
                    "something": "payload"
                  }
                }
              }
            ]
          }
        }
      ]
    },
    {
      "key": "249479",
      "condition": {
        "type": "group",
        "definition": {
          "logic": "and",
          "conditions": [
            {
              "type": "matcher",
              "definition": {
                "key": "allocation",
                "matcher": "ge",
                "values": [0]
              }
            },
            {
              "type": "matcher",
              "definition": {
                "key": "allocation",
                "matcher": "le",
                "values": [50]
              }
            }
          ]
        }
      },
      "consequences": [
        {
          "id": "consequence-1",
          "type": "proposition",
          "detail": {
            "id": "AT:eyJhY3Rpdml0eUlkIjoiMjQ5NDc5OCIsImV4cGVyaWVuY2VJZCI6IjAifQ==",
            "scope": "__view__",
            "scopeDetails": {
              "decisionProvider": "TGT",
              "activity": {
                "id": "249479"
              },
              "experience": {
                "id": "0"
              },
              "strategies": [
                {
                  "step": "entry",
                  "trafficType": "0"
                },
                {
                  "step": "display",
                  "trafficType": "0"
                },
                {
                  "step": "conversion",
                  "trafficType": "0"
                }
              ],
              "characteristics": {
                "eventToken": "PRMDi6fq0WigER4N7xicF6OGVi4KWyOJymGoDplZOhURgQBb+TOXNzkdfJKkycp+UPOSvduUPtusIczTp7IuSQ=="
              },
              "correlationID": "249479:0:0"
            },
            "items": [
              {
                "id": "0",
                "schema": "https://ns.adobe.com/personalization/dom-action",
                "meta": {
                  "activity.name": "CDN Exp visual based test",
                  "experience.name": "Experience A"
                },
                "data": {
                "content": "Homepage A - Changed by Alloy",
                "selector": "#h2_id",
                  "prehidingSelector": "#h2_id",
                  "format": "application/vnd.adobe.target.dom-action",
                  "type": "setHtml"
                }
              }
            ]
          }
        }
      ]
    },
    {
      "key": "249479",
      "condition": {
        "type": "group",
        "definition": {
          "logic": "and",
          "conditions": [
            {
              "type": "matcher",
              "definition": {
                "key": "allocation",
                "matcher": "gt",
                "values": [50]
              }
            },
            {
              "type": "matcher",
              "definition": {
                "key": "allocation",
                "matcher": "le",
                "values": [100]
              }
            }
          ]
        }
      },
      "consequences": [
        {
          "id": "consequence-1",
          "type": "proposition",
          "detail": {
            "id": "AT:eyJhY3Rpdml0eUlkIjoiMjQ5NDc5OCIsImV4cGVyaWVuY2VJZCI6IjEifQ==",
            "scope": "__view__",
            "scopeDetails": {
              "decisionProvider": "TGT",
              "activity": {
                "id": "249479"
              },
              "experience": {
                "id": "1"
              },
              "strategies": [
                {
                  "step": "entry",
                  "trafficType": "0"
                },
                {
                  "step": "display",
                  "trafficType": "0"
                },
                {
                  "step": "conversion",
                  "trafficType": "0"
                }
              ],
              "characteristics": {
                "eventToken": "PRMDi6fq0WigER4N7xicF7AQPmC1DaFtLRdaertZEp0RgQBb+TOXNzkdfJKkycp+UPOSvduUPtusIczTp7IuSQ=="
              },
              "correlationID": "249479:1:0"
            },
            "items": [
              {
                "id": "0",
                "schema": "https://ns.adobe.com/personalization/dom-action",
                "meta": {
                  "activity.name": "CDN Exp visual based test",
                  "experience.name": "Experience B"
                },
                "data": {
                  "content": "Homepage B - Changed by Alloy",
                  "selector": "#h2_id",
                    "prehidingSelector": "#h2_id",
                    "format": "application/vnd.adobe.target.dom-action",
                    "type": "setHtml"
                }
              }
            ]
          }
        }
      ]
    },
  ],
};
