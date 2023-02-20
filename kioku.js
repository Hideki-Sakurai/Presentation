// HTMLからカード、スタートボタン、結果を取得
const cards = document.querySelectorAll(".card");
const startButton = document.querySelector("#startButton");
const result = document.querySelector("#result");

// カードをひっくり返したカード、ボードのロック状態、正解の数字を格納する変数を初期化
let flippedCards = [];
let lockBoard = false;
let correctNumber = 1;

// カードをクリックしたときの処理を定義
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", () => {
    // ボードがロックされている場合は処理をしない
    if (lockBoard) return;
    // 2枚以上のカードがひっくり返されている場合は処理をしない
    if (flippedCards.length === 2) return;
    // クリックされたカードをひっくり返す
    cards[i].classList.add("flipped");
    // ひっくり返されたカードを配列に格納する
    flippedCards.push(cards[i]);

    // 全てのカードを正解した場合
    if (correctNumber === 10) {
      // 結果の表示を変更する
      result.textContent = "おめでとう!!「すたーと」でもう1回!";
      return;
    }

    // 2枚のカードがひっくり返された場合
    if (flippedCards.length === 2) {
      // 2枚のカードの数字が一致した場合
      if (
        parseInt(flippedCards[0].textContent) === correctNumber &&
        parseInt(flippedCards[1].textContent) === correctNumber
      ) {
        // カードを消去する
        flippedCards.forEach((card) => {
          card.style.visibility = "hidden";
          card.style.color = card.style.backgroundColor;
        });
        // ひっくり返されたカードの配列を空にする
        flippedCards = [];
        // ボードのロックを解除し、正解の数字をインクリメントする
        lockBoard = false;
        correctNumber++;
      } else {
        // 2枚のカードの数字が一致しない場合、200ミリ秒後にカードを裏返す
        setTimeout(() => {
          flippedCards.forEach((card) => {
            card.classList.remove("flipped");
          });
          // ひっくり返されたカードの配列を空にする
          flippedCards = [];
          // ボードのロックを解除する
          lockBoard = false;
        }, 200);
      }
    }
  });
}

// スタートボタンがクリックされたときの処理を定義
startButton.addEventListener("click", () => {
  // 数字の配列を生成してシャッフルする
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  numbers = shuffle(numbers);

  // カードを配列としてまとめた要素(cards)の数だけ繰り返し処理を実行
  for (let i = 0; i < cards.length; i++) {
    // カードを表示する
    cards[i].style.visibility = "visible";
    // カードのテキストコンテンツをシャッフルした数字に変更する
    cards[i].textContent = numbers[i];
    // カードのフリップ済みフラグを取り除く
    cards[i].classList.remove("flipped");
    // カードの文字色をカードの背景色に合わせる
    cards[i].style.color = window.getComputedStyle(cards[i]).backgroundColor;
  }
  flippedCards = []; // 開いたカードを追跡するための配列を初期化する
  lockBoard = false; // カードの操作ができるようにする
  correctNumber = 1; // 正しい数字を追跡するための変数を初期化する
  result.textContent = ""; // 結果表示用のテキストコンテンツを空にする
});

// 渡された配列の要素をランダムにシャッフルするための関数を定義
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // Fisher-Yates shuffleアルゴリズムで、配列の中身をランダムに入れ替える
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array; // シャッフル後の配列を返す
}

// 追記：Fisher-Yates shuffleアルゴリズムについて
// Fisher-Yates shuffleアルゴリズムは、
// 与えられた配列をランダムに並び替えるアルゴリズムです。

// このアルゴリズムは、配列の最後の要素から開始し、
// その要素をランダムに選んで、配列内の他の要素と交換することを繰り返します。

// このプロセスを配列の先頭に到達するまで繰り返すことで、
// 配列をランダムにシャッフルすることができます。

// このアルゴリズムは、一様ランダムな並び替えを生成するために設計されており、
// 数学的に証明されています。
