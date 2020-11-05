# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client


# Your Account Sid and Auth Token from twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ['account_sid']
auth_token = os.environ['auth_token']
client = Client(account_sid, auth_token)

message = client.messages \
                .create(
                     body="Checking!",
                     from_='+19108174226',
                     to='+3363066848',
                 )

print(message.sid)
