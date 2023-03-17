const form = document.querySelector('#form')
const urlApi = 'https://www.googleapis.com/books/v1/volumes?q=flores+inauthor:keyes&key=AIzaSyCnr7LWiCHHl3Ods5tZ1Pnk3E-GmvISi34'

form.addEventListener('submit', handleSubmit)

function handleSubmit(e){
    e.preventDefault()
    const searchFinder = document.querySelector('.navBarr').value
    const searchFinderFormated = formatSearchFinder(searchFinder)

    const searchResults = fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchFinderFormated}+&key=AIzaSyCnr7LWiCHHl3Ods5tZ1Pnk3E-GmvISi34`)
      .then(res => res.json())
      .then(res =>{
        const list = document.querySelector('.list')
        const books = res.items.splice(0, 5)
        let listItems = ''
        console.log(books)

        books.forEach(book => {
            let listItem = `<li class="listItem">
                                <img src="${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : 'https://i.pinimg.com/222x/b4/9e/7a/b49e7a7298b855f8bf2cd3f5923ea7ab.jpg'}">
                                <div class="infos-book">
                                    <strong>${book.volumeInfo.title}</strong>
                                    <p>${book.volumeInfo.description ? formatDescription(book.volumeInfo.description) : ''}</p>
                                </div>
                            </li>`

            listItems += listItem
        })
        list.innerHTML = listItems
      })
}

function formatSearchFinder(searchString){
    const arraySearchString = searchString.split(' ')
    const searchStringFormated = arraySearchString.join('_')

    return searchStringFormated
}

function formatDescription(descriptionString){
    if(descriptionString.length > 150){
        const cutDescription = descriptionString.slice(0, 150)
        
        return cutDescription + '...'
    }
}

