export const AuthorizationNotify = () => {
    console.log('sd');

    return (
        <div className="authorization-notify">
            <h2 className="authorization-notify__title"> Вход не выполнен </h2>
            <p className="authorization-notify__descr"> Что-то пошло не так. Попробуйте ещё раз </p>

            <button className="authorization-notify__button" type="button">повторить</button>

        </div>
    )

}