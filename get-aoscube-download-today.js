const http = require("http");
// Imports the Google Cloud client library
const BigQuery = require('@google-cloud/bigquery');

function send(date, count){
    console.log(date, count);
    var options = {
        "method": "POST",
        "hostname": "xxw-helloworld.goiot.cc",
        "port": null,
        "path": "/aoscubedownload",
        "headers": {
          "content-type": "application/json"
        }
      };
    
      var req = http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function () {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
        });
      });
      
      req.write(JSON.stringify({ date: date, count: count }));
      req.end();
}

// Creates a client
const bigquery = new BigQuery({
    projectId: "test-aos-cube",
    keyFilename: './keyfile.json'
});

function queryByDaily() {

    const sqlQuery = `SELECT
        COUNT(*) as count
    FROM TABLE_DATE_RANGE(
        [the-psf:pypi.downloads],
        DATE_ADD(CURRENT_TIMESTAMP(), -1, "day"),
        DATE_ADD(CURRENT_TIMESTAMP(), -1, "day")
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
            console.log(rows[0].count);
            var nowDate = new Date();
            console.log(nowDate);
            send(nowDate.toJSON().split('T')[0], rows[0].count);
        })
        .catch(err => {
            console.error('ERROR:', err);
            return;
        });
}



queryByDaily();