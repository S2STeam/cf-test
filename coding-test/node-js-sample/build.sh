#!/bin/bash
#configure node and npm

rm -rf /root/.npm/*.lock.STALE
echo -------------
echo Node version:
node -v
echo -------------
echo ''
echo ------------
echo npm version:
npm -v
echo ------------
echo ''

# Install all dependencies
npm install
npm install gulp
gulp 
cd dist
if [ "$?" = "0" ]; then
  echo "The /dist folder was created successfully. Build finished."
else
  echo "The /dist folder could not be created. Build failed."
  exit 1
fi

#Todo: Will create a zip file for artifactory upload and will add Jenkins build number into the zip
rm -f ../codingtest.zip
zip -r ../codingtest.zip *


# Create an cloud formation stack
aws cloudformation create-stack --stack-name node-test1 --template-body file://./aws-cf-template/ec2-instance.json --parameters ParameterKey=test-pair

