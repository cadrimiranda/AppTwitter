from wordcloud import WordCloud, STOPWORDS
import pandas as pd
from PIL import Image
import matplotlib.pyplot as plt
import warnings
import re, string, unicodedata
import nltk
import contractions
import inflect
from nltk import word_tokenize, sent_tokenize
from nltk.stem import LancasterStemmer, WordNetLemmatizer
import os
import numpy as np


class WC:
    def __init__(self, series):
        self.series = series

    def transform_format(self, val):
        if val == 0:
            return 255
        else:
            return val
    def denoise_text(self, linha):
        linha = linha.rstrip()
        linha = re.sub(r'http\S+', '', linha)
        translator = str.maketrans({key: None for key in string.punctuation})
        linha = linha.translate(translator)
        return linha

    def replace_contractions(self,text):
        return contractions.fix(text)

    def remove_non_ascii(self, words):
        new_words = []
        for word in words:
            new_word = unicodedata.normalize('NFKD', word).encode('ascii', 'ignore').decode('utf-8', 'ignore')
            new_words.append(new_word)
        return new_words

    def to_lowercase(self, words):
        new_words = []
        for word in words:
            new_word = word.lower()
            new_words.append(new_word)
        return new_words

    def remove_punctuation(self, words):
        new_words = []
        for word in words:
            new_word = re.sub(r'[^\w\s]', '', word)
            if new_word != '':
                new_words.append(new_word)
        return new_words

    def replace_numbers(self, words):
        p = inflect.engine()
        new_words = []
        for word in words:
            if word.isdigit():
                new_word = p.number_to_words(word)
                new_words.append(new_word)
            else:
                new_words.append(word)
        return new_words
    def remove_stopwords(self, words):
        new_words = []
        stopwords_pt = nltk.corpus.stopwords.words('portuguese')
        stopwords_pt.append('rt')
        #stopwords_pt.append('bolsonaro')
        for word in words:
            if word not in stopwords_pt:
                new_words.append(word)
        return new_words

    def stem_words(self, words):
        stemmer = LancasterStemmer()
        stems = []
        for word in words:
            stem = stemmer.stem(word)
            stems.append(stem)
        return stems

    def lemmatize_verbs(self, words):
        lemmatizer = WordNetLemmatizer()
        lemmas = []
        for word in words:
            lemma = lemmatizer.lemmatize(word, pos='v')
            lemmas.append(lemma)
        return lemmas

    def normalize(self, words):
        words = self.remove_non_ascii(words)
        words = self.to_lowercase(words)
        words = self.remove_punctuation(words)
        words = self.replace_numbers(words)
        words = self.remove_stopwords(words)
        return words

    def get_tweet_text(self, linha):
        tweet_lower = ''
        linha = re.sub(r'http\S+', '', linha)
        tweet = linha.rstrip()
        #print(tweet)
        translator = str.maketrans({key: None for key in string.punctuation})
        tweet = tweet.translate(translator)
        tweet_lower += tweet.lower()
        #print(tweet_lower)
        return(tweet_lower)

    def processWC(self):
        #tweets = pd.read_csv('tweetsQueiroz2000.csv',index_col=None)
        tweets = self.series.to_frame()
        #print(type(tweets))
        bag_words = []
        for i in tweets.index:
            #print(tweets.loc[i,'tweets'])
            #print(i)
            sample = self.denoise_text(tweets.loc[i,'tweets'])
            sample = self.replace_contractions(sample)
            words = nltk.word_tokenize(sample)
            bag_words = self.normalize(words) + bag_words

        cloud = np.load('mask.npy')
        #print(len(bag_words))
        #
        wordcloud = WordCloud(background_color = 'white',mask = cloud, max_words=500).generate((" ").join(bag_words))
        return wordcloud
        