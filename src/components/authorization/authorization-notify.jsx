import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { setAuthorizationResult } from '../../actions/actions'

export const AuthorizationNotify = () => {
    const dispatch = useDispatch()

    return (
        <div className="identification-notify" data-test-id= 'status-block'>
            <h2 className="identification-notify__title"> Вход не выполнен </h2>
            <p className="identification-notify__descr"> Что-то пошло не так. Попробуйте ещё раз </p>

            <Link to='/auth' className="identification-notify__button" 
                onClick={()=> dispatch(setAuthorizationResult(''))}>
                повторить
            </Link>

        </div>
    )
}