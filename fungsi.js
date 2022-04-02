// variable 
  // status 
const timer = document.getElementById('time');
const score = document.getElementById('score')
const hit = document.getElementById('hit');

  // Result 
const r_score = document.getElementById("r-score")
const r_hit = document.getElementById("r-hit")

  // stopwatch  
const ten = document.getElementById('tens');
const sec = document.getElementById('second');

  // sound effect 
const sfx_salam = document.getElementById("salam")
const sfx_punch1 = document.getElementById('punch-1');
const sfx_punch2 = document.getElementById('punch-2');
const sfx_finish = document.getElementById('finish');

  // main image 
const img = document.getElementById('main-img')

  // Modal 
const welcome = document.getElementById('welcome')
const result = document.getElementById('result')

const btn = document.getElementById("control")

// value 
let play = false;
let tens;
let seconds;
let time;
let punch;

const pesan_kalah = [
  "awokawok",
  "Gimana sih",
  "anda gagal",
  "Coba lagi!"
]

const pesan_menang = [
  "Hebat kamu",
  "Skor baru!",
  "Suhu!",
  "Memberi like"
]

function cls_welcome() {
  welcome.style.display = "none"
}

// PLAY ==================== 
function mainkan ( el) {

  reset()

  el.setAttribute("onClick", "")


  img.setAttribute("src", "assets/2.png")
  sfx_salam.play()

  setTimeout(() => {
    time = setInterval(startTimer, 10)

    el.textContent = "sports_mma"
    el.classList.add("punch")
    el.setAttribute("onClick", "javascript: punch_it(this, event)")
    

  }, 1300);
}

// BAK BUK BAK BUK =============
function punch_it( el ) {

  if ( punch >= 100 ) {
    finish()

    el.textContent = "play_arrow"
    el.classList.remove("punch")
    el.setAttribute("onClick", "javascript: mainkan(this, event)")
    
    return 
  }

  punch++

  if (img.getAttribute('src') == 'assets/3.png'){
    img.setAttribute('src','assets/4.png') ;
    sfx_punch2.play()
  } else{
    img.setAttribute('src','assets/3.png');
    sfx_punch1.play() 
  }

  hit.textContent = punch
}

// RESET ============= 
function reset() {
  clearInterval(time)
  punch = 0
  tens = "00"
  seconds = "00" 

  hit.textContent = punch
  ten.textContent = tens
  sec.textContent = seconds
}

// DAH BERES ==============
function finish() {
  img.setAttribute("src", "assets/5.png")
  sfx_finish.play()

  clearInterval(time)

  let icon = result.firstElementChild.firstElementChild.firstElementChild
  let span = result.firstElementChild.firstElementChild.lastElementChild

  if (score.textContent > timer.textContent){
    score.textContent = timer.textContent ;

    icon.textContent = "sentiment_very_satisfied"
    span.textContent = pesan_menang[Math.floor(Math.random() * (3 - 0 + 1))]

  } else if (score.textContent < timer.textContent){
    icon.textContent = "sentiment_very_dissatisfied"
    span.textContent = pesan_kalah[Math.floor(Math.random() * (3 - 0 + 1))]
  }

  r_score.textContent = timer.textContent.replace(/\s/g, '') ;
  r_hit.textContent = punch

  result.style.display = "block"

  result.addEventListener( "click", () => {
    setTimeout(() => {
      result.firstElementChild.style.animationName = "result-out"

      setTimeout(() => {
        result.style.display = "none"
        result.firstElementChild.style.animationName = "result-in"
      }, 450);
          
    }, 2000);
  })
}

// TIMER ============ 
function startTimer () {
seconds++; 

  if(seconds <= 9){
    sec.innerHTML = "0" + seconds;
  }

  if (seconds > 9){
    sec.innerHTML = seconds;
  } 

  if (seconds > 99) {
    tens++;
    if ( tens < 10 && tens != 0 ) {
      ten.innerHTML = "0" + tens;
    } else {
      ten.innerHTML =  tens;
    }
    seconds = 0;
    sec.innerHTML = "0" + 0;
  }

  if (seconds > 9){
    if ( tens < 10 && tens != 0 ) {
      ten.innerHTML = "0" + tens;
    } else {
      ten.innerHTML = tens;
    }
  }
}

//copy result
function catat() {
  navigator.clipboard.writeText(
    `saya berhasil mencapai 100 hit dalam ${timer.textContent} detik! di mini game Binjai 100\nhttps://diaz-adrianz.github.io/Binjai-100/`
  )
}
