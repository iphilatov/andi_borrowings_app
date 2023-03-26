const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
volume = wrapper.querySelector(".word i"),
infoText = wrapper.querySelector(".info-text"),
synonyms = wrapper.querySelector(".synonyms .list"),
removeIcon = wrapper.querySelector(".search span");
let audio;

function data(result, word){
    if(result.title){
        infoText.innerHTML = `К сожалению, в нашем словаре нет слова <span>"${word}"</span>. Попробуйте ввести другое слово.`;
    }else{
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0],
        phontetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phontetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
        audio = new Audio(result[0].phonetics[0].audio);

        if(definitions.synonyms[0] == undefined){
            synonyms.parentElement.style.display = "none";
        }else{
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i = 0; i < 5; i++) {
                let tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[i]},</span>`;
                tag = i == 4 ? tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[4]}</span>` : tag;
                synonyms.insertAdjacentHTML("beforeend", tag);
            }
        }
    }
}

const optionMenu = document.querySelector(".select-menu"),
  selectBtn = optionMenu.querySelector(".select-btn"),
  options = optionMenu.querySelectorAll(".option"),
  sBtn_text = optionMenu.querySelector(".sBtn-text");

selectBtn.addEventListener("click", () =>
  optionMenu.classList.toggle("active")
);

options.forEach((option) => {
  option.addEventListener("click", () => {
    let selectedOption = option.querySelector(".option-text").innerText;
    sBtn_text.innerText = selectedOption;

    optionMenu.classList.remove("active");
  });
});


function search(word){
    fetchApi(word);
    searchInput.value = word;
}

function fetchApi(word) {
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Ищу перевод <span>"${word}"</span>`;
    let url = "/static/js/andic_dicts.json";
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        const keys = Object.keys(result);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (key.includes(word)) {
            const value = result[key];
            // use value of subkeys here
            const meaning_ru = value.meaning_ru;
            const definition = value.definition;
            const ipa = value.ipa;
            const language = value.language;
            const concepticon = value.concepticon;
            const source = value.source;
            const borrowing_source_language = value.borrowing_source_language;
            const borrowing_source_transcription = value.borrowing_source_transcription;
            const borrowing_modified = value.borrowing_modified;
            const borrowing_annotator = value.borrowing_annotator;
            const pos = value.pos;
            infoText.innerHTML = `Значение для <span>"${key}"</span>: ${meaning_ru}<br><br> ${definition}<br><br> ${ipa}<br><br> ${language}<br><br> ${concepticon}<br><br> ${source}<br><br> ${borrowing_source_language}<br><br> ${borrowing_source_transcription}<br><br> ${borrowing_modified}<br><br> ${borrowing_annotator}<br><br> ${pos}`;
            return;
          }
        }
        infoText.innerHTML = `К сожалению, в нашем словаре нет слова <span>"${word}"</span>. Попробуйте ввести другое слово.`;
      })
      .catch(() => {
        infoText.innerHTML = `К сожалению, в нашем словаре нет слова <span>"${word}"</span>. Попробуйте ввести другое слово.`;
      });
  }

searchInput.addEventListener("keyup", e =>{
    let word = e.target.value.replace(/\s+/g, ' ');
    if(e.key == "Enter" && word){
        fetchApi(word);
    }
});

volume.addEventListener("click", ()=>{
    volume.style.color = "#4D59FB";
    audio.play();
    setTimeout(() =>{
        volume.style.color = "#999";
    }, 800);
});

removeIcon.addEventListener("click", ()=>{
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9A9A9A";
    infoText.innerHTML = "Введите слово и нажмие Enter, чтобы получить перевод, пример, источник заимствования и т.д.";
});