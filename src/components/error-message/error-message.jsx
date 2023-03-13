import CheckCircle from '../../resources/icon/CheckCircle.svg'
import WarningCircle from '../../resources/icon/WarningCircle.svg'

export const ErrorMessage = (props) => {
    const {status} = props;
    const data = {
        erorrLoadingBooksList: {
            img: WarningCircle,
            title: 'Что-то пошло не так. Обновите страницу через некоторое время.',
        },
        successfulBookReview: {
            img: CheckCircle,
            title: 'Спасибо, что нашли время оценить книгу!'
        },
        errorBookReview: {
            img: WarningCircle,
            title: 'Оценка не была отправлена. Попробуйте позже!'
        },
        successfulBookBooking: {
            img: CheckCircle,
            title: 'Книга забронирована. Подробности можно посмотреть на странице Профиль'
        },
        errorBookBooking: {
            img: WarningCircle,
            title: 'Что-то пошло не так, книга не забронирована. Попробуйте позже!'
        },
        successfulChangeOfBookingDate: {
            img: CheckCircle,
            title: 'Бронирование новой даты успешно изменено. Подробности можно посмотреть на странице Профиль'
        },
        errorChangeOfBookingDate: {
            img: WarningCircle,
            title: 'Что-то пошло не так, дату бронирования не удалось изменить. Попробуйте позже!'
        },
        successfulBookCancellation: {
            img: CheckCircle,
            title: 'Бронирование книги успешно отменено!'
        },
        errorBookCancellation: {
            img: WarningCircle,
            title: 'Не удалось отменить бронирование книги. Попробуйте позже!'
        }
    }

    const {img,title} = data[status]

    return (
        <div className="error" data-test-id='error'>
            <div className="error__wrapper">
                <div className="error__sign">
                    <img src={img} alt="icon" />
                </div>
                <h2 className="error__message">{title}</h2>
            </div>
            <button type="button" className="error__close">
                <span> </span>
                <span> </span>
            </button>
        </div>
    )
}