export const ErrorMessage = () => (
    <div className="error" data-test-id='error'>
        <div className="error__wrapper">
            <div className="error__sign"> ! </div>
            <h2 className="error__message"> Что-то пошло не так. Обновите страницу через некоторое время.</h2>
        </div>
        <button type="button" className="error__close">
            <span> </span>
            <span> </span>
        </button>
    </div>
)