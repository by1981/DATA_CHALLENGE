import time
from splinter import Browser
from bs4 import BeautifulSoup
from selenium import webdriver
import requests
import pandas as pd


def init_browser():
    #: Replace the path with your actual path to the chromedriver
    executable_path = {"executable_path": "/usr/local/bin/chromedriver"}
    return Browser("chrome", **executable_path, headless=False)


def scrape():
    browser = init_browser()
    d={}
    img_url ='https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(img_url)
    time.sleep(1)
    browser.click_link_by_partial_text('FULL IMAGE')
    time.sleep(1)
    more_info = browser.find_link_by_partial_text('more info')
    more_info.click()
    image_page = browser.html
    soup = BeautifulSoup(image_page, 'lxml')
    image_link = soup.find('figure', class_='lede').find('img')['src']
    image_link
    featured_image_url = ("https://www.jpl.nasa.gov/" + image_link)
    featured_image_url

    url2='https://twitter.com/marswxreport?lang=en'
    response2 = requests.get(url2)
    soup2 = BeautifulSoup(response2.text, 'lxml')
    soup2.prettify()
    content2=soup2.find('p', class_="TweetTextSize TweetTextSize--normal js-tweet-text tweet-text")
    weather=content2.text
    time.sleep(2)

    url3 = 'https://space-facts.com/mars/'
    tables = pd.read_html(url3)
    df = tables[0]
    df.columns = ['Parameter', 'Value']
    df.set_index('Parameter', inplace=True)
    df.head()

    html_table = df.to_html()
    html_table

    html_table.replace('\n', '')
    df.to_html('table.html')

    url4='https://astrogeology.usgs.gov/search/map/Mars/Viking/cerberus_enhanced'
    response4 = requests.get(url4)
    response4
    soup4 = BeautifulSoup(response4.text, 'lxml')
    cer_img=soup4.find('img', class_="wide-image")['src']
    cerberus_url="https://astrogeology.usgs.gov/"+cer_img
    cerberus_url
    sci_title=soup4.find('h2', class_="title")
    cerberus_title=sci_title.text
    cerberus_title

    url5='https://astrogeology.usgs.gov/search/map/Mars/Viking/schiaparelli_enhanced'
    response5 = requests.get(url5)
    response5
    soup5 = BeautifulSoup(response5.text, 'lxml')
    schi_img=soup5.find('img', class_="wide-image")['src']
    schiaparelli_url="https://astrogeology.usgs.gov/"+schi_img
    schiaparelli_url
    sci_title=soup5.find('h2', class_="title")
    schiaparelli_title=sci_title.text
    schiaparelli_title


    url6='https://astrogeology.usgs.gov/search/map/Mars/Viking/syrtis_major_enhanced'
    response6 = requests.get(url6)
    response6
    soup6 = BeautifulSoup(response6.text, 'lxml')
    syrtis_img=soup6.find('img', class_="wide-image")['src']
    syrtis_url="https://astrogeology.usgs.gov/"+syrtis_img
    syrtis_url
    syrtis_title=soup6.find('h2', class_="title")
    syrtis_title=syrtis_title.text
    syrtis_title

    url7='https://astrogeology.usgs.gov/search/map/Mars/Viking/valles_marineris_enhanced'
    response7 = requests.get(url7)
    response7
    soup7 = BeautifulSoup(response7.text, 'lxml')
    valles_img=soup7.find('img', class_="wide-image")['src']
    valles_url="https://astrogeology.usgs.gov/"+valles_img
    valles_url
    valles_title=soup7.find('h2', class_="title")
    valles_title=valles_title.text
    valles_title

    hemisphere_image_urls = [
        {"title": valles_title, "img_url": valles_url},
        {"title": cerberus_title, "img_url": cerberus_url},
        {"title": schiaparelli_title, "img_url": schiaparelli_url},
        {"title": syrtis_title, "img_url": syrtis_url},
    ]

    d['weather']=weather
    d['featured']=featured_image_url
    d['src']=hemisphere_image_urls[0]["img_url"]
    d['hemisphere']=hemisphere_image_urls
    d['facts']=html_table
    print(d['featured'])
    browser.quit()
    return (d)


