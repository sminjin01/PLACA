var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
    wrapAround: true,//무한 루프 여부
    cellAlign: 'center',
    contain: true,
    autoPlay: true,//자동재생여부
    fullscreen: false,
});


window.addEventListener('scroll', function () {
  const section = document.querySelector('.scroll_section');
  const sectionTop = section.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight * 0.8;

  if (sectionTop < triggerPoint) {
    section.classList.add('active');
  } else {
    section.classList.remove('active'); // 다시 스크롤 올리면 사라지게 하려면 이 줄 유지
  }
});





//new부분

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");

  if (n > slides.length) { slideIndex = 1; }
  else if (n < 1) { slideIndex = slides.length; }
  else { slideIndex = n; }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].style.display = "block";

  // dots 배열은 slideIndex 2~6까지 (index 1~5)만 해당되므로 -2 처리
  if (slideIndex > 1) {
    dots[slideIndex - 2].classList.add("active");
    captionText.innerHTML = dots[slideIndex - 2].alt;
  } else {
    captionText.innerHTML = ""; // 첫 슬라이드(배너)에는 캡션 없음
  }
}



// 달력

window.onload = function () { buildCalendar(); }    // 웹 페이지가 로드되면 buildCalendar 실행
    
let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date();     // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0);    // 비교 편의를 위해 today의 시간을 초기화

// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {

    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

    let tbody_Calendar = document.querySelector(".Calendar > tbody");
    document.getElementById("calYear").innerText = nowMonth.getFullYear();             // 연도 숫자 갱신
    document.getElementById("calMonth").innerText = leftPad(nowMonth.getMonth() + 1);  // 월 숫자 갱신

    while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
        tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
    }

    let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가           

    for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
        let nowColumn = nowRow.insertCell();        // 열 추가
    }

    for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복  

        let nowColumn = nowRow.insertCell();        // 새 열을 추가하고
        nowColumn.innerText = leftPad(nowDay.getDate());      // 추가한 열에 날짜 입력


        if (nowDay.getDay() == 0) {                 // 일요일인 경우 글자색 빨강으로
            nowColumn.style.color = "#DC143C";
        }
        if (nowDay.getDay() == 6) {                 // 토요일인 경우 글자색 파랑으로 하고
            nowColumn.style.color = "#0000CD";
            nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
        }


        if (nowDay < today) {                       // 지난날인 경우
            nowColumn.className = "pastDay";
        }
        else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우           
            nowColumn.className = "today";
            nowColumn.onclick = function () { choiceDate(this); }
        }
        else {                                      // 미래인 경우
            nowColumn.className = "futureDay";
            nowColumn.onclick = function () { choiceDate(this); }
        }
    }
}

// 날짜 선택
function choiceDate(nowColumn) {
    if (document.getElementsByClassName("choiceDay")[0]) {                              // 기존에 선택한 날짜가 있으면
        document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");  // 해당 날짜의 "choiceDay" class 제거
    }
    nowColumn.classList.add("choiceDay");           // 선택된 날짜에 "choiceDay" class 추가
}

// 이전달 버튼 클릭
function prevCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
    buildCalendar();    // 달력 다시 생성
}
// 다음달 버튼 클릭
function nextCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
    buildCalendar();    // 달력 다시 생성
}

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
    if (value < 10) {
        value = "0" + value;
        return value;
    }
    return value;
}



const tabList = document.querySelectorAll('.tab_menu .list li');
const contents = document.querySelectorAll('.tab_menu .cont_area .cont');
let activeCont = '';

for (let i = 0; i < tabList.length; i++) {
  tabList[i].querySelector('.btn').addEventListener('click', function(e) {
    e.preventDefault();

    // 모든 탭/콘텐츠 초기화
    for (let j = 0; j < tabList.length; j++) {
      tabList[j].classList.remove('is_on');
      contents[j].style.display = 'none';
    }

    // 클릭한 탭 활성화
    this.parentNode.classList.add('is_on');
    activeCont = this.getAttribute('href');
    document.querySelector(activeCont).style.display = 'block';
  });
}

// 페이지 로드 시 첫 번째 탭 자동 클릭
window.addEventListener('DOMContentLoaded', function () {
  tabList[0].querySelector('.btn').click();
});




// 탭 버튼과 콘텐츠 가져오기
const eventTabs = document.querySelectorAll('.event_tabs li');
const eventContents = document.querySelectorAll('.event_item');

for (let i = 0; i < eventTabs.length; i++) {
  eventTabs[i].querySelector('a').addEventListener('click', function (e) {
    e.preventDefault();

    // 모든 탭 초기화
    for (let j = 0; j < eventTabs.length; j++) {
      eventTabs[j].classList.remove('is_on');
      eventContents[j].style.display = 'none';
    }

    // 클릭한 탭 활성화
    this.parentNode.classList.add('is_on');
    const target = this.getAttribute('href');
    document.querySelector(target).style.display = 'flex';
  });
}



//상품 색상 변경
const colorThumbs = document.querySelectorAll('.color-thumb');
const best_1 = document.getElementById('best_1');

colorThumbs.forEach(thumb => {
  thumb.addEventListener('click', function() {
    const newImg = this.getAttribute('data-img');
    best_1.setAttribute('src', newImg);
  });
});





// 모든 이벤트 이미지에 대해
const eventImages = document.querySelectorAll('.event_item a img');
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popup_img');

// 이미지 클릭했을 때
eventImages.forEach(img => {
    img.addEventListener('click', (e) => {
        e.preventDefault(); // 링크 이동 막기
        popupImg.src = img.src; // 클릭한 이미지 src를 팝업에 넣기
        popup.style.display = 'flex'; // 팝업 보이게
    });
});

// 팝업창 클릭하면 닫기
popup.addEventListener('click', () => {
    popup.style.display = 'none';
});

// X 버튼 누르면 팝업 닫기
const popupClose = document.querySelector('.popup_close');

popupClose.addEventListener('click', (e) => {
    e.stopPropagation(); // 클릭 이벤트 전파 막기 (중요!)
    popup.style.display = 'none';
});
