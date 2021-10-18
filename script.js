const videoEl = document.querySelector("video")
const btnInline = document.querySelector("#btn-inline")
  , btnPinP = document.querySelector("#btn-pinp")
  , btnFullscreen = document.querySelector("#btn-fullscreen")
  , btnEnterFullscreen = document.querySelector("#btn-enter-fullscreen")
  , btnToggle = document.querySelector("#btn-toggle")
const preEvents = document.querySelector("#pre-events")

const mediaSrc = "/assets/mov_bbb.mp4"


window.onload = () => {
  videoEl.src = mediaSrc

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
      preEvents.textContent += `\n${ videoEl.webkitPresentationMode }`
    }
  } else {
    btnInline.disabled = true
    btnPinP.disabled = true
    btnFullscreen.disabled = true
    btnEnterFullscreen.disabled = true
  }
}