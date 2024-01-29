import { CardComponent } from './CardComponent';
import { GithubService } from './GithubService';
import { GithubServiceMock } from './GithubService.mock';
import './style.css'

const app = document.getElementById("app")
showCard()

document.getElementById('mockCheckbox')?.addEventListener('change', () => {
  const searchContainer = document.getElementById('searchContainer')
  if(!searchContainer) return 

  const isSearchHidden = searchContainer.style.display == 'none'
  searchContainer.style.display =  isSearchHidden ? 'block' : 'none'
  if(!isSearchHidden){
    showCard()
  }else {
    removeCard()
  }
})

document.getElementById('userSearchBtn')?.addEventListener('click', () => {
  const inputVal = (document.getElementById('userSearch') as HTMLInputElement).value

  showCard(inputVal, false)
})

function showCard(username = '', useMock = true){
  removeCard()

  if(!app){
    alert("There was a problem showing the card")
    return
  }
  
  const service = useMock ? new GithubServiceMock() : new GithubService()
  const cardComponent = new CardComponent(service)

  try{
    cardComponent.mountCard(app, username)
  }catch(e){
    alert(e)
  }
}

function removeCard(){
  document.getElementById('card')?.remove()
}