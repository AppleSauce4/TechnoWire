var quiz = {
  // (A) PROPERTIES
  // (A1) QUESTIONS & ANSWERS
  // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
  data: [
  {
    q : "Welk antwoord past het beste bij de term processor?",
    o : [
      "Voorziet de computer van stroom",
      "Zorgt voor beeld",
      "Grotere opslag voor je computer",
      "Het hart van de computer"
    ],
    a : 3 
  },
  {
    q : "Wat houdt hertz (Hz) in?",
    o : [
      "De snelheid van je SSD",
      "De snelheid van je CPU",
      "De snelheid van je toetsenbord",
      "De hoeveelheid stroom die je voeding kan voorzien aan je computer"
    ],
    a : 1
  },
  {
    q : "Wat is een socket in je moederbord?",
    o : [
      "Dit is waar je je voeding aan aansluit",
      "De socket zorgt er voor dat je HDD aan kan",
      "Dat is de houder waar je jouw processor in plaatst, deze kan verschillen per moederbord en processor",
      "Een socket is de houder waar je jou Dvd speler in kan doen"
    ],
    a : 2
  },
  {
    q : "Wat is het doel van het Moederbord?",
    o : [
      "Voor componenten zorgen",
      "De behuizing van al je componenten",
      "zorgt ervoor dat alle componenten in je computer kunnen communiceren met elkaar",
      "Zorgt voor beeld op je monitor"
    ],
    a : 2
  },
  {
    q : "Wat doet de grafische kaart in je computer?",
    o : [
      "De GPU berekent de beeldopbouw en versnelt de weergave van 3D-beelden",
      "Processor koelen",
      "Heeft niet veel nut om te hebben",
      "Werkt als dvd speler"
    ],
    a : 0
  },
  {
    q : "Waar staat GPU voor?",
    o : [
      "Graphics Processing Unit",
      "GUI Processing Unit",
      "GPU betekent gewoon GPU",
      "Ik weet het niet"
    ],
    a : 0
  },
  {
    q : "Wat is het nut van de voeding?",
    o : [
      "Tijdelijke opslagruimte",
      "verbind alle componenten met elkaar",
      "Voorziet alleen je processor van stroom",
      "Voorziet je computer van stroom"
    ],
    a : 3
  },
  {
    q : "Welke DDR versies zijn er voor de RAM Modules?",
    o : [
      "DDR1, DDR6, DDR3 en DDR 5",
      "DDR1, DDR2, DDR3, DDR4 en DDR5",
      "DDR0.1, DDR7 en DDR8",
      "DDR is geen RAM"
    ],
    a : 1
  },
  {
    q : "Wat betekent de afkorting SSD?",
    o : [
      "Solid Safe Drive",
      "SSD bestaat niet",
      "Switch Sorting Device",
      "Solid State Drive"
    ],
    a : 3
  },
  {
    q : "Wat is het verschil tussen een SSD en HDD",
    o : [
      "SSD maakt geen gebruik van een draaischijf, maar van elektrische lading. Waardoor de SSD zo'n 4x sneller is dan een HDD",
      "Er is bijna geen verschil tussen deze 2 soorten schijven",
      "Een HDD maakt gebruik van een draaischijf, waardoor hij sneller is dan een SSD",
      "Een HDD is kleiner, maar wel veel langzamer dan een SSD"
    ],
    a : 0
  }
  ],

  // (A2) HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  // (A3) GAME FLAGS
  now: 0, // current question
  score: 0, // current score

  // (B) INIT QUIZ HTML
  init: function(){
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");

    // (B2) QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // (B4) GO!
    quiz.draw();
  },

  // (C) DRAW QUESTION
  draw: function(){
    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", quiz.select);
      quiz.hAns.appendChild(label);
    }
  },

  // (D) OPTION SELECTED
  select: function(){
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let correct = this.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      this.classList.add("correct");
    } else {
      this.classList.add("wrong");
    }

    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(function(){
      if (quiz.now < quiz.data.length) { quiz.draw(); }
      else {
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },

  // (E) RESTART QUIZ
  reset : function () {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }
};
window.addEventListener("load", quiz.init);
