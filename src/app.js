// Импортирование класса MainView из модуля './views/main'
import { MainView } from './views/main'

// Определение класса App, который управляет маршрутизацией приложения на основе хешей в URL
class App {
    // Массив маршрутов, где каждый маршрут имеет путь (path) и класс представления (view)
    routes = [{
        path: '', view: MainView
    }]

    appState = {
        favorites: []
    }

    // Конструктор класса App
    constructor() {
        // Добавление слушателя события 'hashchange' на объект window,
        // чтобы отслеживать изменения хеша в URL и вызывать метод route
        window.addEventListener('hashchange', this.route.bind(this))
        // Вызов метода route для обработки текущего маршрута при инициализации приложения
        this.route()
    }

    // Метод route, который будет вызываться при изменении хеша в URL
    route() {
        // Если текущее представление уже существует, вызываем его метод destroy для очистки
        if (this.currentView) {
            this.currentView.destroy()
        }

        // Поиск маршрута в массиве routes, который соответствует текущему хешу в URL
        const view = this.routes.find(p => p.path === location.hash).view

        // Создание нового экземпляра найденного представления и сохранение его в currentView,
        // передавая в конструктор глобальное состояние
        this.currentView = new view(this.appState)

        // Вызов метода render у текущего представления для отрисовки содержимого
        this.currentView.render()
    }
}

// Создание нового экземпляра класса App
new App()