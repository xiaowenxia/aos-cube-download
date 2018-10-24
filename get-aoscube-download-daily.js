
/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START bigquery_simple_app_all]
function printResult(rows) {
    // [START bigquery_simple_app_print]
    console.log('Query Results:');
    rows.forEach(function (row) {
        let url = row['url'];
        let viewCount = row['view_count'];
        console.log(`url: ${url}, ${viewCount} views`);
    });
    // [END bigquery_simple_app_print]
}

// Imports the Google Cloud client library
const BigQuery = require('@google-cloud/bigquery');

// Creates a client
const bigquery = new BigQuery({
    projectId: "test-aos-cube",
    keyFilename: './keyfile.json'
});

const days = 1;

function queryByDaily(day) {

    if (day == days) {
        //console.log("day out");
        return;
    }

    const sqlQuery = `SELECT
        COUNT(*) as count
    FROM TABLE_DATE_RANGE(
        [the-psf:pypi.downloads],
        DATE_ADD(TIMESTAMP("2018-10-12"), ${day}, "day"),
        DATE_ADD(TIMESTAMP("2018-10-12"), ${day}, "day")
    )
    WHERE file.project = "aos-cube"
    `;



    // Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query
    const options = {
        query: sqlQuery,
        // timeoutMs: 10000, // Time out after 10 seconds.
        useLegacySql: true, // Use standard SQL syntax for queries.
    };

    // Runs the query
    bigquery
        .query(options)
        .then(results => {
            const rows = results[0];
            //console.log(rows[0])
            //console.log('Rows[2017-10-20]:');
            //rows.forEach(row => console.log(row));
            //const cnt = JSON.parse(rows[0]);
            //console.log(typeof cnt);
            console.log(rows[0].count);
            queryByDaily(day + 1);
        })
        .catch(err => {
            console.error('ERROR:', err);
            return;
        });
}

queryByDaily(0);