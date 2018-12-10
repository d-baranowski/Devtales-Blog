deploy: 
	aws s3 sync ./build s3://devtales.bucket.net --profile devtales --acl public-read