const videoEl = document.querySelector("video")
const btnInline = document.querySelector("#btn-inline")
  , btnPinP = document.querySelector("#btn-pinp")
  , btnFullscreen = document.querySelector("#btn-fullscreen")
  , btnEnterFullscreen = document.querySelector("#btn-enter-fullscreen")
  , btnToggle = document.querySelector("#btn-toggle")
  , btnTogglePinp = document.querySelector("#btn-toggle-pinp")
const checkUseHls= document.querySelector("#use-hls")
const spanSrcUrl = document.querySelector("#src-url")
const preEvents = document.querySelector("#pre-events")

const mediaSrc = "/assets/mov_bbb.mp4"
const hlsSrc = "https://38fb45b25cdb05a1.mediapackage.ap-northeast-1.amazonaws.com/out/v1/4ac4333c214740ef8115b1cf8339efc3/manifest.m3u8"


window.onload = () => {
  spanSrcUrl.textContent = checkUseHls.checked ? hlsSrc : mediaSrc
  videoEl.src = spanSrcUrl.textContent

  preEvents.textContent += `document.pictureInPictureEnabled=${document.pictureInPictureEnabled}`

  checkUseHls.onclick = () => {
    const url = checkUseHls.checked ? hlsSrc : mediaSrc

    if( checkUseHls.checked && !videoEl.canPlayType('application/vnd.apple.mpegurl') ) {
      spanSrcUrl.textContent = "this browser does not support hls, natively"
    } else {
      spanSrcUrl.textContent = url
      videoEl.src = url
    }
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