// Импортирование абстрактного класса AbstractView из общего модуля view
import { AbstractView } from '../../common/view'
import onChange from 'on-change' // Библиотека за слежением изменений в обьекте
import { Header } from '../../components/header'
import { Search } from '../../components/search'
import { CardList } from '../../components/card-list'

// Определение класса MainView, который наследуется от AbstractView
export class MainView extends AbstractView {
  state = {
    list: [],
    numFound: 0,
    loading: false,
    searchQuery: '',
    offset: 0
  }
  // Конструктор класса MainView
  constructor (appState) {
    // Вызов конструктора родительского класса AbstractView
    super()
    this.appState = appState
    this.appState = onChange(this.appState, this.appStateHook.bind(this))
    this.state = onChange(this.state, this.stateHook.bind(this))
    // Установка заголовка страницы с помощью метода setTitle из родительского класса
    this.setTitle('Поиск книг')
  }

  appStateHook (path) {
    // Следит за состоянием массива favorites
    if (path === 'favorites') {
      this.render()
    }
  }

  async stateHook (path) {
    // Следит за состоянием searchQuery
    if (path === 'searchQuery') {
      this.state.loading = true
      const data = await this.loadList(
        this.state.searchQuery,
        this.state.offset
      )
      this.state.list = data.docs
      this.state.numFound = data.numFound
      this.state.loading = false
    }

    if (path === 'list' || path === 'loading') {
      this.render()
    }
  }

  async loadList (q, offset) {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&offset=${offset}`
    )
    return res.json()
  }

  // Метод render, который отвечает за отрисовку содержимого представления
  render () {
    // Создание нового элемента div для основного содержимого
    const main = document.createElement('div')
    // Очистка содержимого элемента app (предполагается, что он определен в родительском классе)
    this.app.innerHTML = ''

    // Добавление элемента поиск в main
    main.append(new Search(this.state).render())

    main.append(new CardList(this.appState, this.state).render())

    // Добавление элемента main в элемент app
    this.app.append(main)

    this.renderHeader()
  }

  renderHeader () {
    const header = new Header(this.appState).render()
    this.app.prepend(header)
  }
}
