
const gameTimer = document.querySelector('.game-timer');
const gameBoard = document.querySelector('.game-board');
const dialog = document.querySelector('#dialog-default');
const restart = document.querySelector('.restart');

let gameStatus = {
    clickPause: false,
    matchedCount: 0,
    cards: null,
    cardOne: null,
    cardTwo: null,
    time: null
};

let item = [
    { id: 1, idx: "2" },
    { id: 2, idx: "3" },
    { id: 3, idx: "4" },
    { id: 4, idx: "5" },
    { id: 5, idx: "6" },
    { id: 6, idx: "1" },
    { id: 7, idx: "2" },
    { id: 8, idx: "3" },
    { id: 9, idx: "4" },
    { id: 10, idx: "5" },
    { id: 11, idx: "6" },
    { id: 12, idx: "1" },
]

let gameResults = {
    cleared: {
        msg: 'Success',
        img: 'success.gif',
    },
    failed: {
        msg: 'Failed',
        img: 'game-over.gif',
    },
    playSound: function (result) {
        this[result].play();
    }
};

let { cleared, failed } = gameResults;
let { clickPause, matchedCount, cards, cardOne, cardTwo, time } = gameStatus;

// 카드 랜덤
const shuffleCards = () => {
    item.sort(() => Math.random() - 0.5);
}

// 카드 렌더링
const renderCards = () => {
    gameBoard.innerHTML = '';

    // 카드 생성
    for (let i = 0; i < item.length; i++) {
        const $createCard = document.createElement('div');
        const $front = document.createElement('div');
        const $back = document.createElement('div');
        const $img = document.createElement('img');
        $createCard.classList.add('card', 'nes-container', 'is-rounded');

        $front.classList.add('front');
        $front.append($img);
        $img.setAttribute('src', `./assets/cardImages/card-image-${item[i].idx}.png`);

        $back.classList.add('back');
        $back.innerText = '?';

        gameBoard.append($createCard);
        $createCard.append($front, $back);

        addCardClickEvent();
    }
};

// 카드 보여주기
const showCards = () => {
    cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
        card.dataset.idx = item[index].idx;

        setTimeout(() => {
            card.classList.add('show');
        }, index * 80)
        setTimeout(() => {
            card.classList.remove('show');
        }, 1500)
    })
};

// 제한시간
let count = 30;

// 카운트다운
const startTimer = (initialCount = 30) => {
    count = initialCount;

    time = setInterval(() => {
        count--;
        gameTimer.innerText = count;
        if (count === 0) {
            endGame(failed);
        }
    }, 1000)
};

// 카드 뒤집기
const flipCard = (event) => {
    let clickedCard = event.target.closest('.card');

    if (cardOne !== clickedCard && !clickPause) {
        clickedCard.classList.add('show');

        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        clickPause = true;

        // cardOne, cardTwo의 data-idx 값을 가져와서 matchCards() 함수 실행
        matchCards(cardOne.dataset.idx, cardTwo.dataset.idx)
    }
};

// 카드 매칭
const matchCards = (one, two) => {
    if (one === two) {
        return equals();
    }
    return differs();
}

function equals() {
    cardOne.removeEventListener('click', flipCard);
    cardTwo.removeEventListener('click', flipCard);
    matchedCount++;

    // Match된 카드가 6개가 되면 게임 종료
    if (matchedCount === 6) {
        endGame(cleared);
    }

    cardReset();
}

// 카드 매칭 실패
function differs() {
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        // 1초 후 shake, show class 제거해서 뒤집힌 카드로 원상복귀
        cardOne.classList.remove("shake", "show");
        cardTwo.classList.remove("shake", "show");
        cardReset();
    }, 1000);
}

// 카드 초기화
const cardReset = () => {
    cardOne = cardTwo = "";
    return clickPause = false;
}

// 게임결과
const endGame = result => {
    let resultMsg = dialog.querySelector('h3 span');
    let resultImg = dialog.querySelector('h3 img');
    resultImg.setAttribute('src', `./assets/${result.img}`);
    resultMsg.innerText = `Game ${result.msg}!`;
    clearInterval(time);
    dialog.showModal();
}

// 카드 클릭 시 이벤트
const addCardClickEvent = () => {
    cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', flipCard);
    });
};

const pauseButton = document.querySelector('.pause');

let pauseTimer = false;
let remainingTime = 0;

// 게임 일시정지 버튼 클릭 시
pauseButton.addEventListener('click', () => {
    if (!pauseTimer) {
        if (count > 0) {
            clearInterval(time);
            remainingTime = count;
            pauseButton.innerText = '재개';
            pauseTimer = true;
        }
    } else {
        if (count > 0) {
            startTimer(remainingTime);
            pauseButton.innerText = '일시정지';
            pauseTimer = false;
        }
    }
});

// 게임 시작
const game = () => {
    shuffleCards();
    renderCards();
    showCards();
    startTimer();
    addCardClickEvent();
}

game();

// 재시작
restart.addEventListener('click', () => {
    cardReset();
    game();
});