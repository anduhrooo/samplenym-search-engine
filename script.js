const searchButton = document.getElementById('searchButton')
const synonymResults = document.getElementById('synonymSearch')
const wordContainer = document.getElementById("newWord")
const sampleContainer = document.getElementById("sampleResults")
const previousSearchContainer = document.getElementById('previousSearches')
let wordArray = []

searchButton.addEventListener('click', searchQuery)

function searchQuery() {
  const searchInput = document.getElementById('search').value
  const listSection = document.getElementById('sampleResults')
  const liElements = listSection.querySelectorAll('li')
  const previousSearches = document.createElement('p')
  previousSearches.textContent = searchInput
  previousSearches.classList.add('clickable')
  previousSearches.addEventListener('click', function () {
    const searchText = this.textContent;
    document.getElementById('search').value = searchText;
})

  previousSearchContainer.append(previousSearches)
  
  liElements.forEach(function(li) {
  listSection.removeChild(li);})
  getSample(searchInput)
  getApi(searchInput)
}

//freesound.org
function getSample(sample) {
  //fetches the API, adds parameter for search query  
  fetch('https://freesound.org/apiv2/search/text/?query='+(sample)+'&token=jcHA3ZUVvYODafQXF6YV3aRgOy0p3LWgjgb8sPp0')
      .then(function (response) {
        return response.json();
      }).then (function(data){
        console.log(data.results)
        for (let i = 0; i < data.results.length; i++) {
          // console.log(data.results[i].name)
          const samples = document.createElement("li")
          const embedCode = `<iframe frameborder="0" scrolling="no" src="https://freesound.org/embed/sound/iframe/` + data.results[i].id + `/simple/medium/" width="481" height="86"></iframe>`
          // samples.textContent = data.results[i].name
          samples.innerHTML = embedCode
          sampleContainer.append(samples)
        }
    })
  }


//https://dictionaryapi.dev/
function getApi(word) {
  const requestUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    fetch(requestUrl+word)
      .then(function (response) {
        return response.json();
      }).then (function(data){
        wordContainer.innerHTML = '';
        //go through data, get synonyms
        for (let i = 0; i < data.length; i++) {
          let synonymArray = data[i].meanings[i].synonyms;
          for (let j = 0; j < synonymArray.length; j++) {
            const synonyms = document.createElement("p");
            synonyms.classList.add('clickable'); // Adding a class instead of id
            synonyms.textContent = synonymArray[j];
            wordContainer.append(synonyms);
  
            // Add event listener to each dynamically created element
            synonyms.addEventListener('click', function () {
              const searchText = this.textContent;
              document.getElementById('search').value = searchText;
          })
        }
      }
    })
  }




