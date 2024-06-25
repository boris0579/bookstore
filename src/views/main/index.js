// Импортирование абстрактного класса AbstractView из общего модуля view
import { AbstractView } from '../../common/view'

// Определение класса MainView, который наследуется от AbstractView
export class MainView extends AbstractView {
    // Конструктор класса MainView
    constructor() {
        // Вызов конструктора родительского класса AbstractView
        super()
        // Установка заголовка страницы с помощью метода setTitle из родительского класса
        this.setTitle('Поиск книг')
    }

    // Метод render, который отвечает за отрисовку содержимого представления
    render() {
        // Создание нового элемента div для основного содержимого
        const main = document.createElement('div')
        // Установка HTML содержимого элемента main
        main.innerHTML = 'test'
        // Очистка содержимого элемента app (предполагается, что он определен в родительском классе)
        this.app.innerHTML = ''
        // Добавление элемента main в элемент app
        this.app.append(main)
    }
}