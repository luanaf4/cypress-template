import { sleep, group } from "k6";
import http from "k6/http";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  cloud: {
    distribution: {
      "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
    },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: "ramping-vus",
      gracefulStop: "30s",
      stages: [
        { target: 500, duration: "10s" },
        { target: 800, duration: "10s" },
        { target: 1200, duration: "10s" },
        { target: 0, duration: "10s" },
      ],
      gracefulRampDown: "30s",
      exec: "scenario_1",
    },
  },
};

export function scenario_1() {
  let response;

  group("New York Search", function () {
    // Search New
    response = http.get(
      "https://api.radar.io/v1/search/autocomplete/?query=new&country=US&layers=address,postalCode,locality&limit=4",
      {
        headers: {
          Authorization: "prj_test_pk_1b756b8a50865a11608376b5ce628903176fd378",
        },
      }
    );
    sleep(1);
    // Search New York
    response = http.get(
      "https://api.radar.io/v1/search/autocomplete/?query=new&country=US&layers=address,postalCode,locality&limit=4",
      {
        headers: {
          Authorization: "prj_test_pk_1e7234e526dfff310a82a76de8fc81712ab3cf75",
        },
      }
    );
    sleep(1);
  });
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
