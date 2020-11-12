# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client


# Your Account Sid and Auth Token from twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ['account_sid']
auth_token = os.environ['auth_token']
TWILIO_PHONE_NUMBER = os.environ['TWILIO_PHONE_NUMBER']
client = Client(account_sid, auth_token)

message = client.messages \
                .create(
                     body="Checking!",
                     from_= os.environ['TWILIO_PHONE_NUMBER'],
                     to='+3363066848',
                 )

print(message.sid)
