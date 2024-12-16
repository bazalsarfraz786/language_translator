const selectTag = document.querySelectorAll("select")
const translateBtn = document.querySelector("#translate")
const fromText = document.querySelector("#fromText")
const toText = document.querySelector("#toText")
const icons = document.querySelectorAll("img");


selectTag.forEach((tag,id) => {
    for (const countriesCode in countries) {

        let selected;
        if(id == 0 && countriesCode == "en-GB"){
            selected = "selected";
        }else if(id == 1 && countriesCode == "ur-PK"){
            selected = "selected";
        }
        let option = `<option value="${countriesCode}"${selected}>${countries[countriesCode]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

// This code will add all the countries to the select tag.

translateBtn.addEventListener("click", () => {
    let Text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    //API of MyMemoryTranslator to translate the text
    let apiURL = `https://api.mymemory.translated.net/get?q=${Text}&langpair=${translateFrom}|${translateTo}`

    fetch(apiURL)
       .then(response => response.json())
       .then(data => {
            toText.value = data.responseData.translatedText;
       });
});

icons.forEach(icons => {
icons.addEventListener("click",({target}) =>{
    if(target.classList.contains("copy")){
        if(target.id == "from"){
            navigator.clipboard.writeText(fromText.value)
        }else{
            navigator.clipboard.writeText(toText.value)
        }
    }else{
        let utterance;
        if(target.id == "from"){
            utterance = new SpeechSynthesisUtterance(fromText.value);
            utterance.lang = selectTag[0].value;
        }else{
            utterance = new SpeechSynthesisUtterance(toText.value);
            utterance.lang = selectTag[1].value;
        }
        speechSynthesis.speak(utterance);
    }
});
});

