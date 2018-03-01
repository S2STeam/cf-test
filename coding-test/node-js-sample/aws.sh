#!/bin/bash
awsprofile="test"
aws ec2 describe-instances --profile ${awsprofile} --filters 'Name=tag:Name,Values=cf-test1' > ec2-details.json
if [ "$?" = "0" ]; then
   instance-id= cat ec2-detail.json | jq '.Reservations[0].Instances[0].InstanceId'
    echo "Delete ec2 instance"
    aws ec2 delete-instance --instance-id ${instance-id}
fi

#echo create ec2 instance
aws cloudformation create-stack --stack-name node-test1 --template-body file://./aws-cf-template/ec2-instance.json --parameters ParameterKey=test-pair --profile ${awsprofile}

#echo get ip address of the ec-instane
aws ec2 describe-instances --profile ${awsprofile} --filters 'Name=tag:Name,Values=cf-test1' > ec2-intance.json   
ipadd=`cat ec2-details.json | jq '.Reservations[0].Instances[0].PublicIpAddress'`
knife bootstrap ${ipaddress} -x ubuntu -i ../key/develop-pair.pem -N code-deploy --sudo
# better option is to use knife ec2 
scp -i codingtest.zip ubuntu@${ipaddress}:/tmp
