const videoEl = document.querySelector("video")
const btnInline = document.querySelector("#btn-inline")
  , btnPinP = document.querySelector("#btn-pinp")
  , btnFullscreen = document.querySelector("#btn-fullscreen")
  , btnEnterFullscreen = document.querySelector("#btn-enter-fullscreen")
  , btnToggle = document.querySelector("#btn-toggle")
  , btnTogglePinp = document.querySelector("#btn-toggle-pinp")
const preEvents = document.querySelector("#pre-events")

const mediaSrc = "/assets/mov_bbb.mp4"


window.onload = () => {
  videoEl.src = mediaSrc

  preEvents.textContent += `document.pictureInPictureEnabled=${document.pictureInPictureEnabled}`

  videoEl.onloadedmetadata = async () => {
    await videoEl.play()
  }

  btnToggle.onclick = async () => {
    if( videoEl.readyState > 0 )  {
      if( videoEl.paused ) {
        await videoEl.play()
      } else {
        videoEl.pause()
      }
    }
  }

  videoEl.onplay = () => {
    preEvents.textContent += "\nvideo played"
    btnToggle.textContent = "pause"
  }

  videoEl.onpause = () => {
    preEvents.textContent += "\nvideo pause"
    btnToggle.textContent = "play"
  }

  if (document.pictureInPictureEnabled) {
    btnTogglePinp.onclick = () => {
      if (document.pictureInPictureElement) {
          document.exitPictureInPicture();
      } else {
          videoEl.requestPictureInPicture();
      }
    }

    videoEl.onenterpictureinpicture = () => {
      preEvents.textContent += `\n[Standard] enterpictureinpicture`
    }
    videoEl.onleavepictureinpicture = () => {
      preEvents.textContent += `\n[Standard] leavepictureinpicture`
    }
  } else {
    btnTogglePinp.disabled = disabled
  }


  if( 
    videoEl.webkitSupportsPresentationMode && 
    typeof videoEl.webkitSetPresentationMode === "function"
  ) {
    btnInline.onclick = () => {
      videoEl.webkitSetPresentationMode("inline")
    }
    btnPinP.onclick = () => {
      videoEl.webkitSetPresentationMode("picture-in-picture")
    }
    btnFullscreen.onclick = () => {
      videoEl.webkitSetPresentationMode("fullscreen")
    }
    btnEnterFullscreen.onclick = () => {
      videoEl.webkitEnterFullscreen()
    }

    videoEl.onwebkitpresentationmodechanged = () => {
      preEvents.textContent += `\n[webkit] ${ videoEl.webkitPresentationMode }`
    }
  } else {
    btnInline.disabled = true
    btnPinP.disabled = true
    btnFullscreen.disabled = true
    btnEnterFullscreen.disabled = true
  }
}