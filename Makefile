deploy-site:
	sh -c "cd site && npm run build"
	aws s3 sync ./site/build s3://devtales.bucket.net --profile devtales --acl public-read
# IMPORTANT the change will not take place until you explicitly deploy the new version of the lambda (us-east-1) to cloud front via the AWS UI
deploy-reverse-proxy:
	-rm lambdas/reverse-proxy/index.zip
	sh -c "cd lambdas/reverse-proxy && node test.js && cd lambda && zip -r ../index.zip *"
	aws lambda update-function-code --function-name reverse_proxy --zip-file fileb://lambdas/reverse-proxy/index.zip --profile devtales
deploy-articles:
	node helpers/generateArticlesJson.js articles > articles/articles.json
	aws s3 sync ./articles s3://devtales.bucket.net/api --profile devtales --acl public-read
start:
	sh -c "cd api-mock && node mockApi.js &"
	sh -c "cd site && npm run start  &"