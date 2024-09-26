// Импортирование абстрактного класса AbstractView из общего модуля view
import { AbstractView } from '../../common/view'
import onChange from 'on-change' // Библиотека за слежением изменений в обьекте
import { Header } from '../../components/header'
import { Search } from '../../components/search'

// Определение класса MainView, который наследуется от AbstractView
export class MainView extends AbstractView {
  state = {
    list: [],
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
    // Установка заголовка страницы с помощью метода setTitle из родительского класса
    this.setTitle('Поиск книг')
  }

  appStateHook (path) {
    // Следит за состоянием массива favorites
    if (path === 'favorites') {
      console.log(path)
    }
  }

  // Метод render, который отвечает за отрисовку содержимого представления
  render () {
    // Создание нового элемента div для основного содержимого
    const main = document.createElement('div')
    // Очистка содержимого элемента app (предполагается, что он определен в родительском классе)
    this.app.innerHTML = ''

    // Добавление элемента поиск в main
    main.append(new Search(this.state).render())

    // Добавление элемента main в элемент app
    this.app.append(main)

    this.renderHeader()
  }

  renderHeader () {
    const header = new Header(this.appState).render()
    this.app.prepend(header)
  }
}
