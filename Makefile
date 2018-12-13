deploy:
	npm run build
	aws s3 sync ./build s3://devtales.bucket.net --profile devtales --acl public-read
deploy-reverse-proxy:
	rm lambdas/reverse-proxy/index.zip
	sh -c "cd lambdas/reverse-proxy && node test.js && cd lambda && zip -r ../index.zip *"
	aws lambda update-function-code --function-name reverse_proxy --zip-file fileb://lambdas/reverse-proxy/index.zip