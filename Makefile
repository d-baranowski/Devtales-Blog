deploy-site:
	sh -c "cd site && npm run build"
	aws s3 sync ./site/build s3://devtales.bucket.net --profile devtales --acl public-read
deploy-reverse-proxy:
	rm lambdas/reverse-proxy/index.zip
	sh -c "cd lambdas/reverse-proxy && node test.js && cd lambda && zip -r ../index.zip *"
	aws lambda update-function-code --function-name reverse_proxy --zip-file fileb://lambdas/reverse-proxy/index.zip
deploy-articles:
	aws s3 sync ./articles s3://devtales.bucket.net/api --profile devtales --acl public-read
start:
	sh -c "cd api-mock && node mockApi.js &"
	sh -c "cd site && npm run start  &"