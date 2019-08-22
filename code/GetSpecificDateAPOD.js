// mrvivacious.u_apod
// Unoffical Astronomy Picture of the Day
// GetAPOD.js
//
// This file grabs an APOD via http
//
// @author Vivek Bhookya

// TODO:: 
// CURRENT:: o Enable user to specify a particular date (via Bixby)
// o Enable user to specify a particular date (via Bixby)
// o Get the APOD of a specified date (query parameters in HTTP request?)
// o Enable the user to click the image to open a URL to the official APOD page
// + or, corresponding Wikipedia page?
//
// DONE::
// √ Get today's APOD
// √ Check for copyright and take the appropriate actions


let http = require('http');
let console = require('console');
let secret = require('secret');

// Thank you,
// https://api.nasa.gov/api.html#apod
let API_URL = secret.get('API.URL');

// To construct the paramters, it looks like
//  key1=<VALUE1>&key2=<VALUE2>
// Thank you,
// https://stackoverflow.com/questions/14551194/how-are-parameters-sent-in-an-http-post-request

// Main entry point
function fetchSpecificImageData() {
  // fetch request to the url
  // collect the image url info (if not copyright)
  // return that image url
  
  // Thank you, 
  // https://stackoverflow.com/questions/55469230/set-header-in-http-geturl  
  // https://www.w3schools.com/js/js_json_parse.asp
  let responseJSON = JSON.parse(
    http.getUrl(API_URL, null)
  );

  // Please disregard code style smh
  let date            = responseJSON['date'];
  let explanation     = responseJSON['explanation'];
  let hdurl           = responseJSON['hdurl'];
  let media_type      = responseJSON['media_type'];
  let service_version = responseJSON['service_version'];
  let title           = responseJSON['title'];
  let url             = responseJSON['url'];
  
  // If copyright === true, do not display image and instead display 
  //  copyright message
  // Additionally, prompt the user to visit the webpage
  let copyright       = responseJSON['copyright'];
  
  // TODO Clicking on the image should just open the site u feel me
  if (copyright) {
    // Show a placeholder image
    hdurl = 'https://www.jpl.nasa.gov/spaceimages/images/largesize/PIA12567_hires.jpg';
    
    // Prompt the user to visit the webpage
    title = 'Please visit apod.nasa.gov to view today\'s (copyrighted) content'
  }
  
  // TODO Add video media type handling
  // For now, prompt the user to visit the website to view the video
  // TODO Bixby has a native video player? YouTube URLs most likely...
  if (media_type === 'video') {
    // Show a placeholder image
    hdurl = 'https://www.jpl.nasa.gov/spaceimages/images/largesize/PIA12567_hires.jpg';
    
    // Prompt the user to visit the webpage
    title = 'Please visit apod.nasa.gov to view today\'s video!'
  }
  
  // ImageResult
  return {
    ImageDate: date,
    ImageExplanation: 'fuck you lol debug',
    ImageHDUrl: hdurl,
    ImageMedia_Type: media_type,
    ImageService_Version: service_version,
    ImageTitle: 'fuck you lol debug',
    ImageUrl: url
  }
}

module.exports = {
  function: fetchSpecificImageData
}