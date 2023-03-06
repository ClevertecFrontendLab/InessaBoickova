
export const RegistrationNotify = () => {
    console.log('sd');

    return (
        <div className="registration-notify">
            <h2 className="registration-notify__title"> Данные не сохранились </h2>
            <p className="registration-notify__descr"> Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail. </p>

            <button className="registration-notify__button" type="button"> назад к регистрации </button>

        </div>
    )

}