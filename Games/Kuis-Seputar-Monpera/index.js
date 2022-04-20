//Pertanyaan / Soal
const questions = [
    {
        question: "MONPERA mulai dibangun pada tahun ....",
        optionA: "1980 Masehi",
        optionB: "1981 Masehi",
        optionC: "1982 Masehi",
        optionD: "1983 Masehi",
        correctOption: "optionA"
    },

    {
        question: "MONPERA diresmikan pada  tanggal ....",
        optionA: "21 Februari 1987",
        optionB: "22 Februari 1987",
        optionC: "23 Februari 1988",
        optionD: "24 Februari 1988",
        correctOption: "optionC"
    },

    {
        question: "MONPERA merupakan singkatan dari ....",
        optionA: "Monumen Perjuangan Rakyat",
        optionB: "Monumen Perintisan Rakyat",
        optionC: "Monumen Penderitaan Rakyat",
        optionD: "Monumen Pembawaan Rakyat",
        correctOption: "optionA"
    },

    {
        question: "Museum MONPERA diresmikan oleh?",
        optionA: "Presiden Soekarno ",
        optionB: "H. Alamsyah Ratu Prawinegara",
        optionC: "Presiden Soeharto",
        optionD: "Jenderal Ahmad Yani",
        correctOption: "optionB"
    },

    {
        question: "MONPERA terkenal dengan peristiwa .....",
        optionA: "Saksi bisu perang 4 hari 4 malam",
        optionB: "Perang Gerilya",
        optionC: "Perang Belanda",
        optionD: "Saksi bisu perang 5 hari 5 malam",
        correctOption: "optionD"
    },
]


let shuffledQuestions = [] //Menampung Kolom Yang Kosong

function handleQuestions() { 
    //Fungsi Merandom dan Membatasi Jumlah Pertanyaan
    while (shuffledQuestions.length <= 4) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}

//Keadaan
let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

//Fungsi Di Canvas Layar
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
}

function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //Mengambil Pertanyaan
    const currentQuestionAnswer = currentQuestion.correctOption //Mengambil Jawaban
    const options = document.getElementsByName("option"); //Mengambil Semua Elemen
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //Mengambil Jawaban Yang diinput
            correctOption = option.labels[0].id
        }
    })

    //Mengecek Jawaban yang dipilih Benar atau Salah
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //Mengubah Warna Background Jawaban Jika Salah atau Benar
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //Mengatur Delay Untuk Lanjut Ke Pertanyaan Selanjutnya
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //Mengatur Delay Untuk Lanjut Ke Pertanyaan Selanjutnya
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//Memanggil Button Selesai
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 4) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//Mengembalikan Warna Background Jawaban
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// Menghapus Semua Centang Jawaban
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// Semua Jawaban Terisi
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // Kondisi Penilaian
    if (playerScore <= 2) {
        remark = "Nilai Rendah, Lebih Giat Lagi Ya Belajarnya"
        remarkColor = "red"
    }
    else if (playerScore >= 3 && playerScore < 5) {
        remark = "Nilai Menengah, Lebih Fokus Lagi Ya"
        remarkColor = "orange"
    }
    else if (playerScore >= 5) {
        remark = "Sempurna, Tetap Giat dan Semangat Ya Belajarnya"
        remarkColor = "green"
    }
    const playerGrade = (playerScore) * 20

    //Memanggil Data
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"
}

//Jika Permainan Selesai -  Maka Reset dan Ulangi
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//Fungsi Lanjut, Ketika Peringatan Belum Mengisi Jawaban Muncul
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}