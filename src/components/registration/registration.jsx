import { Fragment } from 'react'
import { useSelector } from 'react-redux'

import { StepOne } from './step-one'
import { StepThree } from './step-three'
import { StepTwo } from './step-two'

export const Registration = () => {
    const step = useSelector(state => state.registration.registrationStep);
  
    const stepRegistration = ((step === 1) && <StepOne/>) || ((step === 2) && <StepTwo/>) || ((step === 3) && <StepThree/>);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <Fragment>
           {stepRegistration}
        </Fragment>
    )
}