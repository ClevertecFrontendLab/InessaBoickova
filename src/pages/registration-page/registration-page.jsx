import { Registration } from '../../components/registration/registration'

export const RegistrationPage = () => (
    <div className="registration-page" data-test-id='auth'>
        <h2 className="registration-page__title"> Cleverland </h2>
        <Registration/>
    </div>
)