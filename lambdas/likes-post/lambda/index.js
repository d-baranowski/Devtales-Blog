var AWS = require('aws-sdk');

var s3 = new AWS.S3();

var getItem = (srcBucket, srcKey) => {
    return new Promise((resolve, reject) => {
        s3.getObject({
            Bucket: srcBucket,
            Key: srcKey
        }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Body.toString('utf-8'));
            }
        })
    })
};

exports.handler = async (event) => {
    const { request } = event.Records[0].cf;

    let response;
    try {
        response = await getItem("devtales.bucket.net", `api/likes/${request.uri}.json`)
    } catch (error) {
        return error;
    }


    return JSON.stringify(response);
};
