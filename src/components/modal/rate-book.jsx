export const ModalRateBook = () => {
    const onSubmit = (e) => {
        console.log()
    }

    return (
        <div className="rate-book">
           <div className="rate-book__wrapper">

                <div className="rate-book__header">
                        <h2 className="rate-book__header-title"> Оцените книгу </h2>
                        <button type="button" className="rate-book__header-close"> <span> </span></button>
                    </div>
                    <div className="rate-book__score">
                        <h4 className="rate-book__score-title"> Ваша оценка </h4>
                    </div>

                    <div className="rate-book__review">
                        <textarea name="text" placeholder='Оставить отзыв' className='rate-book__review-textarea'/>
                    </div>
                    <button type="button" className="rate-book__btn">оценить</button>
                </div>
            <div className="rate-book_overlay"/>
        </div>
    )
}