import sys
from wordcloud import wordcloud
from requests_oauthlib import OAuth1Session
from operator import add
import requests_oauthlib
import requests
import string
import ast
import pandas as pd
import pprint
import json
import matplotlib.pyplot as plt
from wordCloudJS import WC
import numpy as np

consumer_key = "3XOk0HEhhvwY2Wfo4AmQeXWke"
consumer_secret = "XUGOUzeoCe71pPaRdCiXtvxkubU7rMCnqFibwYpd9vBkiceplk"
access_token = "1246500415472099329-daiMhqG2R586WZ5a0lr73TSUBggxSL"
access_token_secret = "oW2VCPKcUEvzYqTOU4wMAicr9FzQtmqKqLlEWApdhxYRR"


class Twitter:
    def __init__(self):
        # print(sys.argv[1])
        self.search_term = sys.argv[1]

    def processar(self):
        filter_url = 'https://stream.twitter.com/1.1/statuses/filter.json?track='+self.search_term
        auth = requests_oauthlib.OAuth1(
            consumer_key, consumer_secret, access_token, access_token_secret)
        tweets = []
        response = requests.get(filter_url, auth=auth, stream=True)
        count = 0
        for line in response.iter_lines():
            try:
                if count > 2:
                    break
                post = json.loads(line.decode('utf-8'))
                # print(count)
                contents = post['text']
                count += 1
                tweets.append(str(contents))
                # location.append(post['user']['location'])
            except:
                result = False
        self.tweets_series = pd.Series(tweets, name='tweets')

    def callWC(self):
        wc = WC(self.tweets_series)
        img = wc.processWC()
        # print(type(img))
        image = img.to_image()
        # print(type(image))

        import base64
        from io import BytesIO

        buffered = BytesIO()
        image.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue())
        # img_str.replace("b'","data:image/png;base64,")
        # img_str.replace("'","")
        # img_str = img_str.encode()
        print(img_str)

        # plt.imshow(img, interpolation='bilinear')
        # plt.axis("off")
        # plt.savefig('queiroz1.png')

        # plt.show()


if __name__ == "__main__":
    tw = Twitter()
    tw.processar()
    tw.callWC()
