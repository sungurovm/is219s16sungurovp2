// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/
var mCurrentIndex = 0;
animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		console.log(mCurrentIndex);
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	
	console.log('swap photo');
	$("#photo").attr("src", mImages[mCurrentIndex].imgPath); //get image
	$(".location").text("location:" + mImages[mCurrentIndex].imgLocation);
	$(".description").text("description:" + mImages[mCurrentIndex].Description);
	$(".date").text("date:" + mImages[mCurrentIndex].Date);
	$(".details").show();
	if(mCurrentIndex < mImages.length-1) {
	   mCurrentIndex++;
    } else if (mCurrentIndex < 0) {
        mCurrentIndex = mImages.length - 1;

    }
    console.log(mCurrentIndex);
}
function reverseSwapPhoto() {
	if(mCurrentIndex==0)
		mCurrentIndex=mImages.length-1;
		else
			mCurrentIndex--;
		$('photo').attr("src",mImages[mCurrentIndex].imgPath);
}


// Counter for the mImages array

// XMLHttpRequest variable
var mURL = "images.json";
var mRequest = new XMLHttpRequest();
mRequest.onreadystatechange = function() {
// Do something interesting if file is opened successfully
if (mRequest.readyState == 4 && mRequest.status == 200) {
try {
// Let’s try and see if we can parse JSON (see next slide)
mJson = JSON.parse(mRequest.responseText);
console.log(mRequest.responseText);
// LOOP THROUGH the mJSON array here and fill up the
var i;
for ( i=0; mJson.images.length; i++){
	mImages.push(new GalleryImage(mJson.images[i].imgPath, mJson.images[i].imgLocation, mJson.images[i].description, mJson.images[i].date));
	console.log(mImages);
}

// mImages array with GalleryImage objects
// Let’s print out the JSON; It will likely show as “obj”
console.log(mJson);
} catch(err) {
console.log(err.message)
}
}
};
mRequest.open("GET",mURL, true);
mRequest.send();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;



//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}


$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage(imgPath,imgLocation,description,date) {
	this.imgPath = imgPath;
	this.imgLocation = imgLocation;
	this.Description = description;
	this.Date = date;
	console.log('data stored');
};
function reqListener()
{
console.log(JSON.parse(this.responseText));
var mJson = JSON.parse(this.responseText);
for (var i = 0; i < mJson.images.length; i++) {
	var current = mJson.images[i];
	var imageDetails = new galleryImage(current.imgPath, current.imgLocation, current.description, current.date)
	mImages.push(imageDetails);
}
}
mRequest.addEventlistener("load", reqListener);
mRequest.open("GET", mURL);
mRequest.send();





	
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	//2. description of photo
	//3. the date when the photo was taken
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)

