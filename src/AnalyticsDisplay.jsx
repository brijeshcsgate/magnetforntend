// Install necessary packages
// npm install @google-analytics/data react-query

import { useState, useEffect } from 'react';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { useQuery } from 'react-query';

// Initialize the GA4 client
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: 'magnet2o@magnet2o.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChMlu/QL0/FeMk\npD3U74iGH0HPGZV7cQCuOhFwsG/YcYO2RvRnybBIol6H08W4LweMoOEUBsY3bov/\nd6x1eabGxplW9GLCuK+ihcdW5lBMuJFhP/108PKq4j90hj2p+qrMqm3yaaY1Ec16\ntYi3T9ApzH2bu1xhzWad5lCN6dG8rED3PGrbztMF5xRcsZSgjz3YKtXBx5h0MINR\nI6ahP0yCb/2L6G+7mnrvTNo8pR+NNveTVHcKxXx661RMmC9xsEr7jhRQHLiXXG0N\nHF0arGg+s00kA014+ljs64M7dgI3tCoMjNyth05ZbgVFmNFR9YW1tcb56srgbrao\numsraEXLAgMBAAECggEAEz5/1YVVEoL6axVwjEtMcTaqFJ9pSSNkgWhNTLbDo4Np\nxgkShJF/iixYPL77i9GRhShvtoRYhaWc8RLIc/3h+zkadVcXs0d5MF3oPmegjog6\nUvHgwGVDk0MPcEnWcsSKP4TZO2eBgDRv44Zom/nbUCIpnL3xeXucFJ26YDbZ4zw8\njAzxLkDkQsHtOj2VUYGugHCfsIJJeb7RzYM8SGr4Z+iMHqr1MlSm6wosnUz+dAGc\neiJtoejB56Cp391YSKXv31kcyDLAracESgfRUoTSP6XKgAfbhZD1paRFtEZrgASc\nPW1D6AsAQ7ictoa/mK7BXUk21L5xgMZTGVtifJxAgQKBgQDfaflqBMKl551TVDPA\nRIg7phKEtySGbCGXIZdsMJ2e6B3xjB1td5RhLoETurWNrRAbWRYSXs6siZ43spbY\npEvDitag1Lvj8135gBFJTsyO9t13LWmzUfOCfi9iF6j6YEsHzZy5anhegg9pZWeE\nEB+Ps5HIOc0VesGgJvd8h4hF1wKBgQC4tUMYCDC9fV2l74hQdn9q1Gn7JcuT/l0S\nhcNmjsIb+IW+SFSRRlG1P3OS9VGbRCQ6E4oMlDJeU6NxZOTNcdXagbLdto0KBq/c\nOFxf5EdZZWmowBO6K9p+ygafByJfDuZgek7Zy7ttAPXkJjsMXBDKKZTwrqral618\nFGVbyy4ZLQKBgQCv7Gz/9NupdGbINSfDILP99Fnks6pJR2Bz93mbMfUMKk9Z4zFQ\n/7aRh+MQPBe2hi6GunHM6WbpKjyyMyjhUw5t3if/4URKzVqUmyoBhdFCSlY+AD6Z\ne9C6Us7Q+TyQW775WAkvYA2Erfmgzr7imSehKo+DETDS1yUdDVIYd0jxZQKBgHnZ\nijN2Y8D9zSPEiyaZpaDyFCBMZKpy6S9o8ujbUI5nOsO2r6NOwmRRQYs3LujA4S02\n6qE1uqyjfHU33AD0EeIeIcNFxHFSy/z5aWcRD0iYMEXUwK7Wc0OlPwz2BeSzzaLj\nzNS9JB3avlwOJHIY4jKbj9ffQnMGELqEMgGGXhjZAoGADIVJ7CGaprqJzgYyXiLU\n0v/Mpo/BzXnUHifhIEjpbvDAZeH5oWbtvUG+E8YysTmKlxDt7zHzueSATo/0R2y2\n+PkLrRaYRXpw/kct35C+NDwKls58PriEayksXNBD0zpuAETppyltLebOgOsY31dP\nKhW3fjQjmeJWiis7PM5rXVo=\n-----END PRIVATE KEY-----\n',
  },
});

// Function to fetch data from GA4
async function fetchAnalyticsData() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/461370601`,
    dateRanges: [
      {
        startDate: '7daysAgo',
        endDate: 'today',
      },
    ],
    metrics: [
      {
        name: 'screenPageViews',
      },
    ],
    dimensions: [
      {
        name: 'date',
      },
    ],
  });
console.log('response',response)
  return response.rows.map(row => ({
    date: row.dimensionValues[0].value,
    pageViews: parseInt(row.metricValues[0].value),
  }));
}

// React component to display analytics data
function AnalyticsDisplay() {
  const { data, isLoading, error } = useQuery('analyticsData', fetchAnalyticsData);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Page Views for the Last 7 Days</h2>
      <ul>
        {data.map(item => (
          <li key={item.date}>
            {item.date}: {item.pageViews} views
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnalyticsDisplay;
