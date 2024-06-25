// Экспортирование класса AbstractView для использования в других модулях
export class AbstractView {
    // Конструктор класса AbstractView
    constructor() {
        // Получение элемента с идентификатором 'root' и сохранение его в свойство app
        this.app = document.getElementById('root')
    }

    // Метод для установки заголовка страницы
    setTitle(title) {
        document.title = title
    }

    // Метод render, который должен быть переопределен в классах-наследниках для отрисовки содержимого
    render() {
        return
    }

    // Метод destroy, который может быть переопределен в классах-наследниках для очистки ресурсов или DOM
    destroy() {
        return
    }
}